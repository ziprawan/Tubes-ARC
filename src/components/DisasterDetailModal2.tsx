'use client';

import { useEffect } from 'react';
import { X, MapPin, Calendar } from 'lucide-react';
import { formatLocationName } from '@/utils/locationFormatter';

// Konstanta untuk pemeliharaan yang lebih baik
const DISASTER_TYPE_LABELS = {
  earthquake: 'Gempa Bumi',
  volcano: 'Gunung Berapi',
  flood: 'Banjir',
  tornadoes: 'Angin Puting Beliung'
} as const;

const DISASTER_THEME_COLORS = {
  earthquake: { primaryColor: '#10b981', backgroundColor: '#ecfdf5' },
  volcano: { primaryColor: '#f97316', backgroundColor: '#fff7ed' },
  flood: { primaryColor: '#3b82f6', backgroundColor: '#eff6ff' },
  tornadoes: { primaryColor: '#8b5cf6', backgroundColor: '#f5f3ff' },
  default: { primaryColor: '#6b7280', backgroundColor: '#f9fafb' }
} as const;

const EMERGENCY_CONTACT_NUMBERS = {
  police: '110',
  firefighter: '113',
  ambulance: '118',
  searchAndRescue: '115',
  disasterManagement: '117'
} as const;

interface DisasterData {
  type: string;
  coordinates: [number, number];
  location_name: string;
  incident_time: number;
  source: string;
}

interface DisasterDetailModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  disasterData: DisasterData | null;
}

interface DisasterThemeColors {
  primaryColor: string;
  backgroundColor: string;
}

const getDisasterTypeDisplayName = (disasterType: string): string => {
  return DISASTER_TYPE_LABELS[disasterType as keyof typeof DISASTER_TYPE_LABELS] || disasterType;
};

const getDisasterThemeColors = (disasterType: string): DisasterThemeColors => {
  return DISASTER_THEME_COLORS[disasterType as keyof typeof DISASTER_THEME_COLORS] || DISASTER_THEME_COLORS.default;
};

export default function DisasterDetailModal({ 
  isModalOpen, 
  onModalClose, 
  disasterData 
}: DisasterDetailModalProps) {  // Efek untuk menangani scroll body ketika modal terbuka
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Fungsi pembersihan untuk mengembalikan scroll
    return () => { 
      document.body.style.overflow = 'unset'; 
    };
  }, [isModalOpen]);
  // Efek untuk menangani penekanan tombol ESC
  useEffect(() => {
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onModalClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscapeKeyPress);
      return () => document.removeEventListener('keydown', handleEscapeKeyPress);
    }
  }, [isModalOpen, onModalClose]);
  // Return awal jika modal ditutup atau tidak ada data
  if (!isModalOpen || !disasterData) {
    return null;
  }

  const themeColors = getDisasterThemeColors(disasterData.type);
  const disasterTypeDisplayName = getDisasterTypeDisplayName(disasterData.type);
  const formattedLocationName = formatLocationName(disasterData.location_name);
    // Periksa apakah koordinat valid (bukan 0,0)
  const hasValidCoordinates = disasterData.coordinates[0] !== 0 && disasterData.coordinates[1] !== 0;
  
  const formattedIncidentDate = new Date(disasterData.incident_time).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedIncidentTime = new Date(disasterData.incident_time).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Inline styles for better control over positioning
  const modalOverlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  };

  const modalContentStyles: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  };

  const modalHeaderStyles: React.CSSProperties = {
    background: `linear-gradient(135deg, ${themeColors.primaryColor}, ${themeColors.primaryColor}dd)`,
    color: 'white',
    padding: '1.5rem',
    borderRadius: '12px 12px 0 0',
    position: 'relative'
  };

  const closeButtonStyles: React.CSSProperties = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white'
  };

  return (
    <div style={modalOverlayStyles} onClick={onModalClose}>
      <div style={modalContentStyles} onClick={(event) => event.stopPropagation()}>
        {/* Modal Header */}
        <div style={modalHeaderStyles}>
          <button
            onClick={onModalClose}
            style={closeButtonStyles}
            aria-label="Tutup modal"
          >
            <X size={20} />
          </button>
          
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {disasterTypeDisplayName}
          </h2>
          <p style={{ margin: 0, opacity: 0.9 }}>
            Informasi Detail Bencana
          </p>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '1.5rem' }}>
          {/* Location & Time Information */}
          <div style={{ 
            backgroundColor: themeColors.backgroundColor, 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            border: `1px solid ${themeColors.primaryColor}33`
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: themeColors.primaryColor, fontWeight: '600' }}>
              📍 Informasi Lokasi & Waktu
            </h3>
            
            {/* Location Information */}
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <MapPin size={16} style={{ color: '#6b7280', marginTop: '2px', marginRight: '0.75rem', flexShrink: 0 }} />
              <div>
                <p style={{ margin: 0, fontWeight: '500', color: '#111827' }}>
                  {formattedLocationName}
                </p>
                {hasValidCoordinates && (
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                    Koordinat: {disasterData.coordinates[0].toFixed(4)}, {disasterData.coordinates[1].toFixed(4)}
                  </p>
                )}
              </div>
            </div>
            
            {/* Time Information */}
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Calendar size={16} style={{ color: '#6b7280', marginTop: '2px', marginRight: '0.75rem', flexShrink: 0 }} />
              <div>
                <p style={{ margin: 0, fontWeight: '500', color: '#111827' }}>
                  {formattedIncidentDate}
                </p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                  Pukul {formattedIncidentTime} WIB
                </p>
              </div>
            </div>
          </div>

          {/* Safety Tips Section */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#111827', fontWeight: '600' }}>
              🛡️ Tips Keselamatan
            </h3>
            <div style={{ 
              backgroundColor: '#fef3c7', 
              border: '1px solid #fbbf24', 
              borderRadius: '8px', 
              padding: '1rem' 
            }}>
              <p style={{ margin: 0, color: '#92400e', fontSize: '0.875rem' }}>
                Tetap tenang dan ikuti petunjuk dari pihak berwenang. Jauhi area berbahaya dan cari tempat yang aman.
              </p>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div style={{ 
            backgroundColor: '#fee2e2', 
            border: '1px solid #fca5a5', 
            borderRadius: '8px', 
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#dc2626', fontWeight: '600' }}>
              🚨 Kontak Darurat
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '0.5rem', 
              fontSize: '0.875rem' 
            }}>
              <p style={{ margin: 0 }}>
                <strong>Polisi:</strong> {EMERGENCY_CONTACT_NUMBERS.police}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Pemadam:</strong> {EMERGENCY_CONTACT_NUMBERS.firefighter}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Ambulans:</strong> {EMERGENCY_CONTACT_NUMBERS.ambulance}
              </p>
              <p style={{ margin: 0 }}>
                <strong>SAR:</strong> {EMERGENCY_CONTACT_NUMBERS.searchAndRescue}
              </p>
              <p style={{ margin: 0 }}>
                <strong>BNPB:</strong> {EMERGENCY_CONTACT_NUMBERS.disasterManagement}
              </p>
            </div>
          </div>

          {/* Source Information */}
          <div style={{ 
            borderTop: '1px solid #e5e7eb', 
            paddingTop: '1rem', 
            fontSize: '0.75rem', 
            color: '#6b7280',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0 }}>Sumber data: Sistem monitoring bencana real-time</p>
            <p style={{ margin: '0.25rem 0 0 0' }}>
              Diperbarui: {new Date().toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ 
          padding: '1rem 1.5rem', 
          backgroundColor: '#f9fafb', 
          borderRadius: '0 0 12px 12px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button
            onClick={onModalClose}
            style={{
              width: '100%',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(event) => (event.target as HTMLButtonElement).style.backgroundColor = '#4b5563'}
            onMouseOut={(event) => (event.target as HTMLButtonElement).style.backgroundColor = '#6b7280'}
          >
            Tutup
          </button>        </div>
      </div>
    </div>
  );
}
