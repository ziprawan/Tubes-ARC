# 🎓 React & Next.js untuk Pemula - Konsep Dasar dengan Contoh

## 📚 **Konsep #1: useState - Managing Component State**

### Apa itu useState?
useState adalah React Hook untuk menyimpan data yang bisa berubah dalam component.

### Contoh Sederhana:
```tsx
import { useState } from 'react';

function Counter() {
  // [nilai_saat_ini, function_untuk_ubah_nilai] = useState(nilai_awal)
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Nilai: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Tambah
      </button>
    </div>
  );
}
```

### Di Proyek Kita:
```tsx
// Di SearchBar.tsx
const [query, setQuery] = useState('');  // Input pencarian
const [selectedType, setSelectedType] = useState('all');  // Filter type

// Di DisasterCard.tsx  
const [isModalOpen, setIsModalOpen] = useState(false);  // Status modal
```

---

## 📚 **Konsep #2: useEffect - Side Effects**

### Apa itu useEffect?
useEffect menjalankan kode saat component dimuat, berubah, atau di-unmount.

### Contoh Sederhana:
```tsx
import { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  
  // Jalankan saat component pertama kali dimuat
  useEffect(() => {
    fetchUserData().then(setUser);
  }, []);  // Array kosong = hanya run sekali
  
  return <div>{user?.name}</div>;
}
```

### Di Proyek Kita:
```tsx
// Di page.tsx
useEffect(() => {
  const fetchDisasters = async () => {
    const data = await fetchDisasterData();
    setAllDisasters(data);
  };
  
  fetchDisasters();
  
  // Auto-refresh setiap 10 menit
  const interval = setInterval(fetchDisasters, 10 * 60 * 1000);
  
  // Cleanup - PENTING untuk mencegah memory leak!
  return () => clearInterval(interval);
}, []); // [] = hanya run sekali saat mount
```

---

## 📚 **Konsep #3: Props - Communication Between Components**

### Apa itu Props?
Props adalah cara untuk mengirim data dari parent component ke child component.

### Contoh Sederhana:
```tsx
// Parent Component
function App() {
  const userName = "John Doe";
  
  return (
    <UserCard name={userName} age={25} />
  );
}

// Child Component
function UserCard({ name, age }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Umur: {age}</p>
    </div>
  );
}
```

### Di Proyek Kita:
```tsx
// Parent: page.tsx
<SearchBar onSearch={handleSearch} />
<DisasterCard disaster={disasterData} />

// Child: SearchBar.tsx
function SearchBar({ onSearch }) {
  const handleSubmit = () => {
    onSearch(query, selectedType);  // Kirim data ke parent
  };
}

// Child: DisasterCard.tsx  
function DisasterCard({ disaster }) {
  return (
    <div>
      <h3>{disaster.type}</h3>
      <p>{disaster.location_name}</p>
    </div>
  );
}
```

---

## 📚 **Konsep #4: Event Handling**

### Apa itu Event Handling?
Menangani user interactions seperti click, type, submit, dll.

### Contoh Sederhana:
```tsx
function Button() {
  const handleClick = () => {
    alert('Button diklik!');
  };
  
  const handleInputChange = (e) => {
    console.log('User mengetik:', e.target.value);
  };
  
  return (
    <div>
      <button onClick={handleClick}>Klik Saya</button>
      <input onChange={handleInputChange} />
    </div>
  );
}
```

### Di Proyek Kita:
```tsx
// Form submission
const handleSubmit = (e) => {
  e.preventDefault();  // Mencegah page refresh
  onSearch(query, selectedType);
};

// Modal control
<button onClick={() => setIsModalOpen(true)}>
  Lihat Detail
</button>

// Close modal saat click background
<div onClick={onClose}>  {/* Background */}
  <div onClick={(e) => e.stopPropagation()}>  {/* Content */}
    {/* Modal content tidak close saat diklik */}
  </div>
</div>
```

---

## 📚 **Konsep #5: Conditional Rendering**

### Apa itu Conditional Rendering?
Menampilkan component yang berbeda berdasarkan kondisi tertentu.

### Contoh Sederhana:
```tsx
function WelcomeMessage({ isLoggedIn, userName }) {
  // Method 1: if-else
  if (isLoggedIn) {
    return <h1>Selamat datang, {userName}!</h1>;
  } else {
    return <h1>Silakan login terlebih dahulu</h1>;
  }
  
  // Method 2: ternary operator
  return (
    <div>
      {isLoggedIn ? (
        <h1>Selamat datang, {userName}!</h1>
      ) : (
        <h1>Silakan login</h1>
      )}
    </div>
  );
  
  // Method 3: logical AND
  return (
    <div>
      {isLoggedIn && <h1>Selamat datang, {userName}!</h1>}
      {!isLoggedIn && <h1>Silakan login</h1>}
    </div>
  );
}
```

### Di Proyek Kita:
```tsx
// Loading state
{loading ? (
  <DisasterCardSkeleton />
) : (
  <DisasterCard disaster={disaster} />
)}

// Search results
{showResults ? (
  <SearchResults results={searchResults} />
) : (
  <RecentDisasters />
)}

// Modal visibility
{isModalOpen && (
  <DisasterDetailModal 
    disaster={disaster} 
    onClose={() => setIsModalOpen(false)} 
  />
)}
```

---

## 📚 **Konsep #6: Array Mapping (Rendering Lists)**

### Apa itu Array Mapping?
Mengubah array data menjadi array components untuk ditampilkan.

### Contoh Sederhana:
```tsx
function TodoList() {
  const todos = [
    { id: 1, text: 'Belajar React', completed: false },
    { id: 2, text: 'Bikin project', completed: true },
    { id: 3, text: 'Deploy app', completed: false }
  ];
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none' 
          }}>
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
```

### Di Proyek Kita:
```tsx
// Render disaster cards
{disasters.map((disaster, index) => (
  <DisasterCard 
    key={index}  // PENTING: setiap item butuh unique key
    disaster={disaster} 
  />
))}

// Render search results
{searchResults.map((result, index) => (
  <DisasterCard key={`search-${index}`} disaster={result} />
))}
```

---

## 📚 **Konsep #7: Async/Await - API Calls**

### Apa itu Async/Await?
Cara modern untuk handle operasi asynchronous seperti API calls.

### Contoh Sederhana:
```tsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/users');
        const data = await response.json();
        
        setUsers(data);
      } catch (err) {
        setError('Gagal memuat data users');
        console.error(err);
      } finally {
        setLoading(false);  // Selalu set loading false
      }
    };
    
    fetchUsers();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

### Di Proyek Kita:
```tsx
// Fetch disaster data
const handleSearch = async (query: string, type: DisasterType) => {
  setIsSearching(true);
  try {
    const data = await fetchDisasterData();
    let allDisasters = [...data.data.earthquakes, ...data.data.volcanoes];
    
    if (type !== 'all') {
      allDisasters = allDisasters.filter(d => d.type === type);
    }
    
    if (query.trim()) {
      allDisasters = allDisasters.filter(d => 
        d.location_name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setSearchResults(allDisasters);
  } catch (error) {
    console.error('Search failed:', error);
    setSearchResults([]);
  } finally {
    setIsSearching(false);
  }
};
```

---

## 📚 **Konsep #8: TypeScript Interfaces**

### Apa itu TypeScript Interface?
Mendefinisikan struktur/bentuk data untuk keamanan tipe.

### Contoh Sederhana:
```tsx
// Definisi interface
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Penggunaan interface
function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <span>{user.isActive ? 'Aktif' : 'Tidak Aktif'}</span>
    </div>
  );
}

// Array dengan interface
const users: User[] = [
  { id: 1, name: 'John', email: 'john@email.com', isActive: true },
  { id: 2, name: 'Jane', email: 'jane@email.com', isActive: false }
];
```

### Di Proyek Kita:
```tsx
// Interface untuk disaster data
interface DisasterCardProps {
  disaster: {
    type: string;
    coordinates: [number, number];
    location_name: string;
    incident_time: number;
    source: string;
  };
}

// Interface untuk search callback
interface SearchBarProps {
  onSearch: (query: string, type: DisasterType) => void;
}

// Type untuk disaster types
type DisasterType = 'all' | 'earthquake' | 'volcano' | 'flood' | 'tornadoes';
```

---

## 🎯 **Latihan untuk Pemula**

### 1. **Counter App** (useState practice)
```tsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### 2. **Todo App** (useState + array mapping)
```tsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };
  
  return (
    <div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 3. **API Fetcher** (useEffect + async/await)
```tsx
function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data.slice(0, 5)); // Ambil 5 posts pertama
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);
  
  if (loading) return <div>Loading posts...</div>;
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🚀 **Tips Belajar React/Next.js**

1. **Mulai Small**: Buat component sederhana dulu
2. **Practice useState**: Counter, toggle, form inputs
3. **Practice useEffect**: API calls, timers, cleanup
4. **Debug dengan console.log**: Lihat bagaimana data mengalir
5. **Baca Error Messages**: React error messages cukup informatif
6. **Experiment**: Copy-paste code dan modifikasi
7. **Baca Docs**: React docs sangat bagus untuk pemula

## 🎉 **Selamat Belajar!**

Konsep-konsep ini adalah fondasi React/Next.js. Setelah paham ini, kamu bisa lanjut ke:
- Custom Hooks
- Context API
- Server Components (Next.js 13+)
- Performance optimization
- Testing

Happy coding! 🚀
