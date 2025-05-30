'use client';

import { FileText, Users, Heart, TrendingUp } from 'lucide-react';
import ReportsTimeline from '@/components/ReportsTimeline';
import ReportForm from '@/components/ReportForm';

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cornsilk to-white">      {/* Hero Section */}
      <div className="bg-accent text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-full">
                <FileText className="h-12 w-12 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Sistem Pelaporan Bencana
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Berbagi informasi dan saling membantu dalam situasi darurat bencana
            </p>
          </div>
        </div>
      </div>      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FileText className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">247</div>
            <div className="text-sm text-gray-600">Total Laporan</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">89</div>
            <div className="text-sm text-gray-600">Kontributor Aktif</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="text-sm text-gray-600">Bantuan Diberikan</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">Tingkat Respons</div>
          </div>
        </div>        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reports Timeline - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">Laporan Terbaru</h2>
              <p className="text-gray-600">
                Ikuti perkembangan kondisi bencana terbaru dari komunitas
              </p>
            </div>
            <ReportsTimeline />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Guidelines */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Panduan Pelaporan</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                    <span>Pastikan lokasi dan waktu kejadian akurat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                    <span>Jelaskan dampak kerusakan dengan detail</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                    <span>Sertakan foto untuk dokumentasi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                    <span>Sebutkan bantuan yang diperlukan</span>
                  </li>
                </ul>
              </div>

              {/* Emergency Tips */}
              <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4">Situasi Darurat?</h3>
                <p className="text-sm text-red-700 mb-4">
                  Jika Anda dalam situasi darurat yang mengancam jiwa, hubungi nomor darurat terlebih dahulu:
                </p>
                <div className="space-y-2">
                  <a href="tel:112" className="block bg-red-500 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors">
                    📞 112 - Nomor Darurat Nasional
                  </a>
                  <a href="tel:110" className="block bg-blue-500 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    🚔 110 - Polisi
                  </a>
                  <a href="tel:113" className="block bg-orange-500 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                    🚒 113 - Pemadam Kebakaran
                  </a>
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Etika Komunitas</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Berikan informasi yang akurat dan dapat diverifikasi</li>
                  <li>• Hormati privasi korban bencana</li>
                  <li>• Jangan menyebarkan informasi yang menimbulkan kepanikan</li>
                  <li>• Fokus pada bantuan dan solusi konstruktif</li>
                  <li>• Laporkan konten yang tidak pantas</li>
                </ul>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Aktivitas Terbaru</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <Heart className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-gray-700">25 orang membantu laporan banjir di Bekasi</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <FileText className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-gray-700">Laporan baru: Longsor di Bogor</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="bg-purple-100 p-1.5 rounded-full">
                      <Users className="h-3 w-3 text-purple-600" />
                    </div>
                    <span className="text-gray-700">12 relawan bergabung hari ini</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Report Button */}
      <ReportForm />
    </div>
  );
}
