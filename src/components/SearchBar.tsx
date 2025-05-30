'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { DisasterType } from '@/types/disaster';

interface SearchBarProps {
  onSearch: (query: string, type: DisasterType) => void;
}

const disasterTypes = [
  { value: 'all' as DisasterType, label: 'Semua Bencana' },
  { value: 'earthquake' as DisasterType, label: 'Gempa Bumi' },
  { value: 'volcano' as DisasterType, label: 'Gunung Berapi' },
  { value: 'flood' as DisasterType, label: 'Banjir' },
  { value: 'tornadoes' as DisasterType, label: 'Angin Puting Beliung' },
];

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<DisasterType>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, selectedType);
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari berdasarkan lokasi..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as DisasterType)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white min-w-[200px]"
            >
              {disasterTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
            <button
            type="submit"
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-sm"
          >
            Cari
          </button>
        </div>
      </form>
    </div>
  );
}
