"use client";

import { DisasterType } from "@/types/disaster";
import { Camera, FileText, MapPin, PlusCircle, Send } from "lucide-react";
import { useState } from "react";

export default function ReportForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    disaster_category: "flood" as DisasterType,
    location: "",
    description: "",
    author: "",
  });
  const [, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disasterTypes = [
    { value: "earthquake", label: "Gempa Bumi" },
    { value: "volcano", label: "Gunung Berapi" },
    { value: "flood", label: "Banjir" },
    { value: "tornadoes", label: "Angin Puting Beliung" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      title: "",
      disaster_category: "flood",
      location: "",
      description: "",
      author: "",
    });
    setFiles(null);
    setIsSubmitting(false);
    setIsOpen(false);

    // Show success message (you can implement toast/notification here)
    alert("Laporan berhasil dikirim! Terima kasih telah berkontribusi.");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-accent hover:bg-copper text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
        >
          <PlusCircle className="h-6 w-6" />
          <span className="hidden group-hover:block whitespace-nowrap">Laporkan Bencana</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              Laporkan Bencana
            </h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl">
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">Bantu komunitas dengan melaporkan kondisi bencana di sekitar Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Judul Laporan *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Contoh: Banjir di Perumahan Griya Indah"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>

          {/* Disaster Category */}
          <div>
            <label htmlFor="disaster_category" className="block text-sm font-medium text-gray-700 mb-2">
              Kategori Bencana *
            </label>
            <select
              id="disaster_category"
              name="disaster_category"
              value={formData.disaster_category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            >
              {disasterTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="Contoh: Bekasi, Jawa Barat"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Pelapor *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              placeholder="Nama Anda"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Dampak Kerusakan *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Jelaskan kondisi bencana, dampak kerusakan, dan bantuan yang diperlukan..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
            />
          </div>

          {/* Documentation */}
          <div>
            <label htmlFor="documentation" className="block text-sm font-medium text-gray-700 mb-2">
              Dokumentasi (Foto/Video)
            </label>
            <div className="relative">
              <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="file"
                id="documentation"
                name="documentation"
                multiple
                accept="image/*,video/*"
                onChange={(e) => setFiles(e.target.files)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Upload foto atau video untuk mendukung laporan Anda (opsional)</p>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Kirim Laporan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
