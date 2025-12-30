
import { Pet, Appointment, InventoryItem, Owner, MedicalRecord } from './types';

export const COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#f43f5e',
  light: '#f8fafc',
  dark: '#0f172a',
  glass: 'rgba(255, 255, 255, 0.7)'
};

// --- DATA GENERATORS ---

const firstNames = ['Mehmet', 'Ayşe', 'Ali', 'Fatma', 'Can', 'Zeynep', 'Burak', 'Elif', 'Mert', 'Selin', 'Deniz', 'Seda', 'Onur', 'Gizem', 'Murat', 'Ece'];
const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Öztürk', 'Arslan', 'Doğan', 'Aydın', 'Yavuz', 'Kılıç', 'Polat', 'Özkan'];
const petNames = ['Buddy', 'Luna', 'Max', 'Bella', 'Charlie', 'Molly', 'Rocky', 'Lucy', 'Leo', 'Daisy', 'Milo', 'Zoe', 'Cooper', 'Chloe', 'Bentley', 'Sophie', 'Pamuk', 'Duman', 'Tarçın', 'Gofret', 'Boncuk', 'Limon'];
const petBreeds = {
  Dog: ['Golden Retriever', 'Beagle', 'Pug', 'German Shepherd', 'Bulldog', 'Poodle', 'Rottweiler'],
  Cat: ['Siamese', 'Persian', 'Maine Coon', 'British Shorthair', 'Bengal', 'Sphynx'],
  Bird: ['Budgie', 'Cockatiel', 'Canary', 'Parrot'],
  Other: ['Hamster', 'Rabbit', 'Turtle']
};
const inventoryCategories = ['Vaccine', 'Medicine', 'Food', 'Equipment'] as const;
const reasons = ['Yıllık Kontrol', 'Kuduz Aşısı', 'İç-Dış Parazit', 'Halsizlik Şikayeti', 'Tırnak Kesimi', 'Diş Temizliği', 'Kısırlaştırma Takibi'];

// 1. Generate Owners (1000+)
export const MOCK_OWNERS: Owner[] = Array.from({ length: 1200 }).map((_, i) => ({
  id: `o${i}`,
  name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
  phone: `05${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)}`,
  email: `user${i}@example.com`,
  address: `${['Istanbul', 'Ankara', 'Izmir', 'Bursa'][Math.floor(Math.random() * 4)]}, ${['Kadıköy', 'Çankaya', 'Konak', 'Nilüfer'][Math.floor(Math.random() * 4)]}`,
  pets: [] // Will be populated in next step
}));

// 2. Generate Pets (2000+)
export const MOCK_PETS: Pet[] = Array.from({ length: 2200 }).map((_, i) => {
  const type = (['Dog', 'Cat', 'Bird', 'Other'] as const)[Math.floor(Math.random() * 4)];
  const ownerIndex = Math.floor(Math.random() * MOCK_OWNERS.length);
  const petId = `p${i}`;
  MOCK_OWNERS[ownerIndex].pets.push(petId);
  
  return {
    id: petId,
    name: petNames[Math.floor(Math.random() * petNames.length)],
    type,
    breed: petBreeds[type][Math.floor(Math.random() * petBreeds[type].length)],
    age: Math.floor(Math.random() * 15) + 1,
    weight: Math.floor(Math.random() * 30) + 1,
    ownerId: MOCK_OWNERS[ownerIndex].id,
    imageUrl: `https://picsum.photos/seed/pet${i}/200`
  };
});

// 3. Generate Inventory (1000+)
export const MOCK_INVENTORY: InventoryItem[] = Array.from({ length: 1050 }).map((_, i) => {
  const category = inventoryCategories[Math.floor(Math.random() * inventoryCategories.length)];
  const names: Record<string, string[]> = {
    Vaccine: ['Kuduz Aşısı', 'Karma Aşı', 'Lösemi Aşısı', 'Bronşit Aşısı'],
    Medicine: ['Antibiyotik S', 'Ağrı Kesici Plus', 'Parazit Tableti X', 'Vitamin Mix'],
    Food: ['Premium Puppy 15kg', 'Sterilized Cat Food 2kg', 'Grain Free Diet'],
    Equipment: ['Cerrahi Eldiven', 'Enjektör 2ml', 'Bandaj Seti', 'Dijital Termometre']
  };
  
  return {
    id: `i${i}`,
    name: `${names[category][Math.floor(Math.random() * names[category].length)]} v${i}`,
    category,
    quantity: Math.floor(Math.random() * 200),
    unit: category === 'Food' ? 'kg' : category === 'Medicine' ? 'tablet' : 'adet',
    reorderLevel: 15,
    price: Math.floor(Math.random() * 1500) + 50
  };
});

// 4. Generate Appointments (1000+)
export const MOCK_APPOINTMENTS: Appointment[] = Array.from({ length: 1100 }).map((_, i) => {
  const pet = MOCK_PETS[Math.floor(Math.random() * MOCK_PETS.length)];
  const owner = MOCK_OWNERS.find(o => o.id === pet.ownerId);
  
  return {
    id: `a${i}`,
    petId: pet.id,
    petName: pet.name,
    ownerName: owner?.name || 'Bilinmiyor',
    date: `2024-05-${Math.floor(Math.random() * 28) + 1}`,
    time: `${String(Math.floor(Math.random() * 9) + 9).padStart(2, '0')}:${(['00', '15', '30', '45'])[Math.floor(Math.random() * 4)]}`,
    reason: reasons[Math.floor(Math.random() * reasons.length)],
    status: Math.random() > 0.3 ? 'Scheduled' : 'Completed'
  };
});

// TOTAL DATA: ~5550 items
