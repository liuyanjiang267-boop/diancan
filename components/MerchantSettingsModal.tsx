
import React, { useState } from 'react';
import { X, Save, Wifi, CreditCard, Store, Image as ImageIcon, Trash2, Upload, Lock } from 'lucide-react';
import { MerchantConfig } from '../types';
import { t } from '../translations';

interface MerchantSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: MerchantConfig;
  onSave: (newConfig: MerchantConfig) => void;
}

const MerchantSettingsModal: React.FC<MerchantSettingsModalProps> = ({ isOpen, onClose, config, onSave }) => {
  const [formData, setFormData] = useState<MerchantConfig>(config);
  const [activeTab, setActiveTab] = useState<'general' | 'wifi' | 'album' | 'payment' | 'security'>('general');
  const zh = t.zh;
  const en = t.en;

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleAddImage = () => {
    const randomImages = [
       "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
       "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
       "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800",
       "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=800"
    ];
    const randomImg = randomImages[Math.floor(Math.random() * randomImages.length)];
    setFormData(prev => ({
        ...prev,
        albumImages: [...prev.albumImages, randomImg]
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
        ...prev,
        albumImages: prev.albumImages.filter((_, i) => i !== index)
    }));
  };

  const TabButton = ({ id, icon: Icon, labelZh, labelEn }: any) => (
      <button
        onClick={() => setActiveTab(id)}
        className={`flex-1 min-w-[64px] py-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${activeTab === id ? 'bg-white shadow-md text-rose-500' : 'text-slate-400 hover:bg-white/50'}`}
    >
        <Icon size={24} strokeWidth={2.5} className="mb-1.5" />
        <span className="text-[10px] font-black leading-none">{labelZh}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-slate-50 rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-white rounded-t-[2.5rem] flex justify-between items-center shadow-sm z-10">
          <div>
              <h2 className="text-lg font-black text-slate-900">{zh.storeSettings}</h2>
              <p className="text-xs text-slate-400 font-bold">{en.storeSettings}</p>
          </div>
          <button onClick={onClose} className="p-2.5 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 gap-1 bg-slate-100 overflow-x-auto no-scrollbar">
            <TabButton id="general" icon={Store} labelZh={zh.tabGeneral} labelEn={en.tabGeneral} />
            <TabButton id="wifi" icon={Wifi} labelZh={zh.tabWifi} labelEn={en.tabWifi} />
            <TabButton id="album" icon={ImageIcon} labelZh={zh.tabAlbum} labelEn={en.tabAlbum} />
            <TabButton id="payment" icon={CreditCard} labelZh={zh.tabPayment} labelEn={en.tabPayment} />
            <TabButton id="security" icon={Lock} labelZh={zh.tabSecurity} labelEn={en.tabSecurity} />
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FDFDFD]">
          
          {activeTab === 'general' && (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">{zh.storeName}</label>
                <input
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full p-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">{zh.currencySymbol}</label>
                <input
                  type="text"
                  value={formData.currencySymbol}
                  onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                  className="w-24 p-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm text-center font-black text-lg"
                />
              </div>
            </div>
          )}

          {activeTab === 'wifi' && (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">{zh.wifiSsid}</label>
                <div className="relative">
                    <Wifi size={20} strokeWidth={2.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                    type="text"
                    value={formData.wifiSsid}
                    onChange={(e) => setFormData({ ...formData, wifiSsid: e.target.value })}
                    className="w-full p-4 pl-12 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm transition-all font-bold"
                    placeholder="WiFi Name"
                    />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">{zh.wifiPass}</label>
                <div className="relative">
                    <Lock size={20} strokeWidth={2.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                    type="text"
                    value={formData.wifiPass}
                    onChange={(e) => setFormData({ ...formData, wifiPass: e.target.value })}
                    className="w-full p-4 pl-12 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm transition-all font-bold"
                    placeholder="WiFi Password"
                    />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'album' && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="text-xs text-slate-500 font-bold bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-2">
                <ImageIcon size={18} strokeWidth={2.5} className="shrink-0 text-amber-500 mt-0.5" />
                <p className="leading-relaxed">{zh.albumDesc}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                 {formData.albumImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded-2xl overflow-hidden border border-slate-100 aspect-[4/3] shadow-sm bg-white">
                        <img src={img} alt="album" className="w-full h-full object-cover" />
                        <button 
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-md"
                        >
                            <Trash2 size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                 ))}
                 <button 
                    onClick={handleAddImage}
                    className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-2xl aspect-[4/3] text-slate-400 hover:border-rose-400 hover:text-rose-500 hover:bg-rose-50 transition-all bg-white"
                 >
                    <Upload size={28} strokeWidth={2.5} />
                    <span className="text-xs font-black">{zh.uploadImage}</span>
                 </button>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div className="text-xs text-slate-500 font-bold bg-green-50 p-4 rounded-2xl border border-green-100 flex gap-2">
                <CreditCard size={18} strokeWidth={2.5} className="shrink-0 text-green-500 mt-0.5" />
                <p className="leading-relaxed">{zh.paymentDesc}</p>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">{zh.alipayMerchantId}</label>
                <input
                  type="text"
                  value={formData.alipayMerchantId || ''}
                  onChange={(e) => setFormData({ ...formData, alipayMerchantId: e.target.value })}
                  className="w-full p-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm font-mono text-sm font-medium"
                  placeholder="e.g. 2088..."
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">{zh.wechatMerchantId}</label>
                <input
                  type="text"
                  value={formData.wechatMerchantId || ''}
                  onChange={(e) => setFormData({ ...formData, wechatMerchantId: e.target.value })}
                  className="w-full p-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm font-mono text-sm font-medium"
                  placeholder="e.g. 1500..."
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
             <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
               <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">{zh.newPin}</label>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm font-mono text-3xl font-bold tracking-[0.5em] text-center"
                    placeholder="8888"
                  />
               </div>
             </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-white rounded-b-[2.5rem]">
          <button 
            onClick={handleSave}
            className="w-full bg-slate-900 text-white rounded-[1.5rem] py-4 font-black flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg"
          >
            <Save size={20} strokeWidth={2.5} /> 
            <span>{zh.saveChanges}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default MerchantSettingsModal;
