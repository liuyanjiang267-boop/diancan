
import React, { useState } from 'react';
import { Wifi, Copy, Check, Lock, ChevronRight } from 'lucide-react';
import { MerchantConfig } from '../types';
import { t } from '../translations';

interface WiFiCardProps {
  config: MerchantConfig;
}

const WiFiCard: React.FC<WiFiCardProps> = ({ config }) => {
  const [showPass, setShowPass] = useState(false);
  const [copied, setCopied] = useState(false);
  const zh = t.zh;
  const en = t.en;

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={() => setShowPass(!showPass)}
      className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 cursor-pointer transition-all group relative overflow-hidden active:scale-[0.98]"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -mr-10 -mt-10 opacity-40 group-hover:scale-110 transition-transform duration-700"></div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[1.8rem] bg-[#FF2442] text-white flex items-center justify-center shadow-lg shadow-rose-100">
            <Wifi size={28} strokeWidth={2.5} />
          </div>
          
          <div>
            <div className="flex items-baseline gap-2 mb-1.5">
                 <span className="text-[10px] font-black text-[#FF2442] bg-rose-50 px-2 py-0.5 rounded-md uppercase tracking-widest">{zh.wifiLabel}</span>
            </div>
            
            <div className="text-xl font-black text-gray-800 leading-none">
              {config.wifiSsid || zh.wifiConfigured}
            </div>
            
            <div className={`grid transition-all duration-500 ease-in-out ${showPass ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="flex items-center gap-2 bg-rose-50/50 p-2 rounded-xl border border-rose-100">
                         <Lock size={14} className="text-rose-300" />
                         <span className="font-mono text-xs font-bold text-rose-700">{config.wifiPass}</span>
                         <button 
                            onClick={(e) => handleCopy(e, config.wifiPass)}
                            className="ml-auto p-1.5 hover:bg-white rounded-lg transition-colors"
                        >
                            {copied ? <Check size={14} className="text-[#FF2442]" strokeWidth={3} /> : <Copy size={14} className="text-rose-300" />}
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="shrink-0">
             {!showPass && (
                 <div className="bg-gray-50 p-2 rounded-full text-gray-200 group-hover:text-[#FF2442] transition-colors">
                    <ChevronRight size={24} strokeWidth={3} />
                 </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default WiFiCard;
