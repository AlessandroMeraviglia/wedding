import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface SlotConfig {
  imageUrl: string;
  videoUrl: string;
  overlayColor: string;
  overlayOpacity: number;
}

interface MediaConfig {
  slots: Record<string, SlotConfig>;
}

const CONFIG_PATH = path.join(process.cwd(), 'data', 'media-config.json');

async function loadConfig(): Promise<MediaConfig> {
  try {
    const raw = await readFile(CONFIG_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { slots: {} };
  }
}

async function saveConfig(config: MediaConfig): Promise<void> {
  const dir = path.dirname(CONFIG_PATH);
  await mkdir(dir, { recursive: true });
  await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
}

const VALID_SLOT_IDS = [
  'hero-bg',
  'showcase-video',
  'showcase-bg',
  'gallery-1',
  'gallery-2',
  'gallery-3',
  'gallery-4',
];

// POST: save media configuration (URLs, overlay settings)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slotId, imageUrl, videoUrl, overlayColor, overlayOpacity } = body;

    if (!slotId || !VALID_SLOT_IDS.includes(slotId)) {
      return NextResponse.json(
        { error: 'slotId non valido' },
        { status: 400 }
      );
    }

    // Validate URLs if provided
    if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
      try {
        new URL(imageUrl);
      } catch {
        return NextResponse.json(
          { error: 'URL immagine non valido' },
          { status: 400 }
        );
      }
    }

    if (videoUrl && typeof videoUrl === 'string' && videoUrl.trim()) {
      try {
        new URL(videoUrl);
      } catch {
        return NextResponse.json(
          { error: 'URL video non valido' },
          { status: 400 }
        );
      }
    }

    // Validate overlay opacity
    const opacity = typeof overlayOpacity === 'number'
      ? Math.max(0, Math.min(100, overlayOpacity))
      : 0;

    // Validate overlay color (hex)
    const color = typeof overlayColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(overlayColor)
      ? overlayColor
      : '#000000';

    const config = await loadConfig();
    config.slots[slotId] = {
      imageUrl: (typeof imageUrl === 'string' ? imageUrl.trim() : '') || '',
      videoUrl: (typeof videoUrl === 'string' ? videoUrl.trim() : '') || '',
      overlayColor: color,
      overlayOpacity: opacity,
    };

    await saveConfig(config);

    return NextResponse.json({ success: true, slot: config.slots[slotId] });
  } catch (error) {
    console.error('Save error:', error);
    const message = error instanceof Error ? error.message : 'Errore sconosciuto';
    return NextResponse.json(
      { error: `Errore durante il salvataggio: ${message}` },
      { status: 500 }
    );
  }
}

// PUT: save all slots at once
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { slots } = body;

    if (!slots || typeof slots !== 'object') {
      return NextResponse.json(
        { error: 'Dati slots non validi' },
        { status: 400 }
      );
    }

    const config: MediaConfig = { slots: {} };

    for (const [slotId, slotData] of Object.entries(slots)) {
      if (!VALID_SLOT_IDS.includes(slotId)) continue;
      const data = slotData as Partial<SlotConfig>;

      config.slots[slotId] = {
        imageUrl: (typeof data.imageUrl === 'string' ? data.imageUrl.trim() : '') || '',
        videoUrl: (typeof data.videoUrl === 'string' ? data.videoUrl.trim() : '') || '',
        overlayColor: (typeof data.overlayColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(data.overlayColor))
          ? data.overlayColor
          : '#000000',
        overlayOpacity: typeof data.overlayOpacity === 'number'
          ? Math.max(0, Math.min(100, data.overlayOpacity))
          : 0,
      };
    }

    await saveConfig(config);

    return NextResponse.json({ success: true, slots: config.slots });
  } catch (error) {
    console.error('Save error:', error);
    const message = error instanceof Error ? error.message : 'Errore sconosciuto';
    return NextResponse.json(
      { error: `Errore durante il salvataggio: ${message}` },
      { status: 500 }
    );
  }
}

// GET: retrieve current media configuration
export async function GET() {
  const config = await loadConfig();

  const slots = VALID_SLOT_IDS.map(id => {
    const saved = config.slots[id];
    return {
      id,
      imageUrl: saved?.imageUrl || '',
      videoUrl: saved?.videoUrl || '',
      overlayColor: saved?.overlayColor || '#000000',
      overlayOpacity: saved?.overlayOpacity ?? 0,
    };
  });

  return NextResponse.json({ slots });
}
