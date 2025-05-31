import { NextRequest, NextResponse } from 'next/server';
import { getDbConnection } from '@/app/lib/db';

interface LikeParams {
  params: {
    id: string;
  };
}

export async function POST(request: NextRequest, { params }: LikeParams) {
  const reportId = parseInt(params.id, 10);

  if (isNaN(reportId)) {
    return NextResponse.json({ message: 'ID Laporan tidak valid.' }, { status: 400 });
  }

  try {
    const db = getDbConnection();

    const reportExists = db.prepare('SELECT id FROM reports WHERE id = ?').get(reportId);
    if (!reportExists) {
      return NextResponse.json({ message: 'Laporan tidak ditemukan.' }, { status: 404 });
    }

    db.prepare('UPDATE reports SET likes = likes + 1 WHERE id = ?').run(reportId);

    const updatedReport = db.prepare('SELECT likes FROM reports WHERE id = ?').get(reportId) as { likes: number };

    if (!updatedReport) {
        return NextResponse.json({ message: 'Gagal mengambil update likes.'}, { status: 500});
    }

    return NextResponse.json({ likes: updatedReport.likes });

  } catch (error) {
    console.error(`API POST /api/reports/${reportId}/like - Failed to like report:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Gagal menyukai laporan.', error: errorMessage }, { status: 500 });
  }
}