# 📚 Penjelasan Konsep Next.js & React untuk Pemula

## 🎯 Konsep Dasar yang Digunakan

### 1. **Client-Side vs Server-Side Components**
- `'use client'` → Komponen berjalan di browser (untuk interaktivitas)
- Tanpa `'use client'` → Komponen berjalan di server (untuk SEO dan performa)

### 2. **React Hooks**
- `useState` → Menyimpan data yang bisa berubah
- `useEffect` → Menjalankan kode saat komponen dimuat/berubah

### 3. **TypeScript Interfaces**
- Mendefinisikan struktur data untuk keamanan tipe

---

## 📁 File-by-File Explanation

## 1️⃣ **src/app/page.tsx** - Halaman Utama

```tsx
'use client';  // 👈 KONSEP: Client Component
```

**Konsep yang Digunakan:**

### a) **Client Component**
```tsx
'use client';
```
- Komponen ini butuh interaktivitas (tombol, form, state)
- Berjalan di browser, bukan di server

### b) **React Hooks - State Management**
```tsx
const [searchResults, setSearchResults] = useState<Disaster[]>([]);
const [isSearching, setIsSearching] = useState(false);
```
- `useState` → Menyimpan data yang bisa berubah
- `searchResults` → Data hasil pencarian
- `isSearching` → Status loading

### c) **useEffect - Side Effects**
```tsx
useEffect(() => {
  const fetchDisasters = async () => {
    // Ambil data dari API
  };
  fetchDisasters();
  
  // Cleanup function
  return () => clearInterval(interval);
}, []); // 👈 Dependency array kosong = hanya run sekali
```
- Menjalankan kode saat komponen pertama kali dimuat
- Interval untuk refresh data setiap 10 menit

### d) **Async/Await Pattern**
```tsx
const handleSearch = async (query: string, type: DisasterType) => {
  try {
    const data = await fetchDisasterData();
    // Process data
  } catch (error) {
    console.error('Search failed:', error);
  }
};
```
- Menangani operasi asynchronous (API calls)
- Error handling dengan try-catch

### e) **Conditional Rendering**
```tsx
{showResults ? (
  <SearchResults />
) : (
  <DefaultView />
)}
```
- Menampilkan komponen berdasarkan kondisi

---

## 2️⃣ **src/components/DisasterCard.tsx** - Kartu Bencana

**Konsep yang Digunakan:**

### a) **Props Interface**
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
- TypeScript interface untuk mendefinisikan struktur props
- Keamanan tipe data

### b) **Component Composition**
```tsx
export default function DisasterCard({ disaster }: DisasterCardProps) {
  // Component logic here
}
```
- Menerima props dari parent component
- Destructuring props langsung di parameter

### c) **Utility Functions**
```tsx
const getDisasterTypeLabel = (type: string) => {
  switch (type) {
    case 'earthquake': return 'Gempa Bumi';
    case 'volcano': return 'Gunung Berapi';
    // ...
  }
};
```
- Pure functions untuk transformasi data
- Switch statement untuk mapping

### d) **State untuk Modal**
```tsx
const [isModalOpen, setIsModalOpen] = useState(false);
```
- Local state untuk mengontrol modal popup

### e) **Event Handlers**
```tsx
<button onClick={() => setIsModalOpen(true)}>
  Lihat Detail
</button>
```
- Inline arrow function untuk event handling

### f) **Dynamic Styling**
```tsx
const theme = getDisasterTheme(disaster.type);
// ...
<div className={`bg-gradient-to-br ${theme.gradient}`}>
```
- Dynamic CSS classes berdasarkan data

---

## 3️⃣ **src/components/DisasterDetailModal2.tsx** - Modal Detail

**Konsep yang Digunakan:**

### a) **Portal Pattern**
```tsx
// Digunakan di DisasterCard.tsx
<Portal>
  <DisasterDetailModal />
</Portal>
```
- Render modal di luar DOM hierarchy normal
- Menghindari masalah z-index dan positioning

### b) **Conditional Rendering dengan Early Return**
```tsx
if (!isOpen) return null;
```
- Guard clause untuk performa
- Tidak render jika modal tertutup

### c) **Inline Styles untuk Positioning**
```tsx
style={{
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999
}}
```
- Inline styles untuk memastikan positioning absolute
- Mengatasi masalah CSS conflicts

### d) **Event Propagation**
```tsx
<div onClick={onClose}>  {/* Background overlay */}
  <div onClick={(e) => e.stopPropagation()}>  {/* Modal content */}
    {/* Konten modal */}
  </div>
</div>
```
- `stopPropagation()` mencegah event bubbling
- Click di background menutup modal, tapi click di content tidak

---

## 4️⃣ **src/components/Portal.tsx** - Portal Component

**Konsep yang Digunakan:**

### a) **React Portal**
```tsx
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body);
}
```
- Render children ke DOM node yang berbeda
- Berguna untuk modal, tooltip, dropdown

### b) **React.ReactNode Type**
```tsx
children: React.ReactNode
```
- Type untuk menerima any valid React content
- Bisa berupa JSX, string, number, array, dll

---

## 5️⃣ **src/components/SearchBar.tsx** - Form Pencarian

**Konsep yang Digunakan:**

### a) **Controlled Components**
```tsx
const [query, setQuery] = useState('');
const [selectedType, setSelectedType] = useState<DisasterType>('all');

<input 
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```
- React mengontrol nilai input
- Single source of truth untuk form data

### b) **Form Submission**
```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();  // Mencegah page refresh
  onSearch(query, selectedType);
};
```
- Mencegah default browser behavior
- Custom form handling

### c) **Callback Props**
```tsx
interface SearchBarProps {
  onSearch: (query: string, type: DisasterType) => void;
}
```
- Parent-to-child communication via props
- Child-to-parent communication via callback functions

---

## 6️⃣ **src/components/RecentDisasters.tsx** - Daftar Bencana Terbaru

**Konsep yang Digunakan:**

### a) **Data Fetching di Component**
```tsx
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchDisasterData();
      setDisasters(data);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```
- Local data fetching
- Loading states

### b) **Array Mapping**
```tsx
{disasters.map((disaster, index) => (
  <DisasterCard key={index} disaster={disaster} />
))}
```
- Render list dari array
- Key prop untuk React reconciliation

### c) **Loading States**
```tsx
{loading ? (
  <DisasterCardSkeleton />
) : (
  <DisasterCard />
)}
```
- Conditional rendering berdasarkan loading state
- Skeleton loading untuk UX yang baik

---

## 7️⃣ **src/utils/locationFormatter.ts** - Utility Functions

**Konsep yang Digunakan:**

### a) **Pure Functions**
```tsx
export function formatLocationName(locationName: string): string {
  // Transform data tanpa side effects
  return formattedName;
}
```
- Tidak mengubah input parameter
- Predictable output untuk same input
- Easy to test

### b) **String Manipulation**
```tsx
const parts = locationName.split('-');
const formatted = parts
  .map(part => toTitleCase(part.trim()))
  .join(', ');
```
- Method chaining
- Functional programming approach

---

## 🔧 **Konsep Lanjutan yang Digunakan**

### 1. **Component Composition Pattern**
```tsx
// Parent
<DisasterCard disaster={data}>
  <Modal>
    <ModalContent />
  </Modal>
</DisasterCard>
```

### 2. **Render Props Pattern**
```tsx
// Di Portal.tsx
{typeof window !== 'undefined' && createPortal(children, document.body)}
```

### 3. **Custom Hooks (bisa ditambah nanti)**
```tsx
function useDisasterData() {
  const [data, setData] = useState([]);
  // Logic here
  return { data, loading, error };
}
```

### 4. **Error Boundaries (untuk production)**
```tsx
class ErrorBoundary extends React.Component {
  // Catch JavaScript errors
}
```

---

## 📋 **Best Practices yang Diterapkan**

1. **TypeScript untuk Type Safety**
2. **Separation of Concerns** (UI, Logic, Data terpisah)
3. **Reusable Components**
4. **Error Handling**
5. **Loading States**
6. **Responsive Design**
7. **Accessibility** (ARIA labels, semantic HTML)
8. **Performance** (lazy loading, memoization bisa ditambah)

---

## 🚀 **Next Steps untuk Belajar**

1. **Server Components** - Untuk performa yang lebih baik
2. **Custom Hooks** - Untuk reusability logic
3. **Context API** - Untuk global state management
4. **React Query/SWR** - Untuk data fetching yang lebih baik
5. **Error Boundaries** - Untuk error handling yang robust
6. **Testing** - Unit tests dan integration tests

---

## 💡 **Tips untuk Pemula**

1. **Mulai dengan useState dan useEffect**
2. **Pahami props flow (parent → child)**
3. **Pelajari event handling**
4. **Praktik conditional rendering**
5. **Eksperimen dengan styling**
6. **Baca dokumentasi React dan Next.js**

Semoga penjelasan ini membantu! 🎉
