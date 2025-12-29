
import { Pet, Appointment, InventoryItem, Owner, MedicalRecord } from './types';

export const COLORS = {
  primary: '#6366f1', // Modern Indigo
  secondary: '#8b5cf6', // Violet
  accent: '#f43f5e', // Rose
  light: '#f8fafc',
  dark: '#0f172a', // Slate 900
  glass: 'rgba(255, 255, 255, 0.7)'
};

export const MOCK_PETS: Pet[] = [
  { id: '1', name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', age: 3, weight: 28, ownerId: 'o1', imageUrl: 'https://picsum.photos/seed/buddy/200' },
  { id: '2', name: 'Luna', type: 'Cat', breed: 'Siamese', age: 2, weight: 4.5, ownerId: 'o1', imageUrl: 'https://picsum.photos/seed/luna/200' },
  { id: '3', name: 'Max', type: 'Dog', breed: 'Beagle', age: 5, weight: 12, ownerId: 'o2', imageUrl: 'https://picsum.photos/seed/max/200' },
];

export const MOCK_OWNERS: Owner[] = [
  { id: 'o1', name: 'Ahmet Yılmaz', phone: '0532 123 45 67', email: 'ahmet@example.com', address: 'Istanbul, Kadıköy', pets: ['1', '2'] },
  { id: 'o2', name: 'Ayşe Kaya', phone: '0544 987 65 43', email: 'ayse@example.com', address: 'Istanbul, Beşiktaş', pets: ['3'] },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'a1', petId: '1', petName: 'Buddy', ownerName: 'Ahmet Yılmaz', date: '2024-05-20', time: '10:30', reason: 'Kuduz Aşısı', status: 'Scheduled' },
  { id: 'a2', petId: '2', petName: 'Luna', ownerName: 'Ahmet Yılmaz', date: '2024-05-20', time: '14:00', reason: 'Yıllık Kontrol', status: 'Scheduled' },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'Kuduz Aşısı (Rabies)', category: 'Vaccine', quantity: 45, unit: 'dose', reorderLevel: 10, price: 250 },
  { id: 'i2', name: 'İç Parazit Tableti', category: 'Medicine', quantity: 120, unit: 'tablet', reorderLevel: 20, price: 85 },
  { id: 'i3', name: 'Cerrahi Maske', category: 'Equipment', quantity: 500, unit: 'pcs', reorderLevel: 100, price: 2 },
];

export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  { id: 'm1', petId: '1', date: '2024-04-15', description: 'Karma Aşı uygulandı.', treatment: 'Aşı', veterinarian: 'Dr. Selin Demir', type: 'Vaccination' },
  { id: 'm2', petId: '3', date: '2024-04-10', description: 'Kulak enfeksiyonu kontrolü.', treatment: 'Antibiyotik Damla', veterinarian: 'Dr. Selin Demir', type: 'Checkup' },
];
