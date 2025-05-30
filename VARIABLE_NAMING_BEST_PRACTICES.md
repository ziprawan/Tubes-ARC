# 📋 Best Practices Penamaan Variabel Profesional

## 🎯 **Prinsip Dasar Penamaan yang Baik**

### 1. **Clarity over Brevity** (Kejelasan > Singkatan)
```tsx
// ❌ BAD
const d = new Date();
const u = users.filter(x => x.active);
const calc = (a, b) => a * b * 0.1;

// ✅ GOOD
const currentDate = new Date();
const activeUsers = users.filter(user => user.isActive);
const calculateDiscountPrice = (price, quantity) => price * quantity * DISCOUNT_RATE;
```

### 2. **Use Intention-Revealing Names** (Nama yang Mengungkap Maksud)
```tsx
// ❌ BAD
const list = disasters.filter(d => d.time > 86400000);
const flag = user.role === 'admin';

// ✅ GOOD
const recentDisasters = disasters.filter(disaster => disaster.timestamp > ONE_DAY_IN_MS);
const isUserAdmin = user.role === 'admin';
```

### 3. **Avoid Mental Mapping** (Hindari Pemetaan Mental)
```tsx
// ❌ BAD
const data = response.data;
const temp = data.earthquakes;
const result = temp.map(item => ({ ...item, processed: true }));

// ✅ GOOD
const apiResponse = response.data;
const earthquakeData = apiResponse.earthquakes;
const processedEarthquakes = earthquakeData.map(earthquake => ({ 
  ...earthquake, 
  isProcessed: true 
}));
```

---

## 📁 **Konvensi Penamaan per Kategori**

### **A. Variables & Functions**
```tsx
// Variabel - camelCase
const userName = 'John Doe';
const totalDisasterCount = 150;
const isModalOpen = false;
const userPreferences = {};

// Functions - camelCase dengan kata kerja
const calculateTotalDamage = () => {};
const fetchDisasterData = async () => {};
const validateUserInput = (input) => {};
const formatLocationName = (location) => {};

// Boolean - gunakan is/has/can/should
const isLoading = false;
const hasPermission = true;
const canEdit = false;
const shouldRefresh = true;
```

### **B. Constants**
```tsx
// Global constants - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 10;
const DISASTER_TYPES = {
  EARTHQUAKE: 'earthquake',
  VOLCANO: 'volcano',
  FLOOD: 'flood',
  TORNADO: 'tornadoes'
} as const;

// Local constants - camelCase atau UPPER_SNAKE_CASE
const defaultModalConfig = { width: 600, height: 400 };
const ANIMATION_DURATION = 300;
```

### **C. Interfaces & Types**
```tsx
// Interfaces - PascalCase dengan deskripsi yang jelas
interface DisasterApiResponse {
  success: boolean;
  data: DisasterData;
  metadata: ResponseMetadata;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notificationsEnabled: boolean;
}

// Props interfaces - PascalCase + Props suffix
interface DisasterCardProps {
  disaster: DisasterData;
  onSelect?: (disaster: DisasterData) => void;
  isSelected?: boolean;
}

// Types - PascalCase
type DisasterType = 'earthquake' | 'volcano' | 'flood' | 'tornadoes';
type LoadingState = 'idle' | 'loading' | 'success' | 'error';
```

### **D. Components & Files**
```tsx
// Components - PascalCase dengan nama yang deskriptif
DisasterCard.tsx          // Bukan Card.tsx
DisasterDetailModal.tsx   // Bukan Modal.tsx
UserPreferencesForm.tsx   // Bukan Form.tsx
NavigationSidebar.tsx     // Bukan Sidebar.tsx

// Utility files - camelCase
locationFormatter.ts      // Bukan utils.ts
dateHelpers.ts           // Bukan helpers.ts
apiClient.ts             // Bukan api.ts
validationRules.ts       // Bukan validation.ts
```

### **E. CSS Classes (jika menggunakan custom CSS)**
```css
/* BEM Convention atau kebab-case */
.disaster-card {}
.disaster-card__header {}
.disaster-card__header--highlighted {}

/* Atau dengan prefix */
.ds-card {}           /* disaster-system-card */
.ds-modal {}          /* disaster-system-modal */
.ds-button--primary {}
```

---

## 🔧 **Pola Penamaan Khusus**

### **1. Event Handlers**
```tsx
// Pattern: handle + Action + Target (opsional)
const handleSubmit = () => {};
const handleUserLogin = () => {};
const handleModalClose = () => {};
const handleSearchInputChange = () => {};
const handleDisasterCardClick = () => {};

// Untuk spesifik events
const handleKeyPress = (e: KeyboardEvent) => {};
const handleMouseEnter = () => {};
const handleFormSubmit = (e: FormEvent) => {};
```

### **2. API Functions**
```tsx
// Pattern: verb + Resource + Action (opsional)
const fetchDisasters = async () => {};
const createDisasterReport = async (data: ReportData) => {};
const updateUserPreferences = async (userId: string, prefs: UserPrefs) => {};
const deleteUserAccount = async (userId: string) => {};

// Dengan spesifik operations
const fetchRecentDisasters = async (limit: number) => {};
const searchDisastersByLocation = async (location: string) => {};
```

### **3. Utility Functions**
```tsx
// Pattern: action + Target + Context (opsional)
const formatCurrency = (amount: number) => {};
const parseApiResponse = (response: any) => {};
const validateEmailAddress = (email: string) => {};
const calculateDaysBetween = (startDate: Date, endDate: Date) => {};

// Transformers
const transformUserData = (rawUser: any) => {};
const mapDisasterToCard = (disaster: DisasterData) => {};
```

### **4. Custom Hooks**
```tsx
// Pattern: use + Feature + Context (opsional)
const useDisasterData = () => {};
const useLocalStorage = (key: string) => {};
const useApiCall = (endpoint: string) => {};
const useDebounce = (value: any, delay: number) => {};
const useModal = () => {};
```

---

## 📋 **Checklist Penamaan yang Baik**

### ✅ **DO (Lakukan)**
1. **Gunakan nama yang dapat diucapkan**
   ```tsx
   const userRegistrationDate = new Date(); // ✅
   const usrRegDt = new Date(); // ❌
   ```

2. **Gunakan nama yang dapat dicari**
   ```tsx
   const MAX_USERS_PER_PAGE = 50; // ✅
   const 50; // ❌ (magic number)
   ```

3. **Konsisten dalam konvensi**
   ```tsx
   const getUserData = () => {};
   const getUserPreferences = () => {};
   const getUserSettings = () => {}; // ✅ Konsisten
   ```

4. **Hindari singkatan yang ambigu**
   ```tsx
   const userManager = new UserManager(); // ✅
   const usrMgr = new UserManager(); // ❌
   ```

5. **Gunakan domain vocabulary**
   ```tsx
   const earthquake = data.earthquake; // ✅
   const seismicEvent = data.earthquake; // ❌ (terlalu teknis)
   ```

### ❌ **DON'T (Jangan)**
1. **Jangan gunakan Hungarian notation**
   ```tsx
   const strUserName = 'John'; // ❌
   const userName = 'John'; // ✅
   ```

2. **Jangan gunakan noise words**
   ```tsx
   const userInfo = {}; // ❌ (Info tidak menambah makna)
   const userData = {}; // ❌ (Data redundan)
   const user = {}; // ✅
   ```

3. **Jangan gunakan angka dalam nama**
   ```tsx
   const user1 = {}; // ❌
   const user2 = {}; // ❌
   const primaryUser = {}; // ✅
   const secondaryUser = {}; // ✅
   ```

## 🎯 **Contoh Refactoring Real-World**

### **Sebelum Refactoring:**
```tsx
// ❌ BAD NAMING
interface Props {
  d: any;
  cb: () => void;
  flag: boolean;
}

const comp = ({ d, cb, flag }: Props) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  
  const handle = () => {
    cb();
    setOpen(!open);
  };
  
  const get = async () => {
    const res = await fetch('/api');
    const json = await res.json();
    setData(json);
  };
  
  return (
    <div className={flag ? 'active' : ''}>
      <h3>{d.name}</h3>
      <button onClick={handle}>Click</button>
    </div>
  );
};
```

### **Setelah Refactoring:**
```tsx
// ✅ GOOD NAMING
interface DisasterCardProps {
  disaster: DisasterData;
  onSelect: () => void;
  isHighlighted: boolean;
}

const DisasterCard = ({ 
  disaster, 
  onSelect, 
  isHighlighted 
}: DisasterCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disasterDetails, setDisasterDetails] = useState<DisasterDetails | null>(null);
  
  const handleCardSelect = () => {
    onSelect();
    setIsModalOpen(!isModalOpen);
  };
  
  const fetchDisasterDetails = async () => {
    const response = await fetch(`/api/disasters/${disaster.id}`);
    const detailsData = await response.json();
    setDisasterDetails(detailsData);
  };
  
  return (
    <div className={isHighlighted ? 'disaster-card--highlighted' : 'disaster-card'}>
      <h3>{disaster.locationName}</h3>
      <button onClick={handleCardSelect}>View Details</button>
    </div>
  );
};
```

## 🚀 **Tips Pro untuk Tim Development**

### **1. Buat Glossary untuk Proyek**
```tsx
// project-glossary.ts
export const PROJECT_TERMS = {
  // Domain terms
  DISASTER: 'Natural or man-made catastrophic events',
  INCIDENT: 'Specific occurrence of a disaster',
  ALERT: 'Warning notification about potential disaster',
  
  // Technical terms
  API_RESPONSE: 'Data returned from external API calls',
  USER_SESSION: 'Active user authentication state',
  CACHE_ENTRY: 'Stored data for performance optimization'
} as const;
```

### **2. Code Review Checklist untuk Naming**
- [ ] Apakah nama variabel menjelaskan maksudnya?
- [ ] Apakah bisa dipahami tanpa context?
- [ ] Apakah konsisten dengan konvensi tim?
- [ ] Apakah menghindari singkatan yang ambigu?
- [ ] Apakah menggunakan domain vocabulary yang tepat?

### **3. Linting Rules untuk Naming**
```json
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE"]
      },
      {
        "selector": "function",
        "format": ["camelCase"]
      },
      {
        "selector": "interface",
        "format": ["PascalCase"]
      }
    ]
  }
}
```

---

## 🎉 **Hasil yang Diharapkan**

Dengan menerapkan best practices ini:
- **Code lebih mudah dibaca** dan dipahami developer lain
- **Maintenance lebih mudah** karena intent jelas
- **Debugging lebih cepat** karena nama menjelaskan fungsi
- **Onboarding developer baru** lebih smooth
- **Code review** lebih fokus ke logic, bukan pemahaman nama

## 📚 **Resources Lanjutan**

1. **Clean Code by Robert C. Martin** - Chapter 2: Meaningful Names
2. **ESLint Naming Convention Rules**
3. **TypeScript Handbook - Code Conventions**
4. **Airbnb JavaScript Style Guide**
5. **Google TypeScript Style Guide**

Happy coding dengan nama variabel yang professional! 🚀
