
import React from 'react';
import { UserRole, Appointment, InventoryItem } from '../types';
import { COLORS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
// Add BrainCircuit to the lucide-react imports
import { Activity, Clock, Package, TrendingUp, ChevronRight, Zap, BrainCircuit } from 'lucide-react';

interface Props {
  role: UserRole;
  appointments: Appointment[];
  inventory: InventoryItem[];
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<Props> = ({ role, appointments, inventory, setActiveTab }) => {
  const chartData = [
    { name: 'Pzt', app: 12 },
    { name: 'Sal', app: 19 },
    { name: 'Çar', app: 15 },
    { name: 'Per', app: 22 },
    { name: 'Cum', app: 30 },
    { name: 'Cmt', app: 25 },
    { name: 'Paz', app: 5 },
  ];

  const criticalItemsCount = inventory.filter(i => i.quantity <= i.reorderLevel).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Üst Stat Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Toplam Hasta" value="1,248" change="+12.5%" icon={<Activity size={24} />} color="indigo" />
        <StatCard label="Aktif Randevu" value={appointments.length.toString()} change="Bugün" icon={<Clock size={24} />} color="rose" />
        <StatCard label="Kritik Stok" value={criticalItemsCount.toString()} change="Dikkat!" icon={<Package size={24} />} color="amber" />
        <StatCard label="Günlük Gelir" value="₺12,450" change="+8.2%" icon={<TrendingUp size={24} />} color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ana Grafik Alanı */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap size={120} className="text-indigo-600" />
          </div>
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Haftalık Analiz</h3>
              <p className="text-sm font-bold text-slate-400">Muayene ve randevu yoğunluğu</p>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl">
              <button className="px-4 py-2 bg-white shadow-sm rounded-xl text-xs font-black text-indigo-600">Haftalık</button>
              <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600">Aylık</button>
            </div>
          </div>
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '15px'}} 
                  itemStyle={{fontWeight: 900, color: '#4f46e5'}}
                />
                <Area type="monotone" dataKey="app" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorApp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sağ Panel */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                   <BrainCircuit size={28} />
                 </div>
                 <h4 className="text-xl font-black">PatiAI Zekası</h4>
               </div>
               <p className="text-sm text-indigo-100 mb-8 font-medium leading-relaxed opacity-90">
                 Yapay zeka bugün 12 köpeğin deri döküntüsü analizini yaptı. Kritik bir durum saptanmadı.
               </p>
               <button 
                 onClick={() => setActiveTab('ai-checker')}
                 className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
               >
                 Tüm Analizleri Gör
               </button>
             </div>
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                <BrainCircuit size={200} />
             </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Sıradaki Hasta</h3>
                <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                  <ChevronRight size={20} />
                </button>
             </div>
             <div className="space-y-6">
                {appointments.slice(0, 3).map(app => (
                  <div key={app.id} className="flex items-center gap-4 group cursor-pointer">
                    <div className="relative">
                      <img src={`https://picsum.photos/seed/${app.petName}/100`} className="w-14 h-14 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform" alt="" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-black text-slate-800 leading-none mb-1 group-hover:text-indigo-600 transition-colors">{app.petName}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{app.reason}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-slate-800">{app.time}</p>
                       <p className="text-[10px] text-slate-400 font-bold">Bugün</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, change, icon, color }: any) => {
  const colorMap: any = {
    indigo: 'from-indigo-500 to-blue-600 shadow-indigo-200',
    rose: 'from-rose-500 to-pink-600 shadow-rose-200',
    amber: 'from-amber-500 to-orange-600 shadow-amber-200',
    emerald: 'from-emerald-500 to-teal-600 shadow-emerald-200',
  };

  const isUp = change.includes('+');

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${colorMap[color]} text-white shadow-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {change}
        </div>
      </div>
      <div>
        <h4 className="text-3xl font-black text-slate-800 tracking-tighter mb-1">{value}</h4>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
};

export default Dashboard;
