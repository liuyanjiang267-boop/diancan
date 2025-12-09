
import React, { useState, useMemo, useRef } from 'react';
import { Camera, Image as ImageIcon, MessageCircle, CreditCard, Settings, ChefHat, LogOut, Loader2, Globe, ScanLine, Sparkles, Heart } from 'lucide-react';
import { MenuItem, MerchantConfig, TargetLanguage } from './types';
import { MOCK_MENU_ITEMS, DEFAULT_ALBUM_IMAGES, TARGET_LANGUAGES } from './constants';
import { t } from './translations';
import WiFiCard from './components/WiFiCard';
import MenuListItem from './components/MenuListItem';
import CommModal from './components/CommModal';
import PayModal from './components/PayModal';
import LoginModal from './components/LoginModal';
import MerchantSettingsModal from './components/MerchantSettingsModal';
import AlbumModal from './components/AlbumModal';

const App: React.FC = () => {
  // --- State ---
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isScanning, setIsScanning] = useState(false);
  const [targetLang, setTargetLang] = useState<TargetLanguage>('en');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Auth & Settings State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modals, setModals] = useState({
    comm: false,
    pay: false,
    login: false,
    settings: false,
    album: false
  });

  const [config, setConfig] = useState<MerchantConfig>({
    storeName: "Tasty Dragon Bistro",
    wifiSsid: "Guest_888",
    wifiPass: "12345678",
    currencySymbol: "¥",
    alipayMerchantId: "",
    wechatMerchantId: "",
    albumImages: DEFAULT_ALBUM_IMAGES,
    password: "8888"
  });

  // --- Handlers ---
  const handleScanClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setItems([]); 
    
    // Simulating API delay
    setTimeout(() => {
      setItems(MOCK_MENU_ITEMS);
      setIsScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 2000);
  };

  const handleToggleSelection = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleSettingsClick = () => {
    if (isLoggedIn) {
      setModals(m => ({ ...m, settings: true }));
    } else {
      setModals(m => ({ ...m, login: true }));
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setModals(m => ({ ...m, login: false, settings: true }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setModals(m => ({ ...m, settings: false }));
  };

  const updateConfig = (newConfig: MerchantConfig) => {
    setConfig(newConfig);
  };

  // --- Derived State ---
  const selectedItems = useMemo(() => {
    return items.filter(i => selectedIds.has(i.id));
  }, [items, selectedIds]);

  const totalAmount = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
  }, [selectedItems]);

  const hasSelection = selectedIds.size > 0;
  
  const zh = t.zh;
  const en = t.en;

  return (
    <div className="flex flex-col h-screen bg-[#FDFDFD] text-gray-900 font-sans max-w-lg mx-auto shadow-2xl relative">
      
      {/* Hidden Input for Camera/File */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {/* Header - XHS Style: Clean, Minimal */}
      <div className="bg-white/90 backdrop-blur-md px-5 py-3 flex justify-between items-center sticky top-0 z-30">
        <div>
          <h1 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
             <span className="text-rose-500"><Sparkles size={24} strokeWidth={3} fill="currentColor" className="text-rose-200" /></span>
             {zh.appTitle}
          </h1>
          <p className="text-xs text-slate-400 font-bold ml-8 truncate max-w-[200px]">{config.storeName}</p>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={handleSettingsClick}
                className={`p-2 rounded-full transition-all ${isLoggedIn ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400 hover:text-slate-600'}`}
            >
                <Settings size={24} strokeWidth={2.5} />
            </button>
            {isLoggedIn && (
               <button onClick={handleLogout} className="p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-colors">
                  <LogOut size={24} strokeWidth={2.5} />
               </button>
            )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-36">
        
        {/* Hero Actions - XHS Style: Bold Cards */}
        <div className="p-5 grid grid-cols-2 gap-4">
            <button 
                onClick={handleScanClick}
                disabled={isScanning}
                className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 bg-[#FF2442] text-white py-6 px-4 rounded-[2rem] shadow-xl shadow-rose-200 active:scale-[0.98] transition-all disabled:opacity-80 disabled:scale-100"
            >
                <div className="bg-white/20 p-3.5 rounded-full backdrop-blur-md relative z-10">
                    {isScanning ? <Loader2 size={32} className="animate-spin" strokeWidth={3} /> : <Camera size={32} strokeWidth={2.5} />}
                </div>
                <div className="text-center relative z-10 mt-1">
                    <span className="block text-lg font-black leading-none mb-1">{isScanning ? zh.analyzing : zh.scanMenu}</span>
                    <span className="block text-[10px] font-bold opacity-80 uppercase tracking-wide">{isScanning ? en.analyzing : en.scanMenu}</span>
                </div>
            </button>
            
            <button 
                onClick={() => setModals(m => ({ ...m, album: true }))}
                className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 bg-white text-slate-700 py-6 px-4 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-50 active:scale-[0.98] transition-all"
            >
                <div className="bg-amber-50 text-amber-500 p-3.5 rounded-full relative z-10">
                    <ImageIcon size={32} strokeWidth={2.5} />
                </div>
                <div className="text-center relative z-10 mt-1">
                    <span className="block text-lg font-black leading-none mb-1 text-slate-800">{zh.merchantAlbum}</span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">{en.merchantAlbum}</span>
                </div>
            </button>
        </div>

        {/* WiFi Widget */}
        <div className="px-5 pb-2">
             <WiFiCard config={config} />
        </div>

        {/* List Header - XHS Style: Pill Shapes */}
        <div className="px-5 py-4 bg-transparent sticky top-0 z-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="bg-rose-500 w-1 h-4 rounded-full"></span>
                <h2 className="text-base font-black text-slate-800">
                    {zh.detectedItems}
                </h2>
            </div>

            <div className="flex items-center gap-3">
                {hasSelection && (
                    <button 
                        onClick={clearSelection}
                        className="text-xs font-black text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full active:bg-rose-100 transition-colors"
                    >
                        {zh.clearAll}
                    </button>
                )}
                
                <div className="relative group">
                    <div className="flex items-center gap-2 bg-white border border-slate-100 shadow-sm rounded-full px-3 py-1.5 transition-colors cursor-pointer">
                        <Globe size={14} className="text-slate-400" strokeWidth={2.5} />
                        <select 
                            value={targetLang}
                            onChange={(e) => setTargetLang(e.target.value as TargetLanguage)}
                            className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none cursor-pointer appearance-none pr-4"
                        >
                            {TARGET_LANGUAGES.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.flag} {lang.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2 pointer-events-none text-slate-300">
                             <span className="text-[8px]">▼</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Items List */}
        <div className="px-5 pb-4 min-h-[300px]">
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center pt-8 pb-20 text-center">
                    <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-6 relative">
                         <div className="absolute inset-0 bg-slate-100 rounded-full scale-110 opacity-50"></div>
                         <ChefHat size={48} className="text-slate-300" strokeWidth={1.5} />
                    </div>
                    <p className="text-xl font-black text-slate-800 mb-2">{zh.readyToOrder}</p>
                    <p className="text-sm font-medium text-slate-400 mb-8 max-w-[200px] leading-relaxed">{en.readyToOrder}</p>
                    
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 px-5 py-3 rounded-full border border-slate-100">
                        <Camera size={16} strokeWidth={2.5} />
                        <span>{zh.tapToScan}</span>
                    </div>
                </div>
            ) : (
                <div className="grid gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {items.map(item => (
                        <MenuListItem 
                            key={item.id} 
                            item={item} 
                            isSelected={selectedIds.has(item.id)}
                            toggleSelection={handleToggleSelection}
                            currencySymbol={config.currencySymbol}
                        />
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* Floating Bottom Dock - XHS Style: Rounded, colorful */}
      <div className="absolute bottom-8 left-6 right-6 z-40">
        <div className="flex gap-4 p-2.5 bg-white/95 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] ring-1 ring-slate-900/5">
            <button
                onClick={() => setModals(m => ({ ...m, comm: true }))}
                disabled={!hasSelection}
                className={`
                    flex-1 h-16 rounded-[2rem] flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group
                    ${hasSelection 
                        ? 'bg-amber-300 text-slate-900 shadow-lg shadow-amber-200' 
                        : 'bg-slate-100 text-slate-400' 
                    }
                `}
            >
                {hasSelection && (
                    <span className="absolute top-2 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-amber-500 text-[10px] font-black shadow-sm">
                        {selectedIds.size}
                    </span>
                )}
                <MessageCircle size={24} strokeWidth={3} className={hasSelection ? 'fill-current' : ''} />
                <div className="flex flex-col items-start leading-none">
                     <span className="font-black text-sm">{zh.communicate}</span>
                     <span className="text-[10px] font-bold opacity-60 uppercase">{en.communicate}</span>
                </div>
            </button>

            <button
                onClick={() => setModals(m => ({ ...m, pay: true }))}
                className="flex-1 h-16 bg-[#FF2442] text-white rounded-[2rem] flex items-center justify-center gap-3 shadow-lg shadow-rose-200 active:scale-[0.98] transition-all group"
            >
                <CreditCard size={24} strokeWidth={3} className="fill-white/20" />
                <div className="flex flex-col items-start leading-none">
                     <span className="font-black text-sm">{zh.payBill}</span>
                     <span className="text-[10px] font-bold opacity-80 uppercase">{en.payBill}</span>
                </div>
            </button>
        </div>
      </div>

      {/* Modals */}
      <CommModal 
        isOpen={modals.comm} 
        onClose={() => setModals(m => ({ ...m, comm: false }))} 
        selectedItems={selectedItems}
      />
      
      <PayModal 
        isOpen={modals.pay} 
        onClose={() => setModals(m => ({ ...m, pay: false }))} 
        totalAmount={totalAmount}
        config={config}
      />

      <LoginModal 
        isOpen={modals.login}
        onClose={() => setModals(m => ({ ...m, login: false }))}
        onLoginSuccess={handleLoginSuccess}
        correctPassword={config.password}
      />

      <MerchantSettingsModal
        isOpen={modals.settings}
        onClose={() => setModals(m => ({ ...m, settings: false }))}
        config={config}
        onSave={updateConfig}
      />

      <AlbumModal
        isOpen={modals.album}
        onClose={() => setModals(m => ({ ...m, album: false }))}
        images={config.albumImages}
      />

    </div>
  );
};

export default App;
