
import React, { useState, useMemo, useRef } from 'react';
import { Camera, Image as ImageIcon, MessageCircle, CreditCard, Settings, Loader2, Globe, Scan, Utensils } from 'lucide-react';
import { MenuItem, MerchantConfig, TargetLanguage } from './types';
import { DEFAULT_ALBUM_IMAGES, TARGET_LANGUAGES } from './constants';
import { t } from './translations';
import { scanMenuImage } from './services/geminiService';
import WiFiCard from './components/WiFiCard';
import MenuListItem from './components/MenuListItem';
import CommModal from './components/CommModal';
import PayModal from './components/PayModal';
import LoginModal from './components/LoginModal';
import AlbumModal from './components/AlbumModal';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isScanning, setIsScanning] = useState(false);
  const [targetLang, setTargetLang] = useState<TargetLanguage>('en');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  const [modals, setModals] = useState({
    comm: false,
    pay: false,
    login: false,
    album: false
  });

  const [config, setConfig] = useState<MerchantConfig>({
    storeName: "码上菜谱 · AI 智能点餐",
    wifiSsid: "Store_Free_WiFi",
    wifiPass: "88888888",
    currencySymbol: "¥",
    alipayMerchantId: "",
    wechatMerchantId: "",
    albumImages: DEFAULT_ALBUM_IMAGES,
    password: "8888",
    apiProxyUrl: "",
    useBuiltInProxy: true
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
    });
  };

  const handleScanClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsScanning(true);
    try {
      const base64 = await fileToBase64(file);
      const results = await scanMenuImage(
        base64, 
        targetLang, 
        config.currencySymbol,
        config.apiProxyUrl
      );
      if (results?.length > 0) {
        setItems(results);
        setSelectedIds(new Set());
      } else {
        alert("识别结果为空，请确保拍摄清晰且包含菜名。");
      }
    } catch (error) {
      console.error(error);
      alert("AI 引擎暂时无法连接。");
    } finally {
      setIsScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleToggleSelection = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const selectedItems = items.filter(i => selectedIds.has(i.id));
  const totalAmount = selectedItems.reduce((acc, i) => acc + (parseFloat(i.price) || 0), 0);
  const zh = t.zh;
  const en = t.en;

  const AppLogo = () => (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="bg-[#FF2442] p-1.5 rounded-xl shadow-lg shadow-rose-100 flex items-center justify-center">
          <Scan size={20} className="text-white" strokeWidth={3} />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
          <Utensils size={10} className="text-[#FF2442]" strokeWidth={3} />
        </div>
      </div>
      <h1 className="text-xl font-black tracking-tighter text-gray-800 flex items-baseline">
        码上<span className="text-[#FF2442]">菜谱</span>
      </h1>
    </div>
  );

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white text-gray-800 font-sans max-w-lg mx-auto shadow-2xl relative">
      {isScanning && (
        <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-lg flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-300">
          <div className="w-full max-w-[240px] aspect-[3/4] bg-white rounded-3xl border-4 border-rose-50 relative overflow-hidden shadow-2xl">
             <div className="scan-line"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                 <Loader2 size={40} className="text-[#FF2442] animate-spin opacity-40" strokeWidth={3} />
             </div>
          </div>
          <div className="mt-8 space-y-2">
            <h3 className="text-2xl font-black brand-font">{zh.analyzing}</h3>
            <p className="text-xs font-bold opacity-40 tracking-widest">{en.analyzing}</p>
          </div>
        </div>
      )}

      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />

      <header className="glass px-5 pt-[calc(var(--safe-top)+0.5rem)] pb-3 flex justify-between items-center sticky top-0 z-30">
        <AppLogo />
        <button 
          onClick={() => isLoggedIn ? setIsAdminOpen(true) : setModals(m => ({ ...m, login: true }))}
          className={`p-2.5 rounded-2xl transition-all ${isLoggedIn ? 'bg-rose-50 text-[#FF2442]' : 'bg-gray-50 text-gray-400'}`}
        >
          <Settings size={22} strokeWidth={2.5} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar overscroll-contain pb-40">
        <section className="px-5 pt-6 grid grid-cols-2 gap-4">
            <button 
                onClick={handleScanClick}
                className="group relative h-40 flex flex-col items-center justify-center gap-3 bg-[#FF2442] text-white rounded-[2.5rem] shadow-lg shadow-rose-100 active:scale-95 transition-all"
            >
                <div className="bg-white/20 p-4 rounded-3xl">
                    <Camera size={28} strokeWidth={2.5} />
                </div>
                <div className="text-center">
                    <span className="block text-base font-black leading-none mb-1">{zh.scanMenu}</span>
                    <span className="block text-[9px] font-bold opacity-60 uppercase tracking-widest">{en.scanMenu}</span>
                </div>
            </button>
            <button 
                onClick={() => setModals(m => ({ ...m, album: true }))}
                className="group h-40 flex flex-col items-center justify-center gap-3 bg-white text-gray-700 rounded-[2.5rem] shadow-sm border border-gray-100 active:scale-95 transition-all"
            >
                <div className="bg-rose-50 text-[#FF2442] p-4 rounded-3xl">
                    <ImageIcon size={28} strokeWidth={2.5} />
                </div>
                <div className="text-center">
                    <span className="block text-base font-black leading-none mb-1">{zh.merchantAlbum}</span>
                    <span className="block text-[9px] font-bold text-gray-300 uppercase tracking-widest">{en.merchantAlbum}</span>
                </div>
            </button>
        </section>

        <div className="px-5 mt-6">
             <WiFiCard config={config} />
        </div>

        <div className="px-5 pt-8 pb-4 flex items-center justify-between sticky top-[calc(var(--safe-top)+4.5rem)] bg-white/90 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-5 bg-[#FF2442] rounded-full"></div>
                <h2 className="text-lg font-black brand-font">{zh.detectedItems}</h2>
            </div>
            
            <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button onClick={() => { setItems([]); setSelectedIds(new Set()); }} className="text-xs font-black text-[#FF2442] bg-rose-50 px-3 py-2 rounded-xl">
                    {zh.clearAll}
                  </button>
                )}
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-2 py-1.5 flex items-center gap-1">
                    <Globe size={14} className="text-gray-400" />
                    <select 
                      value={targetLang} 
                      onChange={(e) => setTargetLang(e.target.value as TargetLanguage)}
                      className="bg-transparent text-[10px] font-black text-gray-600 outline-none"
                    >
                      {TARGET_LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
                    </select>
                </div>
            </div>
        </div>

        <div className="px-5 pb-10 min-h-[40vh]">
            {items.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="text-7xl mb-6 opacity-80 animate-bounce">🥘</div>
                    <h3 className="text-lg font-black text-gray-800">{zh.readyToOrder}</h3>
                    <p className="text-xs font-bold text-gray-400 mt-1 max-w-[200px]">{en.readyToOrder}</p>
                </div>
            ) : (
                <div className="grid gap-3 animate-in fade-in slide-in-from-bottom-8 duration-500">
                    {items.map((item, idx) => (
                        <MenuListItem 
                            key={item.id} 
                            item={item} 
                            isSelected={selectedIds.has(item.id)}
                            toggleSelection={handleToggleSelection}
                            currencySymbol={config.currencySymbol}
                            style={{ animationDelay: `${idx * 50}ms` }}
                        />
                    ))}
                </div>
            )}
        </div>
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-40 px-6 pb-safe bg-gradient-to-t from-white via-white to-transparent pt-6">
        <div className="glass p-2 rounded-[3rem] shadow-[0_10px_40px_-10px_rgba(255,36,66,0.3)] flex gap-3 max-w-md mx-auto">
            <button
                onClick={() => setModals(m => ({ ...m, comm: true }))}
                className="flex-1 h-14 rounded-[2.2rem] flex items-center justify-center gap-3 bg-gray-50 text-gray-700 active:scale-95 transition-all relative overflow-hidden group border border-gray-100"
            >
                {selectedIds.size > 0 && <span className="absolute top-1.5 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF2442] text-white text-[9px] font-black">{selectedIds.size}</span>}
                <MessageCircle size={22} strokeWidth={3} className="text-[#FF2442]" />
                <div className="text-left">
                     <p className="font-black text-[11px] leading-none">{zh.communicate}</p>
                     <p className="text-[7px] font-bold opacity-40 uppercase mt-0.5">{en.communicate}</p>
                </div>
            </button>

            <button
                onClick={() => setModals(m => ({ ...m, pay: true }))}
                className="flex-1 h-14 rounded-[2.2rem] flex items-center justify-center gap-3 bg-[#FF2442] text-white shadow-lg active:scale-95 transition-all"
            >
                <CreditCard size={22} strokeWidth={3} />
                <div className="text-left">
                     <p className="font-black text-[11px] leading-none">{zh.payBill}</p>
                     <p className="text-[7px] font-bold opacity-80 uppercase mt-0.5">{en.payBill}</p>
                </div>
            </button>
        </div>
      </nav>

      <CommModal isOpen={modals.comm} onClose={() => setModals(m => ({ ...m, comm: false }))} selectedItems={selectedItems} />
      <PayModal isOpen={modals.pay} onClose={() => setModals(m => ({ ...m, pay: false }))} totalAmount={totalAmount} config={config} />
      <LoginModal isOpen={modals.login} onClose={() => setModals(m => ({ ...m, login: false }))} onLoginSuccess={() => { setIsLoggedIn(true); setModals(m => ({ ...m, login: false })); setIsAdminOpen(true); }} correctPassword={config.password} />
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} config={config} onUpdateConfig={setConfig} />
      <AlbumModal isOpen={modals.album} onClose={() => setModals(m => ({ ...m, album: false }))} images={config.albumImages} />
    </div>
  );
};

export default App;
