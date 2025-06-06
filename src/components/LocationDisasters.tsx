'use client';

import { useState, useEffect } from 'react';
import { MapPin, RefreshCw, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import DisasterCard from './DisasterCard';
import { getDisastersByLocation } from '@/services/disasterApi';
import { formatLocationName } from '@/utils/locationFormatter';

export default function LocationDisasters() {
  const [userInputLocation, setUserInputLocation] = useState('');
  const [currentSearchedLocation, setCurrentSearchedLocation] = useState('');
  const [locationBasedDisasters, setLocationBasedDisasters] = useState<any[]>([]);
  const [isLoadingDisasters, setIsLoadingDisasters] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(1); // Start at 1 because of virtual first slide
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const fetchLocationDisasters = async (searchLocation: string) => {
    if (!searchLocation.trim()) return;
    
    try {
      setIsLoadingDisasters(true);
      setFetchError(null);
      const locationDisasters = await getDisastersByLocation(searchLocation);      setLocationBasedDisasters(locationDisasters);
      setCurrentSearchedLocation(searchLocation);
      setCurrentSlide(1); // Reset ke slide pertama
      setIsTransitioning(true); // Enable transitions untuk data baru
      localStorage.setItem('preferredLocation', searchLocation);
    } catch (err) {
      setFetchError('Gagal memuat data bencana untuk lokasi tersebut');
      console.error('Error fetching location disasters:', err);
    } finally {
      setIsLoadingDisasters(false);
    }
  };

  useEffect(() => {
    // Load saved location
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
  };  // Fungsi untuk mengubah slide
  const nextSlide = () => {
    if (locationBasedDisasters.length > 1) {
      if (currentSlide === locationBasedDisasters.length) {
        // Ketika berada di slide terakhir, kembali ke virtual pertama
        setCurrentSlide(locationBasedDisasters.length + 1);
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentSlide(1);
          setTimeout(() => setIsTransitioning(true), 50);
        }, 500);
      } else {
        setCurrentSlide(prev => prev + 1);
      }
    }
  };

  const prevSlide = () => {
    if (locationBasedDisasters.length > 1) {
      if (currentSlide === 1) {
        // At first real slide, go to virtual previous slide then reset to last real slide
        setCurrentSlide(0);
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentSlide(locationBasedDisasters.length);
          setTimeout(() => setIsTransitioning(true), 50);
        }, 500);
      } else {
        setCurrentSlide(prev => prev - 1);
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index + 1); // Add 1 to account for virtual first slide
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && locationBasedDisasters.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, locationBasedDisasters.length, currentSlide]);return (
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
                {/* Slider Container */}
              <div className="relative">
                {/* Main Slider */}
                <div 
                  className="overflow-hidden rounded-lg"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <div 
                    className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {/* Virtual previous slide (last item) for infinite effect */}
                    {locationBasedDisasters.length > 1 && (
                      <div key="virtual-prev" className="w-full flex-shrink-0">
                        <DisasterCard disaster={locationBasedDisasters[locationBasedDisasters.length - 1]} />
                      </div>
                    )}
                    
                    {/* Main slides */}
                    {locationBasedDisasters.map((disaster: any, index: number) => (
                      <div key={`${disaster.type}-${disaster.incident_time}-${index}`} className="w-full flex-shrink-0">
                        <DisasterCard disaster={disaster} />
                      </div>
                    ))}
                    
                    {/* Virtual next slide (first item) for infinite effect */}
                    {locationBasedDisasters.length > 1 && (
                      <div key="virtual-next" className="w-full flex-shrink-0">
                        <DisasterCard disaster={locationBasedDisasters[0]} />
                      </div>
                    )}
                  </div>
                </div> 
                {/*navigasi panah */}
                {locationBasedDisasters.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 z-10 border border-gray-200"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 z-10 border border-gray-200"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
                {/* Indikator dots */}
                {locationBasedDisasters.length > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    {locationBasedDisasters.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === (currentSlide - 1) % locationBasedDisasters.length
                            ? 'bg-purple-500 scale-110' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}                
                {/* Indikator autoplay */}
                {locationBasedDisasters.length > 1 && (
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className={`text-xs px-3 py-1 rounded-full transition-colors ${
                        isAutoPlaying 
                          ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
