
import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Save, Image as ImageIcon } from 'lucide-react';
import { MenuItem } from '../types';
import { t } from '../translations';

interface ProductManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onSave: (items: MenuItem[]) => void;
  embedded?: boolean; // New prop to control display mode
}

const ProductManagerModal: React.FC<ProductManagerModalProps> = ({ isOpen, onClose, menuItems, onSave, embedded = false }) => {
  const [items, setItems] = useState<MenuItem[]>(menuItems);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({});
  
  const zh = t.zh;
  const en = t.en;

  if (!isOpen) return null;

  const handleAddItem = () => {
    const newId = Date.now();
    setItems([...items, { id: newId, orig: 'New Dish', trans: 'New Dish', price: '0.00' }]);
    setEditingId(newId);
    setEditForm({ id: newId, orig: '', trans: '', price: '' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm(zh.deleteConfirm)) {
        const newItems = items.filter(i => i.id !== id);
        setItems(newItems);
        onSave(newItems);
    }
  };

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const saveEdit = () => {
    if (editingId) {
        const newItems = items.map(i => i.id === editingId ? { ...i, ...editForm } as MenuItem : i);
        setItems(newItems);
        onSave(newItems);
        setEditingId(null);
    }
  };

  const content = (
    <div className={`flex flex-col h-full ${embedded ? 'bg-transparent' : 'bg-slate-50'}`}>
        {!embedded && (
            <div className="px-6 py-5 bg-white rounded-t-[2.5rem] flex justify-between items-center shadow-sm z-10">
                <h2 className="text-lg font-black text-slate-900">{zh.productManager}</h2>
                <button onClick={onClose}><X size={24} /></button>
            </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            
            <button 
                onClick={handleAddItem}
                className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:border-rose-400 hover:text-rose-500 hover:bg-white transition-all font-bold"
            >
                <Plus size={20} /> {zh.addProduct}
            </button>

            {items.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                    {editingId === item.id ? (
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-slate-400">{zh.productName}</label>
                                <input 
                                    className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 font-bold"
                                    value={editForm.orig} 
                                    onChange={e => setEditForm({...editForm, orig: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400">{zh.productTrans}</label>
                                <input 
                                    className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 text-sm"
                                    value={editForm.trans} 
                                    onChange={e => setEditForm({...editForm, trans: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400">{zh.productPrice}</label>
                                <input 
                                    className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 font-mono"
                                    value={editForm.price} 
                                    onChange={e => setEditForm({...editForm, price: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button onClick={saveEdit} className="flex-1 bg-rose-500 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2">
                                    <Save size={16} /> {zh.saveChanges}
                                </button>
                                <button onClick={() => setEditingId(null)} className="px-4 bg-slate-100 rounded-xl font-bold text-slate-500">{zh.cancel}</button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                                    <ImageIcon size={20} />
                                </div>
                                <div>
                                    <div className="font-black text-slate-800">{item.orig}</div>
                                    <div className="text-xs text-slate-400 font-bold">{item.trans}</div>
                                    <div className="text-rose-500 font-bold mt-1">¥{item.price}</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => startEdit(item)} className="p-2 text-slate-400 hover:text-rose-500 bg-slate-50 rounded-lg hover:bg-rose-50">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg hover:bg-red-50">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );

  if (embedded) return content;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-slate-50 rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh]">
        {content}
      </div>
    </div>
  );
};

export default ProductManagerModal;
