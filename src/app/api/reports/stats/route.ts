import { NextResponse } from 'next/server';
import { getDbConnection } from '@/app/lib/db'; 

export async function GET() {
  try {
    const db = getDbConnection();

    {/* Total Laporan */}
    const totalReportsResult = db.prepare('SELECT COUNT(*) as count FROM reports').get() as { count: number };
    const totalReports = totalReportsResult?.count || 0;

    {/* Kontributor Aktif (jumlah author unik) */}
    const activeContributorsResult = db.prepare('SELECT COUNT(DISTINCT author) as count FROM reports').get() as { count: number };
    const activeContributors = activeContributorsResult?.count || 0;

    {/* Bantuan Diberikan (total likes) */}
    const aidProvidedResult = db.prepare('SELECT SUM(likes) as totalLikes FROM reports').get() as { totalLikes: number | null };
    const aidProvided = aidProvidedResult?.totalLikes || 0;

    return NextResponse.json({
      totalReports,
      activeContributors,
      aidProvided,
    });

  } catch (error) {
    console.error('API GET /api/reports/stats - Failed to fetch stats:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to fetch stats', error: errorMessage }, { status: 500 });
  }
}