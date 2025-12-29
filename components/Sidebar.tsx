
import React from 'react';
import { UserRole } from '../types';
import { LayoutDashboard, Calendar, Package, Users, BrainCircuit, ShieldCheck, UserCircle, LogOut } from 'lucide-react';
import { COLORS } from '../constants';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setRole: (role: UserRole) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, setRole }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Genel Bakış', icon: LayoutDashboard, roles: [UserRole.VETERINARIAN, UserRole.OWNER] },
    { id: 'appointments', label: 'Randevular', icon: Calendar, roles: [UserRole.VETERINARIAN, UserRole.OWNER] },
    { id: 'inventory', label: 'Envanter (ERP)', icon: Package, roles: [UserRole.VETERINARIAN] },
    { id: 'clients', label: 'Müşteriler (CRM)', icon: Users, roles: [UserRole.VETERINARIAN] },
    { id: 'ai-checker', label: 'PatiAI', icon: BrainCircuit, roles: [UserRole.VETERINARIAN, UserRole.OWNER] },
  ];

  return (
    <aside className="w-72 bg-slate-900 flex flex-col h-full shrink-0 relative overflow-hidden">
      {/* Arka plan süsü */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500 rounded-full blur-[100px]"></div>
      </div>

      <div className="p-8 flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 bg-gradient-to-br from-indigo-500 to-purple-600">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight text-white leading-none">Pati Koruma</h2>
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Health Hub</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-6 relative z-10">
        {menuItems.filter(item => item.roles.includes(role)).map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30 translate-x-1' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={22} className={`${isActive ? 'text-white' : 'group-hover:text-indigo-400'} transition-colors`} />
              <span className="font-bold tracking-tight">{item.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"></div>}
            </button>
          );
        })}
      </nav>

      <div className="p-6 mt-auto relative z-10">
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10">
          <button 
            onClick={() => setRole(role === UserRole.VETERINARIAN ? UserRole.OWNER : UserRole.VETERINARIAN)}
            className="w-full flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <UserCircle size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-tighter">Görünüm</p>
                <p className="text-sm font-black text-white">{role === UserRole.VETERINARIAN ? 'Hekim' : 'Sahibi'}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
