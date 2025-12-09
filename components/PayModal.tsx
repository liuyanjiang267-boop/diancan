
import React, { useState, useEffect } from 'react';
import { MerchantConfig } from '../types';
import { X, Smartphone, Landmark, Banknote, Sparkles, CreditCard } from 'lucide-react';
import { t } from '../translations';

interface PayModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  config: MerchantConfig;
}

const PayModal: React.FC<PayModalProps> = ({ isOpen, onClose, totalAmount, config }) => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [activeMethod, setActiveMethod] = useState<'scan' | 'online' | 'alipay' | 'wechat'>('scan');
  // Sub-method for Online Payment: 'sichuan' or 'boc'
  const [subMethod, setSubMethod] = useState<'sichuan' | 'boc'>('sichuan');
  
  const [sichuanDiscount, setSichuanDiscount] = useState<number>(0);
  const [bocDiscount, setBocDiscount] = useState<number>(0);
  
  const zh = t.zh;
  const en = t.en;
  
  useEffect(() => {
    if (isOpen) {
      setCustomAmount(totalAmount > 0 ? totalAmount.toFixed(2) : '');
      setActiveMethod('scan');
      setSubMethod('sichuan');
      setSichuanDiscount(0);
      setBocDiscount(0);
    }
  }, [isOpen, totalAmount]);

  // Handle Logic for Discounts
  useEffect(() => {
    const currentTotal = parseFloat(customAmount) || 0;

    if (activeMethod === 'online') {
        if (subMethod === 'sichuan') {
            // Sichuan: Random discount between 0 and 40
            setBocDiscount(0);
            if (currentTotal > 0) {
                const maxDiscount = Math.min(40, currentTotal);
                // Use a seeded-like randomness based on amount so it doesn't jump wildly on every re-render unless intended
                // For demo, standard random is fine, but lets limit updates. 
                // Actually, to simulate "random reduction" triggered by system, we generate it once per switching to this method.
                // However, here we just regen if amount changes.
                if (sichuanDiscount === 0 || sichuanDiscount > maxDiscount) { 
                    const randomDisc = Math.random() * maxDiscount;
                    const roundedDisc = Math.floor(randomDisc * 100) / 100;
                    const finalDisc = Math.max(0.01, roundedDisc); 
                    setSichuanDiscount(finalDisc);
                }
            } else {
                setSichuanDiscount(0);
            }
        } else if (subMethod === 'boc') {
            // BOC: 500-100, 200-50
            setSichuanDiscount(0);
            if (currentTotal >= 500) {
                setBocDiscount(100);
            } else if (currentTotal >= 200) {
                setBocDiscount(50);
            } else {
                setBocDiscount(0);
            }
        }
    } else {
        setSichuanDiscount(0);
        setBocDiscount(0);
    }
  }, [activeMethod, subMethod, customAmount]);

  // Reset Sichuan discount trigger when switching sub-methods to give fresh random feeling
  const handleSubMethodChange = (method: 'sichuan' | 'boc') => {
      setSubMethod(method);
      if (method === 'sichuan') setSichuanDiscount(0); // Reset to trigger new random
  };

  if (!isOpen) return null;

  const getQrUrl = (type: 'alipay' | 'wechat', id: string, amount: string) => {
    const data = `${type}://pay?merchantId=${id}&amount=${amount || '0'}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`;
  };

  const currentVal = parseFloat(customAmount) || 0;
  const isOnline = activeMethod === 'online';
  
  // Calculate final discount based on active sub-method
  let activeDiscount = 0;
  if (isOnline) {
      if (subMethod === 'sichuan') activeDiscount = sichuanDiscount;
      if (subMethod === 'boc') activeDiscount = bocDiscount;
  }
  
  const finalAmount = Math.max(0, currentVal - activeDiscount);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full sm:max-w-sm bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden slide-in-from-bottom duration-300 max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex justify-between items-start">
             <div>
                <h3 className="text-2xl font-black text-slate-900">{zh.payment}</h3>
                <p className="text-slate-400 text-xs font-bold">{en.payment}</p>
             </div>
             <button onClick={onClose} className="p-2.5 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100">
                 <X size={24} strokeWidth={3} />
             </button>
        </div>
        
        {/* Amount Input */}
        <div className="px-6 py-6">
            <div className={`rounded-[2rem] p-8 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${isOnline ? 'bg-orange-50' : 'bg-[#FFF0F2]'}`}>
                {/* Promo Badge inside amount box */}
                {isOnline && activeDiscount > 0 && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm animate-in fade-in">
                    -{config.currencySymbol}{activeDiscount.toFixed(2)}
                  </div>
                )}

                <span className={`text-xs font-black uppercase tracking-widest mb-2 transition-colors ${isOnline ? 'text-orange-400' : 'text-rose-400'}`}>
                  {isOnline ? zh.finalTotal : zh.totalDue}
                </span>
                
                <div className="flex items-baseline justify-center w-full">
                    <span className={`text-4xl font-black mr-2 self-center transition-colors ${isOnline ? 'text-orange-500' : 'text-rose-500'}`}>{config.currencySymbol}</span>
                    
                    {isOnline && activeDiscount > 0 ? (
                        <div className="flex items-baseline gap-3">
                             <span className="text-6xl font-black text-orange-500 animate-in zoom-in duration-300">{finalAmount.toFixed(2)}</span>
                             <span className="text-xl font-bold text-orange-300 line-through decoration-2">{currentVal.toFixed(2)}</span>
                        </div>
                    ) : (
                        <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="0.00"
                            className="bg-transparent text-6xl font-black text-rose-500 text-center w-full focus:outline-none placeholder:text-rose-200"
                            autoFocus
                        />
                    )}
                </div>
            </div>
        </div>

        {/* Payment Methods */}
        <div className="flex-1 bg-white p-6 overflow-y-auto no-scrollbar">
            
             <div className="flex gap-2 mb-6 bg-slate-50 p-1.5 rounded-[1.5rem] overflow-x-auto no-scrollbar">
                 <button 
                    onClick={() => setActiveMethod('scan')}
                    className={`flex-1 min-w-[80px] py-4 rounded-2xl flex flex-col items-center justify-center transition-all ${activeMethod === 'scan' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:bg-white/50'}`}
                 >
                    <Banknote size={20} strokeWidth={2.5} className="mb-1" />
                    <span className="text-[10px] font-black">{zh.cashOther}</span>
                 </button>

                 <button 
                    onClick={() => setActiveMethod('online')}
                    className={`flex-1 min-w-[80px] py-4 rounded-2xl flex flex-col items-center justify-center transition-all ${activeMethod === 'online' ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 'text-slate-400 hover:bg-white/50'}`}
                 >
                    <CreditCard size={20} strokeWidth={2.5} className="mb-1" />
                    <span className="text-[10px] font-black text-center leading-tight">{zh.onlinePayment}</span>
                 </button>

                 {config.alipayMerchantId && (
                    <button 
                        onClick={() => setActiveMethod('alipay')}
                        className={`flex-1 min-w-[80px] py-4 rounded-2xl flex flex-col items-center justify-center transition-all ${activeMethod === 'alipay' ? 'bg-[#1677FF] text-white shadow-md shadow-blue-200' : 'text-slate-400 hover:bg-white/50'}`}
                    >
                        <span className="text-xs font-black mb-0.5">支</span>
                        <span className="text-[10px] font-bold opacity-90">Alipay</span>
                    </button>
                 )}
                 {config.wechatMerchantId && (
                    <button 
                        onClick={() => setActiveMethod('wechat')}
                        className={`flex-1 min-w-[80px] py-4 rounded-2xl flex flex-col items-center justify-center transition-all ${activeMethod === 'wechat' ? 'bg-[#07C160] text-white shadow-md shadow-green-200' : 'text-slate-400 hover:bg-white/50'}`}
                    >
                        <span className="text-xs font-black mb-0.5">微</span>
                        <span className="text-[10px] font-bold opacity-90">WeChat</span>
                    </button>
                 )}
             </div>

            <div className="flex flex-col items-center justify-center min-h-[150px]">
                {/* 1. Alipay */}
                {activeMethod === 'alipay' && config.alipayMerchantId && (
                    <div className="animate-in zoom-in-95 duration-300 w-full flex flex-col items-center">
                        <div className="bg-[#1677FF] p-6 rounded-[2.5rem] shadow-xl shadow-blue-200 mb-4">
                            <div className="bg-white p-2 rounded-2xl">
                                <img 
                                    src={getQrUrl('alipay', config.alipayMerchantId, customAmount)} 
                                    alt="Alipay QR" 
                                    className="w-48 h-48 rounded-xl" 
                                />
                            </div>
                        </div>
                        <p className="text-[#1677FF] font-black text-sm bg-blue-50 px-4 py-2 rounded-full">{zh.scanAlipay}</p>
                    </div>
                )}

                {/* 2. WeChat */}
                {activeMethod === 'wechat' && config.wechatMerchantId && (
                    <div className="animate-in zoom-in-95 duration-300 w-full flex flex-col items-center">
                        <div className="bg-[#07C160] p-6 rounded-[2.5rem] shadow-xl shadow-green-200 mb-4">
                            <div className="bg-white p-2 rounded-2xl">
                                <img 
                                    src={getQrUrl('wechat', config.wechatMerchantId, customAmount)} 
                                    alt="WeChat Pay QR" 
                                    className="w-48 h-48 rounded-xl" 
                                />
                            </div>
                        </div>
                        <p className="text-[#07C160] font-black text-sm bg-green-50 px-4 py-2 rounded-full">{zh.scanWechat}</p>
                    </div>
                )}

                {/* 3. Online Payment (Sichuan / BOC) */}
                {activeMethod === 'online' && (
                    <div className="w-full space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                        
                        {/* Bank Selectors */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleSubMethodChange('sichuan')}
                                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${subMethod === 'sichuan' ? 'border-orange-400 bg-orange-50 text-orange-600' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                            >
                                <Landmark size={24} className={subMethod === 'sichuan' ? 'text-orange-500' : 'text-slate-300'} />
                                <span className="text-xs font-black">{zh.sichuanBank}</span>
                            </button>
                            <button
                                onClick={() => handleSubMethodChange('boc')}
                                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${subMethod === 'boc' ? 'border-red-400 bg-red-50 text-red-600' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                            >
                                <CreditCard size={24} className={subMethod === 'boc' ? 'text-red-500' : 'text-slate-300'} />
                                <span className="text-xs font-black">{zh.bocBank}</span>
                            </button>
                        </div>

                        {/* Promo Banner */}
                        <div className={`text-white p-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold shadow-lg transition-colors duration-300 ${subMethod === 'sichuan' ? 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-orange-200' : 'bg-gradient-to-r from-red-500 to-rose-500 shadow-red-200'}`}>
                             <Sparkles size={16} fill="currentColor" className="text-yellow-200 animate-pulse" />
                             {subMethod === 'sichuan' ? zh.promoSichuan : zh.promoBoc}
                        </div>

                        {/* Discount Display */}
                        <div className={`flex justify-between items-center p-4 rounded-2xl border transition-colors ${subMethod === 'sichuan' ? 'bg-orange-50 border-orange-100' : 'bg-red-50 border-red-100'}`}>
                            <span className="text-slate-500 font-bold text-xs">
                                {subMethod === 'sichuan' ? zh.randomReduction : zh.bankDiscount}
                            </span>
                            <span className={`font-black text-lg ${subMethod === 'sichuan' ? 'text-orange-500' : 'text-red-500'}`}>
                                -{config.currencySymbol}{activeDiscount.toFixed(2)}
                            </span>
                        </div>

                        <button 
                            className={`w-full text-white font-black py-5 rounded-[2rem] text-lg shadow-xl active:scale-[0.98] transition-all flex flex-col items-center justify-center mt-2 ${subMethod === 'sichuan' ? 'bg-orange-500 shadow-orange-200' : 'bg-red-600 shadow-red-200'}`}
                            onClick={() => alert(`Processing Online Payment (${subMethod}): ${config.currencySymbol}${finalAmount}`)}
                        >
                            <span>{zh.confirmOnline}</span>
                            <span className="text-xs opacity-80 font-bold">
                                {config.currencySymbol}{currentVal} ➔ {config.currencySymbol}{finalAmount}
                            </span>
                        </button>
                    </div>
                )}

                {/* 4. Cash / Scan */}
                {activeMethod === 'scan' && (
                    <div className="w-full space-y-4 animate-in fade-in duration-300">
                        <div className="text-center text-slate-400 py-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 border-dashed">
                            <Smartphone size={48} strokeWidth={1.5} className="mx-auto mb-3 opacity-30" />
                            <p className="font-bold text-slate-500 text-sm">{zh.noPaymentLink}</p>
                            <p className="text-xs mt-1 font-medium">{en.proceedCounter}</p>
                        </div>
                        <button 
                            className="w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] text-lg shadow-xl shadow-slate-200 active:scale-[0.98] transition-all flex flex-col items-center justify-center"
                            onClick={() => alert(`Payment recorded for ${config.currencySymbol}${customAmount}`)}
                        >
                            <span>{zh.confirmCash}</span>
                            <span className="text-xs opacity-80 font-bold">{en.confirmCash}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PayModal;
