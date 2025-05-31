'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIconPlaceholder } from 'lucide-react';

interface ImageGalleryProps {
  mediaUrls: string[]; 
  reportTitle?: string; 
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ mediaUrls, reportTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const validmediaUrls = mediaUrls?.filter(url => 
    typeof url === 'string' && url.match(/\.(jpeg|jpg|gif|png|webp)$/i)
  ) || [];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === 'Escape') {
        closeModal();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, validmediaUrls.length]); 

  if (!validmediaUrls || validmediaUrls.length === 0) {
    return (
        <div className="py-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">Tidak ada dokumentasi gambar yang valid.</p>
        </div>
    );
  }

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? validmediaUrls.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === validmediaUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {/* Thumbnails */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-2">
        {validmediaUrls.map((url, index) => (
          <button
            key={url || index}
            onClick={() => openModal(index)}
            className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 group"
            aria-label={`Lihat gambar ${index + 1}`}
          >
            <img
              src={url}
              alt={`${reportTitle || 'Dokumentasi'} ${index + 1}`}
              className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-image.png';}} 
            />
          </button>
        ))}
      </div>

      {/* Modal Lightbox */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-blue bg-opacity-80 backdrop-blur-md flex items-center justify-center z-[110] p-4 animate-fade-in" // <-- backdrop-blur-md sudah ada di sini
          onClick={closeModal}
        >
          <div 
            className="relative bg-white dark:bg-gray-900 p-4 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] animate-slide-up flex flex-col"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                    {reportTitle ? `Dokumentasi: ${reportTitle}` : 'Galeri Gambar'} ({currentIndex + 1} dari {validmediaUrls.length})
                </h3>
                <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Tutup galeri"
                >
                    <X size={20} />
                </button>
            </div>
            
            {/* Konten Gambar Besar */}
            <div className="relative select-none">
              <img
                src={validmediaUrls[currentIndex]}
                alt={`${reportTitle || 'Dokumentasi'} ${currentIndex + 1} - tampilan besar`}
                className="max-w-full max-h-[70vh] object-contain rounded mx-auto"
                onError={(e) => { 
                    (e.target as HTMLImageElement).style.display = 'none'; 
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if(parent){
                        const errorDiv = document.createElement('div');
                        errorDiv.className = "w-full h-[200px] sm:h-[300px] md:h-[400px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded";
                        errorDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><p class="mt-2 text-sm">Gagal memuat gambar</p>`;
                        parent.appendChild(errorDiv);
                    }
                }}
              />
              {/* Navigasi (jika lebih dari 1 gambar) */}
              {validmediaUrls.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                    className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white transition-opacity"
                    aria-label="Gambar sebelumnya"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); goToNext(); }}
                    className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white transition-opacity"
                    aria-label="Gambar berikutnya"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;