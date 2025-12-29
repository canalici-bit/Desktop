
import React, { useState } from 'react';
import { UserRole, Pet, Appointment, InventoryItem, Owner } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Appointments from './components/Appointments';
import Clients from './components/Clients';
import AIChecker from './components/AIChecker';
import { MOCK_PETS, MOCK_OWNERS, MOCK_APPOINTMENTS, MOCK_INVENTORY } from './constants';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.VETERINARIAN);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [owners, setOwners] = useState<Owner[]>(MOCK_OWNERS);
  const [pets, setPets] = useState<Pet[]>(MOCK_PETS);
  const [notifications, setNotifications] = useState<{id: number, text: string}[]>([]);

  const addNotification = (text: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const updateStock = (id: string, amount: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + amount);
        if (newQty <= item.reorderLevel && amount < 0) {
          addNotification(`${item.name} stoğu kritik seviyeye düştü!`);
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const addInventoryItem = (newItem: InventoryItem) => {
    setInventory(prev => [newItem, ...prev]);
    addNotification(`${newItem.name} envantere eklendi.`);
  };

  const addClient = (newOwner: Owner) => {
    setOwners(prev => [newOwner, ...prev]);
    addNotification(`${newOwner.name} başarıyla kaydedildi.`);
  };

  const addAppointment = (newApp: Appointment) => {
    setAppointments(prev => [newApp, ...prev]);
    addNotification(`${newApp.petName} için randevu oluşturuldu.`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard role={role} appointments={appointments} inventory={inventory} setActiveTab={setActiveTab} />;
      case 'inventory':
        return role === UserRole.VETERINARIAN ? (
          <Inventory inventory={inventory} updateStock={updateStock} onAddItem={addInventoryItem} />
        ) : null;
      case 'appointments':
        return <Appointments role={role} appointments={appointments} onAdd={addAppointment} />;
      case 'clients':
        return role === UserRole.VETERINARIAN ? (
          <Clients owners={owners} pets={pets} onAddClient={addClient} onAddNotification={addNotification} />
        ) : null;
      case 'ai-checker':
        return <AIChecker />;
      default:
        return <Dashboard role={role} appointments={appointments} inventory={inventory} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {notifications.map(n => (
          <div key={n.id} className="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl animate-in slide-in-from-right duration-300 text-sm font-medium border border-gray-700">
            🔔 {n.text}
          </div>
        ))}
      </div>

      <Sidebar 
        role={role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setRole={setRole}
      />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'Genel Bakış'}
              {activeTab === 'inventory' && 'Envanter Yönetimi (ERP)'}
              {activeTab === 'appointments' && 'Randevu Takvimi'}
              {activeTab === 'clients' && 'Müşteri Kayıtları (CRM)'}
              {activeTab === 'ai-checker' && 'PatiAI Belirti Kontrolü'}
            </h1>
            <p className="text-gray-500 text-sm italic">"Can dostlarımızın sağlığı bizim önceliğimiz."</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
             <div className="text-right hidden sm:block px-2">
               <p className="text-sm font-bold text-gray-800">{role === UserRole.VETERINARIAN ? 'Dr. Selin Demir' : 'Ahmet Yılmaz'}</p>
               <p className="text-[10px] uppercase tracking-tighter text-blue-500 font-bold">{role === UserRole.VETERINARIAN ? 'Başhekim' : 'Pati Sahibi'}</p>
             </div>
             <img 
               src={role === UserRole.VETERINARIAN ? "https://picsum.photos/seed/vet/100" : "https://picsum.photos/seed/owner/100"} 
               className="w-12 h-12 rounded-xl border-2 border-indigo-100 object-cover"
               alt="User"
             />
          </div>
        </header>

        <div className="max-w-7xl mx-auto pb-20">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
