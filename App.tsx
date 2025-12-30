
import React, { useState } from 'react';
import { UserRole, Pet, Appointment, InventoryItem, Owner } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Appointments from './components/Appointments';
import Clients from './components/Clients';
import AIChecker from './components/AIChecker';
import Login from './components/Login';
import { MOCK_PETS, MOCK_OWNERS, MOCK_APPOINTMENTS, MOCK_INVENTORY } from './constants';
import { Bell, Search, Settings, HelpCircle, X, Globe, Moon, Shield, Info, PhoneCall, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.VETERINARIAN);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [owners, setOwners] = useState<Owner[]>(MOCK_OWNERS);
  const [pets, setPets] = useState<Pet[]>(MOCK_PETS);
  const [notifications, setNotifications] = useState<{id: number, text: string, type: 'info' | 'warning'}[]>([]);

  const addNotification = (text: string, type: 'info' | 'warning' = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const updateStock = (id: string, amount: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + amount);
        if (newQty <= item.reorderLevel && amount < 0) {
          addNotification(`${item.name} stoğu kritik seviyeye düştü!`, 'warning');
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

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
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
          <Clients owners={owners} pets={pets} onAddClient={addClient} onAddNotification={(text) => addNotification(text)} />
        ) : null;
      case 'ai-checker':
        return <AIChecker />;
      default:
        return <Dashboard role={role} appointments={appointments} inventory={inventory} setActiveTab={setActiveTab} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsSettingsOpen(false)}>
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-300 ring-1 ring-slate-200" onClick={e => e.stopPropagation()}>
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Sistem Ayarları</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Konfigürasyon Paneli</p>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Klinik Bilgileri</label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl text-indigo-600 shadow-sm"><Globe size={18}/></div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Klinik Adı</p>
                      <input type="text" defaultValue="Pati Koruma Vet" className="bg-transparent border-none p-0 text-sm font-black text-slate-800 focus:ring-0 w-full" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-slate-50">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tercihler</label>
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all"><Moon size={18}/></div>
                    <p className="text-sm font-bold text-slate-700">Karanlık Mod (Beta)</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 transition-colors">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all"><Shield size={18}/></div>
                    <p className="text-sm font-bold text-slate-700">İki Faktörlü Doğrulama</p>
                  </div>
                  <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 flex justify-end">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>

              <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4">
                Ayarları Güncelle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsHelpOpen(false)}>
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-300 ring-1 ring-slate-200" onClick={e => e.stopPropagation()}>
            <div className="p-8 bg-gradient-to-br from-slate-900 to-indigo-950 text-white flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black tracking-tight">Destek Merkezi</h3>
                <p className="text-indigo-200/60 text-xs font-bold uppercase tracking-widest mt-1">Size Nasıl Yardımcı Olabiliriz?</p>
              </div>
              <button onClick={() => setIsHelpOpen(false)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
                  <BookOpen className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform" size={24}/>
                  <p className="text-sm font-black text-slate-800">Kullanım Kılavuzu</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">Adım adım rehber</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
                  <PhoneCall className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" size={24}/>
                  <p className="text-sm font-black text-slate-800">Canlı Destek</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">7/24 operatör</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Sıkça Sorulan Sorular</h4>
                <div className="space-y-3">
                  {["Randevu nasıl iptal edilir?", "Stok kritik uyarısı nereden ayarlanır?", "Hasta kaydı nasıl silinir?"].map((q, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                      <p className="text-xs font-bold text-slate-600">{q}</p>
                      <Info size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-8 pb-8">
              <div className="p-4 bg-indigo-50 rounded-2xl flex items-center gap-4 border border-indigo-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white"><HelpCircle size={20}/></div>
                <p className="text-[11px] font-bold text-indigo-900 leading-tight">Uygulama Versiyonu: v2.4.0-pro<br/><span className="opacity-60 font-medium italic">Tüm hakları Pati Koruma'ya aittir.</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Bildirimler */}
      <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        {notifications.map(n => (
          <div key={n.id} className={`pointer-events-auto min-w-[320px] backdrop-blur-xl border p-4 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-500 flex items-start gap-4 ${
            n.type === 'warning' ? 'bg-rose-50/90 border-rose-200 text-rose-900' : 'bg-white/90 border-indigo-100 text-slate-900'
          }`}>
            <div className={`p-2 rounded-xl ${n.type === 'warning' ? 'bg-rose-200 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
              <Bell size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold leading-tight">{n.text}</p>
              <p className="text-[10px] font-medium opacity-60 mt-1">Şimdi • Sistem Mesajı</p>
            </div>
          </div>
        ))}
      </div>

      <Sidebar 
        role={role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setRole={setRole}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Hızlı ara (Cmd + K)" 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm font-medium w-64 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsHelpOpen(true)}
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all active:scale-90"
              >
                <HelpCircle size={20}/>
              </button>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all active:scale-90 rotate-hover"
              >
                <Settings size={20}/>
              </button>
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-4 group cursor-pointer">
               <div className="text-right">
                 <p className="text-sm font-black text-slate-800 tracking-tight leading-none mb-1 group-hover:text-indigo-600 transition-colors">
                   {role === UserRole.VETERINARIAN ? 'Dr. Selin Demir' : 'Ahmet Yılmaz'}
                 </p>
                 <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">
                   {role === UserRole.VETERINARIAN ? 'Yönetici' : 'Pati Sahibi'}
                 </span>
               </div>
               <div className="relative">
                 <img 
                   src={role === UserRole.VETERINARIAN ? "https://picsum.photos/seed/vet/100" : "https://picsum.photos/seed/owner/100"} 
                   className="w-10 h-10 rounded-xl ring-2 ring-indigo-50 border-2 border-white object-cover"
                   alt="User"
                 />
                 <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
               </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1600px] mx-auto w-full pb-24">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              {activeTab === 'dashboard' && 'Hoş Geldiniz 👋'}
              {activeTab === 'inventory' && 'Envanter Merkezi'}
              {activeTab === 'appointments' && 'Randevu Panosu'}
              {activeTab === 'clients' && 'Müşteri Yönetimi'}
              {activeTab === 'ai-checker' && 'PatiAI Zekası'}
            </h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
              {activeTab === 'dashboard' && 'Klinik performansınız ve bugün bekleyen işlemleriniz aşağıdadır.'}
              {activeTab === 'inventory' && 'Tıbbi malzeme stoklarını ve tedarik durumlarını buradan takip edin.'}
              {activeTab === 'appointments' && 'Can dostlarımız için planlanan tüm ziyaretleri yönetin.'}
              {activeTab === 'clients' && 'Müşteri ilişkileri ve hasta geçmişlerini görüntüleyin.'}
              {activeTab === 'ai-checker' && 'Yapay zeka ile ön belirti analizi yaparak rehberlik alın.'}
            </p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
