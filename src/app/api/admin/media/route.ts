import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readdir, stat } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

// Disable the default body parser size limit for this route
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Content-Type deve essere multipart/form-data' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const slotId = formData.get('slotId') as string | null;
    const mediaType = formData.get('type') as string | null; // 'image' or 'video'

    if (!file || !slotId || !mediaType) {
      return NextResponse.json(
        { error: 'File, slotId e type sono richiesti' },
        { status: 400 }
      );
    }

    // Validate slotId - only allow alphanumeric and hyphens
    if (!/^[a-zA-Z0-9-]+$/.test(slotId)) {
      return NextResponse.json(
        { error: 'slotId non valido' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/webm'];
    const allowedTypes = mediaType === 'video' ? allowedVideoTypes : allowedImageTypes;

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipo di file non supportato: ${file.type}. Tipi ammessi: ${allowedTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Max file size: 50MB
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File troppo grande. Dimensione massima: 50MB' },
        { status: 400 }
      );
    }

    // Determine target directory
    const subDir = mediaType === 'video' ? 'video' : 'img';
    const publicDir = path.join(process.cwd(), 'public', subDir);

    // Ensure directory exists
    await mkdir(publicDir, { recursive: true });

    // Generate filename using slotId to keep it organized
    const originalExt = file.name.split('.').pop()?.toLowerCase();
    const extMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'video/mp4': 'mp4',
      'video/webm': 'webm',
    };
    const ext = extMap[file.type] || originalExt || (mediaType === 'video' ? 'mp4' : 'jpg');
    const filename = `${slotId}.${ext}`;
    const filePath = path.join(publicDir, filename);

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Verify file was written
    const fileStat = await stat(filePath);

    // Return the public URL
    const publicUrl = `/${subDir}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: fileStat.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Errore sconosciuto';
    return NextResponse.json(
      { error: `Errore durante il caricamento: ${message}` },
      { status: 500 }
    );
  }
}

// GET: retrieve current media configuration + check which files exist
export async function GET() {
  const slots = [
    { id: 'hero-bg', section: 'Hero principale', type: 'image' as const, src: '', videoUrl: '' },
    { id: 'showcase-video', section: 'Sezione Showcase', type: 'video' as const, src: '', videoUrl: '' },
    { id: 'showcase-bg', section: 'Sezione Showcase', type: 'image' as const, src: '', videoUrl: '' },
    { id: 'gallery-1', section: 'Galleria Ispirazioni', type: 'image' as const, src: '', videoUrl: '' },
    { id: 'gallery-2', section: 'Galleria Ispirazioni', type: 'image' as const, src: '', videoUrl: '' },
    { id: 'gallery-3', section: 'Galleria Ispirazioni', type: 'image' as const, src: '', videoUrl: '' },
    { id: 'gallery-4', section: 'Galleria Ispirazioni', type: 'image' as const, src: '', videoUrl: '' },
  ];

  // Check actual files on disk
  try {
    const imgDir = path.join(process.cwd(), 'public', 'img');
    const videoDir = path.join(process.cwd(), 'public', 'video');

    let imgFiles: string[] = [];
    let videoFiles: string[] = [];

    try { imgFiles = await readdir(imgDir); } catch { /* dir may not exist */ }
    try { videoFiles = await readdir(videoDir); } catch { /* dir may not exist */ }

    for (const slot of slots) {
      const dir = slot.type === 'video' ? videoFiles : imgFiles;
      const prefix = slot.type === 'video' ? '/video/' : '/img/';
      const matchingFile = dir.find(f => f.startsWith(slot.id + '.'));
      if (matchingFile) {
        slot.src = prefix + matchingFile;
      }
    }
  } catch {
    // Ignore errors reading disk
  }

  return NextResponse.json({ slots });
}
