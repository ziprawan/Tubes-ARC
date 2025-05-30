'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import DisasterCard from './DisasterCard';
import DisasterCardSkeleton from './DisasterCardSkeleton';
import { getRecentDisasters } from '@/services/disasterApi';
import { formatLocationName } from '@/utils/locationFormatter';

export default function RecentDisasters() {
  const [disasters, setDisasters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDisasters = async () => {
    try {
      setLoading(true);
      setError(null);
      const recentDisasters = await getRecentDisasters(8);
      setDisasters(recentDisasters);
    } catch (err) {
      setError('Gagal memuat data bencana terbaru');
      console.error('Error fetching recent disasters:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisasters();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchDisasters, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-blue-500" />
            Bencana Terbaru di Indonesia
          </h2>
          <div className="flex items-center px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg border border-blue-200">
            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
            Memuat...
          </div>
        </div>
          <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="h-4 bg-blue-100 rounded w-48 animate-pulse"></div>
            <div className="h-6 bg-emerald-100 rounded-full w-32 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {Array.from({ length: 6 }, (_, index) => (
              <DisasterCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 border border-red-100">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4 font-medium">{error}</p>
          <button
            onClick={fetchDisasters}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <AlertTriangle className="h-6 w-6 mr-2 text-blue-500" />
          Bencana Terbaru di Indonesia
        </h2>
        <button
          onClick={fetchDisasters}
          disabled={loading}
          className="flex items-center px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors border border-blue-200"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Perbarui
        </button>
      </div>
        {disasters.length === 0 ? (
        <div className="text-center py-12">
          <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">
            Tidak ada data bencana tersedia.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Coba perbarui data atau periksa koneksi internet Anda.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Menampilkan <span className="text-blue-600 font-semibold">{disasters.length}</span> bencana terbaru
            </span>
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs border border-emerald-200">
              Auto-refresh: 5 menit
            </span>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {disasters.map((disaster, index) => (
              <DisasterCard key={`${disaster.type}-${disaster.incident_time}-${index}`} disaster={disaster} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
