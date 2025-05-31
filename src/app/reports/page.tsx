'use client';

import { FileText, Users, Heart, AlertTriangle, Loader2 } from 'lucide-react';
import ReportsTimeline from '@/components/ReportsTimeline';
import ReportForm from '@/components/ReportForm';
import { useEffect, useState } from 'react';

interface Stats {
  totalReports: number;
  activeContributors: number;
  aidProvided: number;
}

interface ActivityData {
  latestReport: { title: string } | null;
  mostLikedReport: { title: string; likes: number } | null;
}

export default function ReportsPage() {
  const [stats, setStats] = useState<Stats>({
    totalReports: 0,
    activeContributors: 0,
    aidProvided: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [activityData, setActivityData] = useState<ActivityData>({
    latestReport: null,
    mostLikedReport: null,
  });
  const [isLoadingActivity, setIsLoadingActivity] = useState(true);
  const [activityError, setActivityError] = useState<string | null>(null);

  const fetchAllPageData = async () => {
    setIsLoadingStats(true);
    setIsLoadingActivity(true);
    setStatsError(null);
    setActivityError(null);

    try {
      const statsResponse = await fetch('/api/reports/stats');
      if (!statsResponse.ok) {
        let errorMsg = `HTTP error ${statsResponse.status}: ${statsResponse.statusText}`;
        try {
          const errorData = await statsResponse.json();
          errorMsg = errorData.message || errorMsg;
        } catch (jsonError) { /* Abaikan */ }
        throw new Error(`Gagal mengambil statistik: ${errorMsg}`);
      }
      const statsData = await statsResponse.json();
      setStats({
        totalReports: Number(statsData.totalReports) || 0,
        activeContributors: Number(statsData.activeContributors) || 0,
        aidProvided: Number(statsData.aidProvided) || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      const errorMessage = error instanceof Error ? error.message : 'Tidak dapat memuat statistik.';
      setStatsError(errorMessage);
      setStats({ totalReports: 0, activeContributors: 0, aidProvided: 0 });
    } finally {
      setIsLoadingStats(false);
    }

    try {
      const activityResponse = await fetch('/api/reports/activity');
      if (!activityResponse.ok) {
        let errorMsg = `HTTP error ${activityResponse.status}: ${activityResponse.statusText}`;
        try {
            const errorData = await activityResponse.json();
            errorMsg = errorData.message || errorMsg;
        } catch (jsonError) { /* Abaikan */ }
        throw new Error(`Gagal mengambil data aktivitas: ${errorMsg}`);
      }
      const fetchedActivityData = await activityResponse.json();
      setActivityData(fetchedActivityData);
    } catch (error) {
      console.error("Error fetching activity data:", error);
      const errorMessage = error instanceof Error ? error.message : 'Tidak dapat memuat data aktivitas.';
      setActivityError(errorMessage);
      setActivityData({ latestReport: null, mostLikedReport: null });
    } finally {
      setIsLoadingActivity(false);
    }
  };

  useEffect(() => {
    fetchAllPageData();
    const handleDataChange = () => fetchAllPageData();
    window.addEventListener('reportSubmitted', handleDataChange);
    return () => {
      window.removeEventListener('reportSubmitted', handleDataChange);
    };
  }, []);

  const statItems = [
    { IconComponent: FileText, dataKey: 'totalReports', label: 'Total Laporan', color: 'text-blue-500 dark:text-blue-400' },
    { IconComponent: Users, dataKey: 'activeContributors', label: 'Kontributor Aktif', color: 'text-green-500 dark:text-green-400' },
    { IconComponent: Heart, dataKey: 'aidProvided', label: 'Bantuan Diberikan', color: 'text-red-500 dark:text-red-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cornsilk to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-accent text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white p-3 sm:p-4 rounded-full shadow-lg">
                <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-[#15202b]" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Sistem Pelaporan Bencana
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Berbagi informasi dan saling membantu dalam situasi darurat bencana
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Stats Section */}
        {statsError && (
            <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Gagal Memuat Statistik</p>
                <p>{statsError}</p>
            </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {statItems.map(stat => {
            const CurrentIcon = stat.IconComponent;
            const valueToDisplay = isLoadingStats ? <Loader2 className="h-7 w-7 mx-auto animate-spin text-gray-500" /> : stats[stat.dataKey as keyof Stats];

            return (
              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 sm:p-6 text-center transition-all hover:shadow-xl hover:scale-105">
                <CurrentIcon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 min-h-[36px] sm:min-h-[40px] flex items-center justify-center">
                  {valueToDisplay}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary dark:text-blue-400 mb-1">Laporan Terbaru</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Ikuti perkembangan kondisi bencana terbaru dari komunitas
              </p>
            </div>
            <ReportsTimeline />
          </div>

          <div className="lg:col-span-1"> {/* Sidebar */}
            <div className="space-y-6">
              {/* Panduan Pelaporan */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                 <h3 className="text-lg font-semibold text-primary dark:text-blue-400 mb-4">Panduan Pelaporan</h3>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  {[
                    'Pastikan lokasi dan waktu kejadian akurat',
                    'Jelaskan dampak kerusakan dengan detail',
                    'Sertakan foto untuk dokumentasi yang jelas',
                    'Sebutkan jenis bantuan yang paling diperlukan',
                  ].map((item, index) => (
                    <li key={item} className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">{index + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips Darurat */}
              <div className="bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-700 p-6">
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4">Situasi Darurat?</h3>
                <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                  Jika Anda dalam situasi darurat yang mengancam jiwa, hubungi nomor darurat resmi terlebih dahulu:
                </p>
                <div className="space-y-2">
                  {[
                    { tel: '112', label: 'Nomor Darurat Nasional', color: 'bg-red-500 hover:bg-red-600' },
                    { tel: '110', label: 'Polisi', color: 'bg-blue-500 hover:bg-blue-600' },
                    { tel: '113', label: 'Pemadam Kebakaran', color: 'bg-orange-500 hover:bg-orange-600' },
                  ].map(contact => (
                    <a key={contact.tel} href={`tel:${contact.tel}`} className={`block ${contact.color} text-white text-center py-2.5 px-4 rounded-lg font-medium transition-colors text-sm`}>
                      📞 {contact.label} ({contact.tel})
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Etika & Aktivitas Komunitas */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                 <h3 className="text-lg font-semibold text-primary dark:text-blue-400 mb-4">Etika & Aktivitas Komunitas</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Jaga informasi tetap akurat, hormati privasi, dan fokus pada solusi.</p>
                 {isLoadingActivity ? (
                    <div className="space-y-3">
                        {[1,2].map(i => <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>)}
                    </div>
                 ) : activityError ? (
                    <p className="text-sm text-red-500 dark:text-red-400">{activityError}</p>
                 ) : (
                    <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                        {activityData.latestReport ? (
                            <div className="flex items-center space-x-3">
                                <div className="bg-green-100 dark:bg-green-700 p-1.5 rounded-full flex-shrink-0">
                                    <FileText className="h-3.5 w-3.5 text-green-600 dark:text-green-300" />
                                </div>
                                <span className="truncate">Laporan baru: <strong className="font-semibold">{activityData.latestReport.title}</strong></span>
                            </div>
                        ) : (
                            <p className="text-xs text-gray-500">Belum ada laporan terbaru.</p>
                        )}

                        {activityData.mostLikedReport ? (
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-100 dark:bg-blue-700 p-1.5 rounded-full flex-shrink-0">
                                    <Heart className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                                </div>
                                <span className="truncate">
                                    <strong className="font-semibold">{activityData.mostLikedReport.likes} orang</strong> membantu laporan "{activityData.mostLikedReport.title}"
                                </span>
                            </div>
                        ) : (
                             <p className="text-xs text-gray-500">Belum ada laporan yang dibantu.</p>
                        )}
                    </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReportForm />
    </div>
  );
}