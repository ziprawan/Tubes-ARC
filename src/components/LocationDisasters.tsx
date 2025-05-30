'use client';

import { useState, useEffect } from 'react';
import { MapPin, RefreshCw, AlertCircle } from 'lucide-react';
import DisasterCard from './DisasterCard';
import { getDisastersByLocation } from '@/services/disasterApi';
import { formatLocationName } from '@/utils/locationFormatter';

export default function LocationDisasters() {
  const [userInputLocation, setUserInputLocation] = useState('');
  const [currentSearchedLocation, setCurrentSearchedLocation] = useState('');
  const [locationBasedDisasters, setLocationBasedDisasters] = useState<any[]>([]);
  const [isLoadingDisasters, setIsLoadingDisasters] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchLocationDisasters = async (searchLocation: string) => {
    if (!searchLocation.trim()) return;
    
    try {
      setIsLoadingDisasters(true);
      setFetchError(null);
      const locationDisasters = await getDisastersByLocation(searchLocation);
      setLocationBasedDisasters(locationDisasters);
      setCurrentSearchedLocation(searchLocation);
      localStorage.setItem('preferredLocation', searchLocation);
    } catch (err) {
      setFetchError('Gagal memuat data bencana untuk lokasi tersebut');
      console.error('Error fetching location disasters:', err);
    } finally {
      setIsLoadingDisasters(false);
    }
  };

  useEffect(() => {
    // Load saved location preference
    const savedUserLocation = localStorage.getItem('preferredLocation');
    if (savedUserLocation) {
      setUserInputLocation(savedUserLocation);
      fetchLocationDisasters(savedUserLocation);
    }
  }, []);

  const handleLocationSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLocationDisasters(userInputLocation);
  };

  const handleRefreshLocationData = () => {
    if (currentSearchedLocation) {
      fetchLocationDisasters(currentSearchedLocation);
    }
  };  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <MapPin className="h-6 w-6 mr-2 text-purple-500" />
          Bencana di Lokasi Spesifik
        </h2>        {currentSearchedLocation && (
          <button
            onClick={handleRefreshLocationData}
            disabled={isLoadingDisasters}
            className="flex items-center px-4 py-2 text-sm bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors border border-purple-200"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingDisasters ? 'animate-spin' : ''}`} />
            Perbarui
          </button>
        )}
      </div>      <form onSubmit={handleLocationSearchSubmit} className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />            <input
              type="text"
              placeholder="Masukkan nama kota/provinsi (contoh: Jakarta, Jawa Barat)"
              value={userInputLocation}
              onChange={(e) => setUserInputLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoadingDisasters || !userInputLocation.trim()}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isLoadingDisasters ? (
              <div className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Mencari...
              </div>
            ) : (
              'Cari'
            )}
          </button>
        </div>
      </form>      {currentSearchedLocation && (        <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800">
            Menampilkan bencana di sekitar: <strong>{formatLocationName(currentSearchedLocation)}</strong>
          </p>
        </div>
      )}      {isLoadingDisasters && (
        <div className="text-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-purple-500 mx-auto mb-3" />
          <p className="text-gray-600">Mencari bencana di {userInputLocation}...</p>
        </div>
      )}      {fetchError && (
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{fetchError}</p>
          <button
            onClick={() => fetchLocationDisasters(userInputLocation)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
          >
            Coba Lagi
          </button>
        </div>
      )}      {!isLoadingDisasters && !fetchError && currentSearchedLocation && (<div>
          {locationBasedDisasters.length === 0 ? (            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Tidak ada bencana yang ditemukan di sekitar <strong>{formatLocationName(currentSearchedLocation)}</strong>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Ini adalah kabar baik! Coba cari lokasi lain atau periksa kembali nanti.
              </p>
            </div>) : (
            <div className="space-y-4">              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Ditemukan <span className="font-semibold text-purple-600">{locationBasedDisasters.length}</span> bencana di sekitar <span className="font-semibold">{currentSearchedLocation}</span>
                </span>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Diperbarui: {new Date().toLocaleTimeString('id-ID', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {locationBasedDisasters.map((disaster: any, index: number) => (
                  <DisasterCard key={`${disaster.type}-${disaster.incident_time}-${index}`} disaster={disaster} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
