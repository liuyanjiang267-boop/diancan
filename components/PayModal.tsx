
import React, { useState, useEffect } from 'react';
import { MerchantConfig } from '../types';
import { QrCode, X, Smartphone, CreditCard } from 'lucide-react';
import { t } from '../translations';

interface PayModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  config: MerchantConfig;
}

const PayModal: React.FC<PayModalProps> = ({ isOpen, onClose, totalAmount, config }) => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [activeMethod, setActiveMethod] = useState<'scan' | 'alipay' | 'wechat'>('scan');
  const zh = t.zh;
  const en = t.en;
  
  useEffect(() => {
    if (isOpen) {
      setCustomAmount(totalAmount > 0 ? totalAmount.toFixed(2) : '');
      setActiveMethod('scan');
    }
  }, [isOpen, totalAmount]);

  if (!isOpen) return null;

  const getQrUrl = (type: 'alipay' | 'wechat', id: string, amount: string) => {
    const data = `${type}://pay?merchantId=${id}&amount=${amount || '0'}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`;
  };

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
            <div className="bg-[#FFF0F2] rounded-[2rem] p-8 flex flex-col items-center justify-center">
                <span className="text-xs font-black text-rose-400 uppercase tracking-widest mb-2">{zh.totalDue}</span>
                <div className="flex items-baseline justify-center w-full">
                    <span className="text-4xl font-black text-rose-500 mr-2 self-center">{config.currencySymbol}</span>
                    <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="0.00"
                        className="bg-transparent text-6xl font-black text-rose-500 text-center w-full focus:outline-none placeholder:text-rose-200"
                        autoFocus
                    />
                </div>
            </div>
        </div>

        {/* Payment Methods */}
        <div className="flex-1 bg-white p-6 overflow-y-auto">
            
            {(config.alipayMerchantId || config.wechatMerchantId) && (
                 <div className="flex gap-3 mb-8 bg-slate-50 p-2 rounded-[1.5rem]">
                     <button 
                        onClick={() => setActiveMethod('scan')}
                        className={`flex-1 py-4 rounded-2xl flex flex-col items-center justify-center transition-all ${activeMethod === 'scan' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:bg-white/50'}`}
                     >
                        <CreditCard size={20} strokeWidth={2.5} className="mb-1" />
                        <span className="text-[10px] font-black">{zh.cashOther}</span>
                     </button>
                     {config.alipayMerchantId && (
                        <button 
                            onClick={() => setActiveMethod('alipay')}
                            className={`flex-1 py-4 rounded-2xl flex flex-col items-center justify-center transition-all ${activeMethod === 'alipay' ? 'bg-[#1677FF] text-white shadow-md shadow-blue-200' : 'text-slate-400 hover:bg-white/50'}`}
                        >
                            <span className="text-xs font-black mb-0.5">支</span>
                            <span className="text-[10px] font-bold opacity-90">Alipay</span>
                        </button>
                     )}
                     {config.wechatMerchantId && (
                        <button 
                            onClick={() => setActiveMethod('wechat')}
                            className={`flex-1 py-4 rounded-2xl flex flex-col items-center justify-center transition-all ${activeMethod === 'wechat' ? 'bg-[#07C160] text-white shadow-md shadow-green-200' : 'text-slate-400 hover:bg-white/50'}`}
                        >
                            <span className="text-xs font-black mb-0.5">微</span>
                            <span className="text-[10px] font-bold opacity-90">WeChat</span>
                        </button>
                     )}
                 </div>
            )}

            <div className="flex flex-col items-center justify-center min-h-[200px]">
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

                {activeMethod === 'scan' && (
                    <div className="w-full space-y-4 animate-in fade-in duration-300">
                        <div className="text-center text-slate-400 py-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 border-dashed">
                            <Smartphone size={48} strokeWidth={1.5} className="mx-auto mb-3 opacity-30" />
                            <p className="font-bold text-slate-500 text-sm">{zh.noPaymentLink}</p>
                            <p className="text-xs mt-1 font-medium">{en.proceedCounter}</p>
                        </div>
                        <button 
                            className="w-full bg-[#FF2442] text-white font-black py-5 rounded-[2rem] text-lg shadow-xl shadow-rose-200 active:scale-[0.98] transition-all flex flex-col items-center justify-center"
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
