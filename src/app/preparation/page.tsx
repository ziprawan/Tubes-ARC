'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, Phone, MapPin, Heart, Book, CheckCircle } from 'lucide-react';

const emergencyContacts = [
  { name: 'Polisi', number: '110', description: 'Untuk keamanan dan bantuan umum' },
  { name: 'Pemadam Kebakaran', number: '113', description: 'Untuk kebakaran dan penyelamatan' },
  { name: 'Ambulans', number: '118', description: 'Untuk bantuan medis darurat' },
  { name: 'SAR', number: '115', description: 'Search and Rescue' },
  { name: 'BMKG', number: '021-4246321', description: 'Informasi cuaca dan gempa' },
  { name: 'BNPB', number: '117', description: 'Badan Nasional Penanggulangan Bencana' },
];

const disasterPreparations = [
  {
    type: 'Gempa Bumi',
    icon: '🌋',
    color: 'border-red-500',
    preparations: [
      'Identifikasi tempat aman di rumah (di bawah meja kuat, jauh dari kaca)',
      'Siapkan tas siaga berisi dokumen penting, obat-obatan, dan makanan',
      'Pastikan jalur evakuasi tidak terhalang',
      'Lakukan simulasi gempa dengan keluarga',
      'Matikan gas dan listrik jika memungkinkan saat gempa',
    ],
    emergencySteps: [
      'DROP - Jatuhkan diri ke lantai',
      'COVER - Berlindung di bawah meja atau pelindung kepala',
      'HOLD ON - Pegang erat pelindung hingga guncangan berhenti',
      'Jangan berlari keluar saat masih berguncang',
      'Keluar dengan hati-hati setelah guncangan berhenti',
    ],
  },
  {
    type: 'Banjir',
    icon: '🌊',
    color: 'border-blue-500',
    preparations: [
      'Kenali daerah rawan banjir di sekitar rumah',
      'Siapkan perahu karet atau pelampung',
      'Simpan barang berharga di tempat tinggi',
      'Buat jalur evakuasi ke tempat yang lebih tinggi',
      'Siapkan radio bertenaga baterai untuk informasi',
    ],
    emergencySteps: [
      'Pindah ke tempat yang lebih tinggi',
      'Matikan listrik dan gas',
      'Hindari berjalan di air yang mengalir',
      'Gunakan tongkat untuk mengecek kedalaman air',
      'Jangan berkendara melalui jalan yang tergenang',
    ],
  },
  {
    type: 'Gunung Berapi',
    icon: '🌋',
    color: 'border-orange-500',
    preparations: [
      'Pahami zona bahaya gunung berapi terdekat',
      'Siapkan masker untuk melindungi dari abu vulkanik',
      'Simpan air bersih dalam wadah tertutup',
      'Rencanakan rute evakuasi alternatif',
      'Monitor informasi dari PVMBG secara rutin',
    ],
    emergencySteps: [
      'Tutup semua pintu dan jendela',
      'Gunakan masker atau kain basah untuk bernapas',
      'Hindari area rendah yang bisa terisi gas vulkanik',
      'Jangan melihat langsung ke arah letusan',
      'Evakuasi sesuai arahan petugas',
    ],
  },
  {
    type: 'Angin Puting Beliung',
    icon: '🌪️',
    color: 'border-purple-500',
    preparations: [
      'Identifikasi ruangan teraman di rumah (kamar mandi, basement)',
      'Potong pohon yang bisa tumbang ke rumah',
      'Pastikan atap rumah dalam kondisi baik',
      'Siapkan radio darurat dan senter',
      'Amankan barang-barang di luar rumah',
    ],
    emergencySteps: [
      'Masuk ke ruangan paling aman di rumah',
      'Jauhi jendela dan pintu kaca',
      'Jongkok dan lindungi kepala dengan tangan',
      'Jangan keluar rumah hingga badai mereda',
      'Hati-hati dengan kabel listrik yang putus',
    ],
  },
];

export default function PreparationPage() {
  const [selectedDisaster, setSelectedDisaster] = useState(disasterPreparations[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cornsilk to-white">      {/* Hero Section */}
      <div className="bg-secondary text-[#15202b] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-[#15202b] p-4 rounded-full">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Panduan Kesiapsiagaan Bencana
            </h1>
            <p className="text-xl md:text-2xl text-[#15202b] mb-8 max-w-3xl mx-auto">
              Persiapkan diri Anda dan keluarga menghadapi berbagai jenis bencana alam
            </p>
          </div>
        </div>
      </div>      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">        {/* Emergency Contacts */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <Phone className="h-6 w-6 mr-2 text-red-500" />
            Kontak Darurat Penting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-red-800">{contact.name}</h3>
                  <a 
                    href={`tel:${contact.number}`}
                    className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    {contact.number}
                  </a>
                </div>
                <p className="text-sm text-red-700">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>        {/* Disaster Type Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <Book className="h-6 w-6 mr-2 text-blue-500" />
            Panduan Berdasarkan Jenis Bencana
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {disasterPreparations.map((disaster, index) => (
              <button
                key={index}
                onClick={() => setSelectedDisaster(disaster)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedDisaster.type === disaster.type
                    ? `${disaster.color} bg-blue-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{disaster.icon}</div>
                <div className="text-sm font-medium text-gray-800">{disaster.type}</div>
              </button>
            ))}
          </div>

          {/* Selected Disaster Details */}
          <div className={`border-l-4 ${selectedDisaster.color} bg-gray-50 p-6 rounded-lg`}>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <span className="text-2xl mr-2">{selectedDisaster.icon}</span>
              Panduan {selectedDisaster.type}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Preparations */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Persiapan Sebelum Bencana
                </h4>
                <ul className="space-y-3">
                  {selectedDisaster.preparations.map((prep, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{prep}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency Steps */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  Langkah Saat Terjadi Bencana
                </h4>
                <ol className="space-y-3">
                  {selectedDisaster.emergencySteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Evacuation Routes */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <MapPin className="h-6 w-6 mr-2 text-green-500" />
            Rute Evakuasi dan Tempat Aman
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Tips Perencanaan Rute Evakuasi</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  Identifikasi minimal 2 rute alternatif dari rumah
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  Pilih tempat berkumpul yang aman untuk keluarga
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  Pastikan semua anggota keluarga mengetahui rute
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  Praktikkan rute evakuasi secara berkala
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Tempat Aman Umum</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  Sekolah dengan struktur bangunan kuat
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  Masjid atau tempat ibadah yang aman
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  Lapangan terbuka yang luas
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  Pusat kesehatan atau rumah sakit
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Kit */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-pink-500" />
            Tas Siaga Bencana
          </h2>
          <p className="text-gray-600 mb-6">
            Siapkan tas siaga yang berisi kebutuhan dasar untuk 72 jam pertama setelah bencana.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-600">Dokumen Penting</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• KTP dan kartu keluarga</li>
                <li>• Paspor dan visa</li>
                <li>• Surat-surat penting (sertifikat, akta)</li>
                <li>• Kartu asuransi dan kesehatan</li>
                <li>• Foto keluarga untuk identifikasi</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-600">Kebutuhan Dasar</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Air minum (3 liter per orang)</li>
                <li>• Makanan kaleng atau kering</li>
                <li>• Obat-obatan rutin</li>
                <li>• Pakaian ganti</li>
                <li>• Selimut dan sleeping bag</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-600">Peralatan Darurat</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Senter dan baterai cadangan</li>
                <li>• Radio bertenaga baterai</li>
                <li>• Kotak P3K</li>
                <li>• Uang tunai secukupnya</li>
                <li>• Pisau lipat dan tali</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
