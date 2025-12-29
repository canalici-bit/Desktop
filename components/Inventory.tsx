
import React, { useState } from 'react';
import { InventoryItem } from '../types';
import { Search, Filter, Plus, Minus, AlertTriangle, PackageOpen, X } from 'lucide-react';
import { COLORS } from '../constants';

interface Props {
  inventory: InventoryItem[];
  updateStock: (id: string, amount: number) => void;
  onAddItem: (item: InventoryItem) => void;
}

const Inventory: React.FC<Props> = ({ inventory, updateStock, onAddItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Medicine', quantity: 0, price: 0 });

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem({
      id: `i${Date.now()}`,
      name: newItem.name,
      category: newItem.category as any,
      quantity: Number(newItem.quantity),
      unit: 'adet',
      reorderLevel: 5,
      price: Number(newItem.price)
    });
    setIsModalOpen(false);
    setNewItem({ name: '', category: 'Medicine', quantity: 0, price: 0 });
  };

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
      {/* Stok Giriş Modalı */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Yeni Stok Girişi</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Ürün Adı</label>
                <input 
                  required 
                  value={newItem.name} 
                  onChange={e => setNewItem({...newItem, name: e.target.value})} 
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-400" 
                  placeholder="Ürün adı giriniz"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Miktar</label>
                  <input 
                    type="number" 
                    required 
                    value={newItem.quantity} 
                    onChange={e => setNewItem({...newItem, quantity: Number(e.target.value)})} 
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-gray-800" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Birim Fiyat (₺)</label>
                  <input 
                    type="number" 
                    required 
                    value={newItem.price} 
                    // Fixed: Using setNewItem instead of undefined setNewApp
                    onChange={e => setNewItem({...newItem, price: Number(e.target.value)})} 
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-gray-800" 
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-colors">Kaydet ve Ekle</button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Ürün ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm text-gray-800"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-all">
              <Filter size={16} className="text-gray-600" /> Dışa Aktar
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all" style={{ backgroundColor: COLORS.secondary }}>
              <Plus size={16} /> Stok Girişi
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-gray-400 uppercase text-[10px] font-bold tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-5">Ürün Bilgisi</th>
                <th className="px-6 py-5">Kategori</th>
                <th className="px-6 py-5">Mevcut Stok</th>
                <th className="px-6 py-5">Birim Fiyat</th>
                <th className="px-6 py-5 text-center">Hızlı İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                        <PackageOpen size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.name}</p>
                        <p className="text-[10px] text-gray-400">ID: {item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-bold uppercase tracking-tighter">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-800">
                      <div className={`text-sm font-bold ${item.quantity <= item.reorderLevel ? 'text-red-600' : ''}`}>
                        {item.quantity} <span className="text-[10px] font-normal opacity-70">{item.unit}</span>
                      </div>
                      {item.quantity <= item.reorderLevel && (
                        <div className="bg-red-100 text-red-600 p-1 rounded-full animate-pulse">
                          <AlertTriangle size={12} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-indigo-600">₺{item.price.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => updateStock(item.id, -1)} className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm">
                        <Minus size={14} />
                      </button>
                      <button onClick={() => updateStock(item.id, 1)} className="p-1.5 bg-green-50 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all shadow-sm">
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
