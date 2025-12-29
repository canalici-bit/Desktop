
import React, { useState } from 'react';
import { Owner, Pet } from '../types';
import { Search, Phone, Mail, ChevronRight, Plus, MapPin, HeartPulse, ClipboardList, X } from 'lucide-react';

interface Props {
  owners: Owner[];
  pets: Pet[];
  onAddClient: (owner: Owner) => void;
  onAddNotification: (text: string) => void;
}

const Clients: React.FC<Props> = ({ owners, pets, onAddClient, onAddNotification }) => {
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', phone: '', email: '', address: '' });

  const filteredOwners = owners.filter(o => o.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClient({
      id: `o${Date.now()}`,
      ...newClient,
      pets: []
    });
    setIsAddModalOpen(false);
    setNewClient({ name: '', phone: '', email: '', address: '' });
  };

  const handleSaveNote = () => {
    onAddNotification(`${selectedOwner?.name} için muayene notu sisteme işlendi.`);
    setIsNoteModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Yeni Müşteri Modalı */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
            <div className="p-6 bg-indigo-600 text-white flex justify-between items-center rounded-t-3xl">
              <h3 className="text-xl font-bold">Yeni Müşteri Kaydı (CRM)</h3>
              <button onClick={() => setIsAddModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleAddClient} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  required 
                  placeholder="Ad Soyad" 
                  value={newClient.name} 
                  onChange={e => setNewClient({...newClient, name: e.target.value})} 
                  className="p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500" 
                />
                <input 
                  required 
                  placeholder="Telefon" 
                  value={newClient.phone} 
                  onChange={e => setNewClient({...newClient, phone: e.target.value})} 
                  className="p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
              <input 
                required 
                placeholder="E-posta" 
                type="email" 
                value={newClient.email} 
                onChange={e => setNewClient({...newClient, email: e.target.value})} 
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500" 
              />
              <textarea 
                required 
                placeholder="Adres" 
                value={newClient.address} 
                onChange={e => setNewClient({...newClient, address: e.target.value})} 
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none h-24 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500" 
              />
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg">Müşteriyi Kaydet</button>
            </form>
          </div>
        </div>
      )}

      {/* Muayene Notu Modalı */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Muayene Notu: {selectedOwner?.name}</h3>
              <button onClick={() => setIsNoteModalOpen(false)}><X className="text-gray-800" /></button>
            </div>
            <div className="p-6 space-y-4">
              <textarea 
                placeholder="Muayene bulguları, tedavi planı ve ilaç reçetesi..." 
                className="w-full h-48 p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-400" 
              />
              <div className="flex gap-2">
                <button onClick={() => setIsNoteModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold">İptal</button>
                <button onClick={handleSaveNote} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg">Notu Kaydet</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Müşteri ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm text-gray-800"
          />
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus size={18} /> Yeni Müşteri Kaydı
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-fit">
          {filteredOwners.map((owner) => (
            <div key={owner.id} onClick={() => setSelectedOwner(owner)} className={`bg-white rounded-2xl shadow-sm border-2 p-6 cursor-pointer transition-all ${selectedOwner?.id === owner.id ? 'border-indigo-500 bg-indigo-50/30' : 'border-transparent hover:border-gray-200'}`}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xl italic">{owner.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <h3 className="font-black text-gray-800 text-lg tracking-tight">{owner.name}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase mt-0.5"><MapPin size={10} /> {owner.address}</div>
                  </div>
                </div>
                <ChevronRight size={20} className={selectedOwner?.id === owner.id ? 'text-indigo-500' : 'text-gray-300'} />
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-600"><div className="p-2 bg-gray-50 rounded-lg"><Phone size={14} className="text-gray-400" /></div>{owner.phone}</div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-600"><div className="p-2 bg-gray-50 rounded-lg"><Mail size={14} className="text-gray-400" /></div>{owner.email}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 h-fit sticky top-4">
          {selectedOwner ? (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-4">
                     <img src={`https://picsum.photos/seed/${selectedOwner.id}/200`} className="w-full h-full object-cover" alt="" />
                  </div>
                  <h3 className="text-xl font-black text-gray-800">{selectedOwner.name}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase mt-1">Müşteri Detay Paneli</p>
               </div>
               <div className="space-y-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><HeartPulse size={14} className="text-red-500" /> Sağlık Karneleri</h4>
                  {selectedOwner.pets.map(petId => {
                    const pet = pets.find(p => p.id === petId);
                    if (!pet) return null;
                    return (
                      <div key={pet.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-gray-800">{pet.name}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-bold uppercase">{pet.breed}</span>
                        </div>
                      </div>
                    );
                  })}
               </div>
               <button onClick={() => setIsNoteModalOpen(true)} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl">
                 <ClipboardList size={18} /> Muayene Notu Ekle
               </button>
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
               <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center italic font-black text-4xl text-gray-400">?</div>
               <p className="text-sm font-bold text-gray-500 max-w-[200px]">Detaylar için müşteri seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
