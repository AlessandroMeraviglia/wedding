import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Allow large file uploads (50MB)
export const dynamic = 'force-dynamic';


export async function POST(request: NextRequest) {
  try {
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

    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/webm'];
    const allowedTypes = mediaType === 'video' ? allowedVideoTypes : allowedImageTypes;

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipo di file non supportato. Tipi ammessi: ${allowedTypes.join(', ')}` },
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
    const ext = file.name.split('.').pop() || (mediaType === 'video' ? 'mp4' : 'jpg');
    const filename = `${slotId}.${ext}`;
    const filePath = path.join(publicDir, filename);

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/${subDir}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Errore durante il caricamento del file' },
      { status: 500 }
    );
  }
}

// GET: retrieve current media configuration
export async function GET() {
  // In production this would read from a database
  // For now return a default configuration
  return NextResponse.json({
    slots: [
      { id: 'hero-bg', section: 'Hero principale', type: 'image', src: '', videoUrl: '' },
      { id: 'showcase-video', section: 'Sezione Showcase', type: 'video', src: '', videoUrl: '' },
      { id: 'showcase-bg', section: 'Sezione Showcase', type: 'image', src: '', videoUrl: '' },
      { id: 'gallery-1', section: 'Galleria Ispirazioni', type: 'image', src: '', videoUrl: '' },
      { id: 'gallery-2', section: 'Galleria Ispirazioni', type: 'image', src: '', videoUrl: '' },
      { id: 'gallery-3', section: 'Galleria Ispirazioni', type: 'image', src: '', videoUrl: '' },
      { id: 'gallery-4', section: 'Galleria Ispirazioni', type: 'image', src: '', videoUrl: '' },
    ],
  });
}
