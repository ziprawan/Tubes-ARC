import { NextResponse } from 'next/server';
import { getDbConnection } from '@/app/lib/db';
import type { DisasterReport } from '@/types/disaster';

interface LatestReport {
    title: string;
}

interface MostLikedReport {
    title: string;
    likes: number;
}

export async function GET() {
  try {
    const db = getDbConnection();

    {/* Mengambil judul Laporan terbaru yang disubmit */}
    const latestReportResult = db.prepare(
      'SELECT title FROM reports ORDER BY created_at DESC LIMIT 1'
    ).get() as LatestReport | undefined;

    {/* Judul Laporan dengan jumlah like terbanyak. Jika ada beberapa laporan dengan like sama, ambil yang terbaru. */}
    const mostLikedReportResult = db.prepare(
      'SELECT title, likes FROM reports ORDER BY likes DESC, created_at DESC LIMIT 1'
    ).get() as MostLikedReport | undefined;

    return NextResponse.json({
      latestReport: latestReportResult || null, 
      mostLikedReport: mostLikedReportResult || null, 
    });

  } catch (error) {
    console.error('API GET /api/reports/activity - Failed to fetch activity data:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to fetch activity data', error: errorMessage }, { status: 500 });
  }
}