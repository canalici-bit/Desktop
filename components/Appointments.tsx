
import React, { useState } from 'react';
import { UserRole, Appointment } from '../types';
import { Calendar as CalendarIcon, Clock, User, ChevronLeft, ChevronRight, MoreVertical, ShieldCheck, X, FileText, Activity, Plus, Filter } from 'lucide-react';

interface AppointmentsProps {
  role: UserRole;
  appointments: Appointment[];
  onAdd: (newApp: Appointment) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ role, appointments, onAdd }) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [newApp, setNewApp] = useState({
    petName: '',
    ownerName: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    reason: ''
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `a${Date.now()}`,
      petId: 'custom',
      status: 'Scheduled',
      ...newApp
    });
    setIsAddModalOpen(false);
    setNewApp({ petName: '', ownerName: '', date: new Date().toISOString().split('T')[0], time: '09:00', reason: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Modallar aynı kalacak ama UI iyileştirildi */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black tracking-tight">Randevu Kaydı</h3>
                <p className="text-indigo-100 text-xs font-bold uppercase opacity-80 mt-1">Dijital Kayıt Sistemi</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Hayvan Adı</label>
                  <input required value={newApp.petName} onChange={e => setNewApp({...newApp, petName: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold" placeholder="Örn: Pamuk" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Sahip Adı</label>
                  <input required value={newApp.ownerName} onChange={e => setNewApp({...newApp, ownerName: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold" placeholder="Ad Soyad" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Tarih</label>
                  <input type="date" required value={newApp.date} onChange={e => setNewApp({...newApp, date: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Saat</label>
                  <input type="time" required value={newApp.time} onChange={e => setNewApp({...newApp, time: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Detay Notu</label>
                <textarea required value={newApp.reason} onChange={e => setNewApp({...newApp, reason: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold h-24" placeholder="Muayene sebebi..." />
              </div>
              <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-2xl shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all">Sisteme Kaydet</button>
            </form>
          </div>
        </div>
      )}

      {/* Header Kısmı */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white flex items-center rounded-2xl border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 p-1">
            <button className="p-3 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-indigo-600"><ChevronLeft size={20} /></button>
            <div className="px-6 py-2 font-black text-slate-700 tracking-tight">20 Mayıs 2024</div>
            <button className="p-3 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-indigo-600"><ChevronRight size={20} /></button>
          </div>
          <button className="bg-white px-6 py-4 rounded-2xl border border-slate-100 font-black text-slate-500 hover:text-indigo-600 shadow-lg shadow-slate-200/50 transition-all active:scale-95">Bugün</button>
        </div>
        <div className="flex gap-4">
           <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 shadow-lg shadow-slate-200/50 transition-all"><Filter size={20}/></button>
           <button 
             onClick={() => setIsAddModalOpen(true)}
             className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
           >
             <Plus size={22} strokeWidth={3} /> Yeni Randevu
           </button>
        </div>
      </div>

      {/* Liste Kartları */}
      <div className="grid grid-cols-1 gap-4">
        {appointments.map((app, index) => (
          <div key={app.id} 
               className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-50 flex flex-col md:flex-row md:items-center gap-8 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-bottom-4"
               style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-6 md:w-48 shrink-0">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <Clock size={28} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 tracking-tighter">{app.time}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Onaylandı</p>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-6">
              <div className="relative">
                <img src={`https://picsum.photos/seed/${app.petName}/100`} alt="" className="w-16 h-16 rounded-[1.5rem] object-cover shadow-lg border-2 border-white" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-500 border-4 border-white rounded-full flex items-center justify-center text-[8px] font-black text-white">#1</div>
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-800 leading-none mb-1 group-hover:text-indigo-600 transition-colors">
                  {app.petName} 
                  <span className="text-slate-300 font-bold ml-3 text-sm tracking-normal">/ {app.ownerName}</span>
                </h4>
                <div className="flex items-center gap-6 mt-2">
                  <span className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase"><CalendarIcon size={14} className="text-indigo-400" /> {app.reason}</span>
                  <span className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase"><User size={14} className="text-purple-400" /> Dr. Selin Demir</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-6 py-3 bg-slate-50 text-slate-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all">Muayene Başlat</button>
              <button className="p-3 text-slate-300 hover:text-slate-600 transition-colors"><MoreVertical size={24} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Alt Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6 text-center md:text-left">
            <div className="p-5 bg-white/10 backdrop-blur-md text-white rounded-[1.5rem] border border-white/10 shadow-xl">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h4 className="text-2xl font-black text-white tracking-tight">Akıllı Hatırlatma Sistemi</h4>
              <p className="text-indigo-200/70 font-medium max-w-md">Bugün için 8 farklı pati sahibine aşı hatırlatma mesajı başarıyla iletildi.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsReportOpen(true)}
            className="px-10 py-5 bg-white text-slate-900 rounded-[1.5rem] font-black shadow-xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
          >
            Sistem Raporunu Aç
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
