'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import RecentDisasters from '@/components/RecentDisasters';
import LocationDisasters from '@/components/LocationDisasters';
import DisasterCard from '@/components/DisasterCard';
import NotificationBanner from '@/components/NotificationBanner';
import { DisasterType, Disaster } from '@/types/disaster';
import { fetchDisasterData } from '@/services/disasterApi';
import { Shield, AlertTriangle, Heart, X } from 'lucide-react';

export default function Home() {
  const [searchResults, setSearchResults] = useState<Disaster[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [allDisasters, setAllDisasters] = useState<Disaster[]>([]);

  // Fetch disasters for notifications
  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const data = await fetchDisasterData();
        const disasters: Disaster[] = [
          ...data.data.earthquakes,
          ...data.data.local_disasters,
          ...data.data.volcanoes
        ];
        setAllDisasters(disasters);
      } catch (error) {
        console.error('Error fetching disasters for notifications:', error);
      }
    };

    fetchDisasters();
    
    // Refresh every 10 minutes for notifications
    const interval = setInterval(fetchDisasters, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (query: string, type: DisasterType) => {
    setIsSearching(true);
    setShowResults(true);
      try {
      const data = await fetchDisasterData();
      let allDisasters: Disaster[] = [
        ...data.data.earthquakes,
        ...data.data.local_disasters,
        ...data.data.volcanoes
      ];

      // Filter by disaster type
      if (type !== 'all') {
        allDisasters = allDisasters.filter(disaster => disaster.type === type);
      }

      // Filter by location if query is provided
      if (query.trim()) {
        allDisasters = allDisasters.filter(disaster =>
          disaster.location_name.toLowerCase().includes(query.toLowerCase())
        );
      }

      setSearchResults(allDisasters);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setShowResults(false);
    setSearchResults([]);
  };  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Notification Banner */}
      <NotificationBanner disasters={allDisasters} />
        {/* Hero Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-full">
                <Shield className="h-12 w-12 text-emerald-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              DisasterAlert Indonesia
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Sistem Informasi dan Manajemen Bencana Real-time untuk Indonesia
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center bg-emerald-500/20 rounded-full px-4 py-2 border border-emerald-400/30">
                <AlertTriangle className="h-4 w-4 mr-2 text-emerald-300" />
                <span>Gempa Bumi</span>
              </div>              <div className="flex items-center bg-orange-500/20 rounded-full px-4 py-2 border border-orange-400/30">
                <AlertTriangle className="h-4 w-4 mr-2 text-orange-300" />
                <span>Gunung Berapi</span>
              </div>
              <div className="flex items-center bg-blue-500/20 rounded-full px-4 py-2 border border-blue-400/30">
                <AlertTriangle className="h-4 w-4 mr-2 text-blue-300" />
                <span>Banjir</span>
              </div>
              <div className="flex items-center bg-purple-500/20 rounded-full px-4 py-2 border border-purple-400/30">
                <AlertTriangle className="h-4 w-4 mr-2 text-purple-300" />
                <span>Angin Puting Beliung</span>
              </div></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <SearchBar onSearch={handleSearch} />

        {/* Search Results */}
        {showResults && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">              <h2 className="text-2xl font-bold text-gray-800">
                Hasil Pencarian
                {isSearching && <span className="ml-2 text-sm font-normal text-gray-500">Mencari...</span>}
              </h2>
              <button
                onClick={clearSearch}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-4 w-4" />
                Tutup
              </button>
            </div>
              {searchResults.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Ditemukan {searchResults.length} hasil pencarian</span>                  <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs border border-emerald-200">
                    Hasil terbaru
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {searchResults.map((disaster, index) => (
                    <DisasterCard key={`${disaster.type}-${index}`} disaster={disaster} />
                  ))}
                </div>
              </div>
            ) : !isSearching ? (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Tidak ada hasil ditemukan</p>
              </div>
            ) : null}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Recent Disasters */}
          <div>
            <RecentDisasters />
          </div>

          {/* Location-Specific Disasters */}
          <div>
            <LocationDisasters />
          </div>
        </div>        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100">
            <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Peringatan Dini</h3>
            <p className="text-gray-600 text-sm">
              Dapatkan notifikasi bencana terbaru di wilayah Anda secara real-time
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100">
            <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Panduan Siaga</h3>
            <p className="text-gray-600 text-sm">
              Pelajari cara mempersiapkan diri menghadapi berbagai jenis bencana
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100">
            <Heart className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Laporan Komunitas</h3>
            <p className="text-gray-600 text-sm">
              Berbagi informasi dan membantu sesama dalam situasi darurat
            </p>
          </div>
        </div>        {/* Credits */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tim Pengembang</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <p className="font-medium">HomePage</p>
              <p className="text-gray-600">Kurt & Ajos</p>
            </div>
            <div>
              <p className="font-medium">Preparation Guides</p>
              <p className="text-gray-600">Kindi & Ajil</p>
            </div>
            <div>
              <p className="font-medium">Reporting System</p>
              <p className="text-gray-600">Nuno, Agatha & Nafhan</p>
            </div>
            <div className="md:col-span-2">
              <p className="font-medium">Data Source</p>
              <p className="text-gray-600">BMKG, AHA Centre, NASA EONET</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
