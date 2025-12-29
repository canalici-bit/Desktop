
export enum UserRole {
  VETERINARIAN = 'VETERINARIAN',
  OWNER = 'OWNER'
}

export interface Pet {
  id: string;
  name: string;
  type: 'Dog' | 'Cat' | 'Bird' | 'Other';
  breed: string;
  age: number;
  weight: number;
  ownerId: string;
  imageUrl?: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  date: string;
  description: string;
  treatment: string;
  veterinarian: string;
  type: 'Vaccination' | 'Checkup' | 'Surgery' | 'Parasite';
}

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  ownerName: string;
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Vaccine' | 'Medicine' | 'Food' | 'Equipment';
  quantity: number;
  unit: string;
  reorderLevel: number;
  price: number;
}

export interface Owner {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  pets: string[];
}
