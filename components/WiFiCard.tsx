
import React, { useState } from 'react';
import { Wifi, Copy, Check, Lock } from 'lucide-react';
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
      className="bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-50 cursor-pointer transition-all group relative overflow-hidden active:scale-[0.99]"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -mr-6 -mt-6 opacity-60 group-hover:scale-110 transition-transform duration-500"></div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <Wifi size={28} strokeWidth={3} />
          </div>
          
          <div>
            <div className="flex items-baseline gap-2 mb-1">
                 <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{zh.wifiLabel}</span>
                 <span className="text-[10px] text-slate-300 font-bold">{en.wifiLabel}</span>
            </div>
            
            <div className="text-xl font-black text-slate-800 leading-none">
              {config.wifiSsid || zh.wifiConfigured}
            </div>
            
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${showPass ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <div className="pt-2 flex items-center gap-2">
                         <Lock size={14} strokeWidth={2.5} className="text-slate-300" />
                         <span className="font-mono text-sm font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg">{config.wifiPass}</span>
                         <button 
                            onClick={(e) => handleCopy(e, config.wifiPass)}
                            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-300 hover:text-rose-500 transition-colors"
                        >
                            {copied ? <Check size={16} strokeWidth={3} className="text-green-500" /> : <Copy size={16} strokeWidth={2.5} />}
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-center">
             {!showPass && (
                 <div className="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full group-hover:bg-rose-100 transition-colors">
                    {zh.tapConnect}
                 </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default WiFiCard;
