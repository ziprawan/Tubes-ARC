'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X, Bell } from 'lucide-react';
import { Disaster } from '@/types/disaster';

interface NotificationBannerProps {
  disasters: Disaster[];
}

export default function NotificationBanner({ disasters }: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDisaster, setCurrentDisaster] = useState<Disaster | null>(null);

  useEffect(() => {
    if (disasters.length > 0) {
      // Show the most recent disaster
      const mostRecent = disasters.reduce((latest, current) => 
        current.incident_time > latest.incident_time ? current : latest
      );
      
      // Only show if it's within the last 24 hours
      const dayAgo = Date.now() - (24 * 60 * 60 * 1000);
      if (mostRecent.incident_time > dayAgo) {
        setCurrentDisaster(mostRecent);
        setIsVisible(true);
      }
    }
  }, [disasters]);

  if (!isVisible || !currentDisaster) return null;

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case 'earthquake':
        return '🌍';
      case 'volcano':
        return '🌋';
      case 'flood':
        return '🌊';
      case 'tornadoes':
        return '🌪️';
      default:
        return '⚠️';
    }
  };

  const getDisasterLabel = (type: string) => {
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
        return 'Bencana';
    }
  };
  return (
    <div className="fixed top-20 left-4 right-4 z-50 md:left-6 md:right-6 lg:left-auto lg:right-6 lg:w-96">
      <div className="bg-orange-500 text-white rounded-lg shadow-lg p-4 animate-slide-down border border-orange-400">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Bell className="h-5 w-5 mt-0.5 text-orange-100" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{getDisasterIcon(currentDisaster.type)}</span>
              <h3 className="font-semibold text-sm">
                {getDisasterLabel(currentDisaster.type)} Terbaru
              </h3>
            </div>
            <p className="text-sm opacity-90">
              {currentDisaster.location_name}
            </p>
            <p className="text-xs opacity-75 mt-1">
              {new Date(currentDisaster.incident_time).toLocaleString('id-ID')}
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-orange-600 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
