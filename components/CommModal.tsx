
import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, X, MessageSquare, Sparkles } from 'lucide-react';
import { MenuItem, QuickCard } from '../types';
import { QUICK_CARDS } from '../constants';
import { t } from '../translations';

interface CommModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: MenuItem[];
}

const CommModal: React.FC<CommModalProps> = ({ isOpen, onClose, selectedItems }) => {
  const [activeCard, setActiveCard] = useState<QuickCard | null>(null);
  const zh = t.zh;
  const en = t.en;

  useEffect(() => {
    if (!isOpen) setActiveCard(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSpeak = () => {
    const text = activeCard ? activeCard.subLabel : "Please help me order these items.";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 bg-white flex justify-between items-center z-10">
            <div>
                <h2 className="text-xl font-black text-slate-900">{zh.showToWaiter}</h2>
                <div className="flex items-center gap-2">
                     <span className="text-xs text-slate-400 font-bold">{en.showToWaiter}</span>
                </div>
            </div>
            <button onClick={onClose} className="p-2.5 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 transition-colors">
                <X size={24} strokeWidth={3} />
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-2 no-scrollbar">
          
          {activeCard ? (
            // Big Card View
            <div 
              onClick={() => setActiveCard(null)}
              className="w-full bg-amber-50 border-2 border-amber-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center cursor-pointer animate-in zoom-in-95 duration-200 min-h-[300px] relative group"
            >
              <div className="text-8xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{activeCard.icon}</div>
              <div className="text-3xl font-black text-slate-800 mb-2">{activeCard.label}</div>
              <div className="text-xl text-slate-500 font-bold">{activeCard.subLabel}</div>
              
              <div className="mt-8 bg-white text-amber-500 px-5 py-3 rounded-full text-sm font-black flex items-center gap-2 shadow-sm">
                <RotateCcw size={18} strokeWidth={3} /> 
                <span>{zh.tapReturn}</span>
              </div>
            </div>
          ) : (
            // List View
            <div className="bg-slate-50 rounded-[2rem] p-5 min-h-[140px]">
              {selectedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 py-8">
                  <MessageSquare size={56} strokeWidth={1.5} className="mb-3 opacity-30" />
                  <p className="font-black text-slate-400 text-lg">{zh.noItems}</p>
                  <p className="text-xs text-slate-400 font-bold mt-1">{en.noItems}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm">
                      <span className="font-black text-lg text-slate-800">{item.orig}</span>
                      <span className="text-sm text-slate-500 font-bold bg-slate-50 px-2 py-1 rounded-lg">{item.trans}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Actions Grid */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-amber-400 fill-current" />
                <div className="text-sm font-black text-slate-800">{zh.quickRequest}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pb-4">
              {QUICK_CARDS.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCard(card)}
                  className="flex items-center gap-3 bg-white hover:bg-amber-50 border border-slate-100 hover:border-amber-200 active:scale-95 transition-all p-4 rounded-[1.5rem] text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">{card.icon}</span>
                  <div>
                    <div className="font-black text-slate-800 text-sm leading-tight">{card.label}</div>
                    <div className="text-[10px] text-slate-400 font-bold leading-tight mt-1">{card.subLabel}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-white border-t border-slate-50">
          <button 
            onClick={handleSpeak}
            className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-[2rem] py-4 flex flex-col items-center justify-center active:scale-[0.98] transition-all shadow-lg shadow-amber-200 group"
          >
            <div className="flex items-center gap-2">
                <Volume2 size={24} strokeWidth={3} className="group-active:animate-pulse" /> 
                <span className="font-black text-lg">{zh.speak}</span>
            </div>
            <span className="text-xs opacity-90 font-bold">{en.speak}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default CommModal;
