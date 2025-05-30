# 🎯 Penjelasan Detail Per File TSX

## **1. src/app/page.tsx** - Halaman Utama (Main Page)

```tsx
'use client';
```
**🔥 KONSEP: Client Component**
- Karena halaman ini punya interaktivitas (search, button clicks)
- Butuh access ke browser APIs (localStorage, window, dll)

```tsx
const [searchResults, setSearchResults] = useState<Disaster[]>([]);
const [isSearching, setIsSearching] = useState(false);
const [showResults, setShowResults] = useState(false);
```
**🔥 KONSEP: Multiple State Variables**
- `searchResults`: Array hasil pencarian
- `isSearching`: Boolean untuk loading state
- `showResults`: Boolean untuk toggle tampilan

```tsx
useEffect(() => {
  // Fetch data saat component mount
  const fetchDisasters = async () => { /* ... */ };
  fetchDisasters();
  
  // Cleanup function - PENTING!
  const interval = setInterval(fetchDisasters, 10 * 60 * 1000);
  return () => clearInterval(interval);
}, []); // Empty dependency array = run sekali saja
```
**🔥 KONSEP: useEffect dengan Cleanup**
- Dependency array `[]` = hanya run 1x saat mount
- `clearInterval` di cleanup mencegah memory leak
- Auto-refresh data setiap 10 menit

```tsx
const handleSearch = async (query: string, type: DisasterType) => {
  setIsSearching(true);  // Set loading true
  try {
    const data = await fetchDisasterData();
    setSearchResults(allDisasters);
  } catch (error) {
    console.error('Search failed:', error);
  } finally {
    setIsSearching(false);  // Loading false di finally block
  }
};
```
**🔥 KONSEP: Async Function dengan Error Handling**
- `finally` block memastikan loading state direset
- Try-catch untuk handle error gracefully

---

## **2. src/components/DisasterCard.tsx** - Card Component

```tsx
interface DisasterCardProps {
  disaster: {
    type: string;
    coordinates: [number, number];
    location_name: string;
    incident_time: number;
    source: string;
  };
}
```
**🔥 KONSEP: TypeScript Interface**
- Mendefinisikan "contract" untuk props
- Auto-completion di IDE
- Runtime error prevention

```tsx
const getDisasterTypeLabel = (type: string) => {
  switch (type) {
    case 'earthquake': return 'Gempa Bumi';
    case 'volcano': return 'Gunung Berapi';
    default: return type;
  }
};
```
**🔥 KONSEP: Pure Function**
- Input yang sama = output yang sama
- Tidak ada side effects
- Easy to test dan debug

```tsx
const theme = getDisasterTheme(disaster.type);
// Lalu digunakan di JSX:
<div className={`bg-gradient-to-br ${theme.gradient}`}>
```
**🔥 KONSEP: Dynamic Styling**
- CSS classes ditentukan berdasarkan data
- Template literals untuk string interpolation

```tsx
<button onClick={() => setIsModalOpen(true)}>
  Lihat Detail
</button>
```
**🔥 KONSEP: Event Handler dengan Arrow Function**
- Arrow function di onClick untuk set state
- Closure concept - function bisa akses variabel luar

---

## **3. src/components/DisasterDetailModal2.tsx** - Modal Component

```tsx
if (!isOpen) return null;
```
**🔥 KONSEP: Early Return**
- Guard clause untuk performance
- Tidak render DOM jika modal tertutup

```tsx
<div 
  onClick={onClose}
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999
  }}
>
  <div onClick={(e) => e.stopPropagation()}>
    {/* Modal content */}
  </div>
</div>
```
**🔥 KONSEP: Event Delegation & stopPropagation**
- Outer div (backdrop) → close modal saat diklik
- Inner div → `e.stopPropagation()` mencegah event bubbling
- Inline styles untuk memastikan positioning

```tsx
const timeAgo = formatDistanceToNow(new Date(disaster.incident_time), {
  addSuffix: true,
  locale: id,
});
```
**🔥 KONSEP: External Library Integration**
- `date-fns` untuk format tanggal
- Locale Indonesia untuk bahasa

---

## **4. src/components/Portal.tsx** - Portal Component

```tsx
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body);
}
```
**🔥 KONSEP: React Portal**
- Render component di DOM node yang berbeda
- `document.body` sebagai target
- Menghindari z-index conflicts

**🔥 KONSEP: React.ReactNode Type**
- Type yang paling fleksibel untuk children
- Bisa terima JSX, string, number, array, fragment

---

## **5. src/components/SearchBar.tsx** - Controlled Form

```tsx
const [query, setQuery] = useState('');
const [selectedType, setSelectedType] = useState<DisasterType>('all');
```
**🔥 KONSEP: Controlled Components**
- React state sebagai "single source of truth"
- Input value selalu sync dengan state

```tsx
<input 
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Cari lokasi bencana..."
/>
```
**🔥 KONSEP: Two-Way Data Binding**
- Value dari state → input
- onChange dari input → update state
- `e.target.value` untuk ambil input value

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSearch(query, selectedType);
};
```
**🔥 KONSEP: Form Submission**
- `e.preventDefault()` mencegah page refresh
- Call parent function via props

---

## **6. src/components/RecentDisasters.tsx** - Data Fetching Component

```tsx
const [disasters, setDisasters] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```
**🔥 KONSEP: Multiple Related States**
- Data state untuk menyimpan hasil
- Loading state untuk UI feedback
- Error state untuk error handling

```tsx
const fetchDisasters = async () => {
  try {
    setLoading(true);
    setError(null);  // Reset error
    const recentDisasters = await getRecentDisasters(8);
    setDisasters(recentDisasters);
  } catch (err) {
    setError('Gagal memuat data bencana terbaru');
  } finally {
    setLoading(false);  // Always set loading false
  }
};
```
**🔥 KONSEP: Async State Management**
- Set loading true sebelum fetch
- Reset error state di awal
- Finally block untuk cleanup

```tsx
useEffect(() => {
  fetchDisasters();
  const interval = setInterval(fetchDisasters, 5 * 60 * 1000);
  return () => clearInterval(interval);
}, []);
```
**🔥 KONSEP: Auto-refresh dengan Interval**
- Initial fetch saat mount
- Interval untuk periodic updates
- Cleanup interval saat unmount

```tsx
if (loading) {
  return <LoadingSkeleton />;
}

if (error) {
  return <ErrorMessage />;
}

return <ActualContent />;
```
**🔥 KONSEP: Conditional Rendering dengan Early Returns**
- Guard clauses untuk different states
- Cleaner code structure

---

## **7. src/utils/locationFormatter.ts** - Utility Functions

```tsx
export function formatLocationName(locationName: string): string {
  if (!locationName) return '';
  
  const parts = locationName.split('-');
  return parts
    .map(part => toTitleCase(part.trim()))
    .join(', ');
}
```
**🔥 KONSEP: Pure Function dengan Functional Programming**
- No side effects
- Method chaining (`split` → `map` → `join`)
- Input validation dengan early return

```tsx
function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}
```
**🔥 KONSEP: Regular Expression & String Manipulation**
- `\b\w` matches word boundaries
- Arrow function dalam replace
- Functional transformation

---

## **8. Konsep-Konsep Advanced yang Digunakan**

### **A. Component Composition**
```tsx
// Parent component
<DisasterCard disaster={data}>
  <Portal>
    <Modal />
  </Portal>
</DisasterCard>
```

### **B. Props Drilling vs Callback Pattern**
```tsx
// Parent → Child communication
<SearchBar onSearch={handleSearch} />

// Child → Parent communication
const SearchBar = ({ onSearch }) => {
  const handleSubmit = () => onSearch(query, type);
};
```

### **C. Error Boundaries (bisa ditambah)**
```tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.log('Component error:', error, errorInfo);
  }
}
```

### **D. Custom Hooks (bisa dibuat)**
```tsx
function useDisasterData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // fetch logic
  }, []);
  
  return { data, loading, refetch };
}
```

---

## **🚀 Tips untuk Memahami Kode**

1. **Baca dari atas ke bawah**: Import → Interface → State → useEffect → Functions → JSX
2. **Pahami data flow**: Props masuk → State berubah → Re-render → Event → State berubah lagi
3. **Debug dengan console.log**: Tambahkan di functions untuk lihat data
4. **Eksplorasi dependencies**: Buka package.json untuk lihat library yang dipakai
5. **Baca dokumentasi**: React docs, Next.js docs, library docs

## **🎯 Langkah Belajar Selanjutnya**

1. **Coba modifikasi state** - Tambah state baru dan lihat perubahannya
2. **Buat component baru** - Copy pattern yang ada
3. **Experiment dengan styling** - Ubah CSS classes
4. **Tambah console.log** - Debug data flow
5. **Baca React docs** - Pahami hooks lebih dalam

Semoga penjelasan ini membantu kamu memahami konsep-konsep Next.js dan React! 🎉
