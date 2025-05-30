'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showStatus && isOnline) return null;

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 md:left-6 md:right-auto md:w-80 ${
      showStatus ? 'animate-slide-up' : ''
    }`}>
      <div className={`rounded-lg shadow-lg p-3 flex items-center gap-3 ${
        isOnline 
          ? 'bg-green-600 text-white' 
          : 'bg-red-600 text-white'
      }`}>
        {isOnline ? (
          <Wifi className="h-5 w-5 flex-shrink-0" />
        ) : (
          <WifiOff className="h-5 w-5 flex-shrink-0" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium">
            {isOnline ? 'Kembali Online' : 'Tidak Ada Koneksi'}
          </p>
          <p className="text-xs opacity-90">
            {isOnline 
              ? 'Data bencana akan diperbarui' 
              : 'Menggunakan data tersimpan'
            }
          </p>
        </div>
        {isOnline && (
          <button
            onClick={() => setShowStatus(false)}
            className="p-1 hover:bg-green-700 rounded transition-colors"
          >
            <AlertCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
