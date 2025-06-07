'use client';

import { DisasterReport, DisasterType } from '@/types/disaster';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  AlertTriangle,
  Clock,
  FileText,
  Filter,
  Heart,
  MapPin,
  MessageCircle,
  Share2
} from 'lucide-react';
import { useState } from 'react';

interface ReportCardProps {
  report: DisasterReport;
}

const getDisasterTypeLabel = (type: DisasterType) => {
  switch (type) {
    case 'earthquake':
      return 'Gempa Bumi';
    case 'volcano':
      return 'Gunung Berapi';
    case 'flood':
      return 'Banjir';
    case 'tornadoes':
      return 'Angin Puting Beliung';
    default:
      return 'Lainnya';
  }
};

const getDisasterColor = (type: DisasterType) => {
  switch (type) {
    case 'earthquake':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'volcano':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'flood':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'tornadoes':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

function ReportCard({ report }: ReportCardProps) {
  const timeAgo = formatDistanceToNow(new Date(report.created_at), {
    addSuffix: true,
    locale: id,
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDisasterColor(report.disaster_category)}`}>
                {getDisasterTypeLabel(report.disaster_category)}
              </span>
              <span className="text-xs text-gray-500">oleh {report.author}</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {timeAgo}
        </div>
      </div>

      <div className="flex items-center text-gray-600 text-sm mb-3">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{report.location}</span>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{report.description}</p>

      {report.documentation && report.documentation.length > 0 && (
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto">
            {report.documentation.slice(0, 3).map((doc, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-2 text-xs text-gray-600 whitespace-nowrap">
                📷 Dokumentasi {index + 1}
              </div>
            ))}
            {report.documentation.length > 3 && (
              <div className="bg-gray-100 rounded-lg p-2 text-xs text-gray-600">
                +{report.documentation.length - 3} lainnya
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
            <Heart className="h-4 w-4" />
            <span className="text-sm">Bantu</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">Komentar</span>
          </button>
        </div>
        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
          <Share2 className="h-4 w-4" />
          <span className="text-sm">Bagikan</span>
        </button>
      </div>
    </div>
  );
}

export default function ReportsTimeline() {
  const [reports] = useState<DisasterReport[]>([
    {
      id: '1',
      title: 'Banjir Melanda Perumahan Griya Indah',
      disaster_category: 'flood',
      location: 'Bekasi, Jawa Barat',
      description: 'Banjir setinggi 1 meter melanda perumahan Griya Indah sejak pagi tadi. Beberapa rumah terendam dan warga mulai mengungsi ke tempat yang lebih tinggi. Diperlukan bantuan perahu karet dan makanan untuk evakuasi.',
      documentation: ['foto1.jpg', 'foto2.jpg'],
      created_at: Date.now() - 2 * 60 * 60 * 1000, 
      author: 'Ahmad Wahyudi'
    },
    {
      id: '2',
      title: 'Gempa 5.2 SR Guncang Wilayah Lombok',
      disaster_category: 'earthquake',
      location: 'Lombok Timur, NTB',
      description: 'Gempa berkekuatan 5.2 SR mengguncang Lombok Timur pagi ini. Beberapa bangunan mengalami retak-retak. Masyarakat panik dan keluar rumah. Belum ada laporan korban jiwa, namun perlu waspada terhadap gempa susulan.',
      documentation: ['gempa1.jpg'],
      created_at: Date.now() - 4 * 60 * 60 * 1000,
      author: 'Siti Nurhaliza'
    },
    {
      id: '3',
      title: 'Angin Puting Beliung Rusak Puluhan Rumah',
      disaster_category: 'tornadoes',
      location: 'Klaten, Jawa Tengah',
      description: 'Angin puting beliung menerjang Desa Sidoarum, merusak 45 rumah dan menumbangkan pohon-pohon besar. 3 orang luka ringan dan puluhan keluarga kehilangan tempat tinggal. Dibutuhkan tenda darurat dan bantuan medis.',
      documentation: ['tornado1.jpg', 'tornado2.jpg', 'tornado3.jpg'],
      created_at: Date.now() - 6 * 60 * 60 * 1000, 
      author: 'Budi Santoso'
    },
    {
      id: '4',
      title: 'Aktivitas Gunung Merapi Meningkat',
      disaster_category: 'volcano',
      location: 'Sleman, Yogyakarta',
      description: 'Status Gunung Merapi dinaikkan menjadi Siaga (Level III). Terdeteksi peningkatan aktivitas vulkanik dengan hembusan abu tipis. Warga di radius 3 km diminta bersiap untuk evakuasi. Masker dan air bersih diperlukan.',
      documentation: ['merapi1.jpg'],
      created_at: Date.now() - 8 * 60 * 60 * 1000, 
      author: 'Dr. Suryanto'
    },
    {
      id: '5',
      title: 'Banjir Bandang di Kali Ciliwung',
      disaster_category: 'flood',
      location: 'Jakarta Timur, DKI Jakarta',
      description: 'Banjir bandang akibat luapan Kali Ciliwung merendam kawasan Kampung Melayu. Ketinggian air mencapai 2 meter. Ribuan warga mengungsi ke tempat yang lebih aman. Listrik padam di sebagian wilayah.',
      documentation: ['ciliwung1.jpg', 'ciliwung2.jpg'],
      created_at: Date.now() - 12 * 60 * 60 * 1000, 
      author: 'Maria Susilowati'
    }
  ]);

  const [filteredReports, setFilteredReports] = useState(reports);
  const [selectedFilter, setSelectedFilter] = useState<DisasterType | 'all'>('all');

  const handleFilter = (type: DisasterType | 'all') => {
    setSelectedFilter(type);
    if (type === 'all') {
      setFilteredReports(reports);
    } else {
      setFilteredReports(reports.filter(report => report.disaster_category === type));
    }
  };

  const filterOptions = [
    { value: 'all', label: 'Semua Laporan' },
    { value: 'earthquake', label: 'Gempa Bumi' },
    { value: 'volcano', label: 'Gunung Berapi' },
    { value: 'flood', label: 'Banjir' },
    { value: 'tornadoes', label: 'Angin Puting Beliung' },
  ];

  return (
    <div>
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter Laporan
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilter(option.value as DisasterType | 'all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === option.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada laporan</h3>
            <p className="text-gray-500">
              Belum ada laporan untuk kategori yang dipilih.
            </p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))
        )}
      </div>
    </div>
  );
}
