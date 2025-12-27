
import React from 'react';
import { Check } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuListItemProps {
  item: MenuItem;
  isSelected: boolean;
  toggleSelection: (id: number) => void;
  currencySymbol: string;
  style?: React.CSSProperties;
}

const MenuListItem: React.FC<MenuListItemProps> = ({ item, isSelected, toggleSelection, currencySymbol, style }) => {
  return (
    <div
      onClick={() => toggleSelection(item.id)}
      style={style}
      className={`
        relative overflow-hidden rounded-3xl p-5 cursor-pointer transition-all duration-400 border animate-in slide-in-from-bottom-4 fade-in fill-mode-both
        ${isSelected 
          ? 'bg-rose-50 border-[#FF2442] shadow-md -translate-y-0.5' 
          : 'bg-white border-gray-100 hover:border-rose-100 shadow-sm'
        }
      `}
    >
      <div className="flex items-center gap-5">
        <div 
          className={`
            w-8 h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300
            ${isSelected 
                ? 'bg-[#FF2442] border-[#FF2442] shadow-lg shadow-rose-100 rotate-0' 
                : 'bg-white border-gray-100 rotate-90'
            }
          `}
        >
          <Check size={18} strokeWidth={4} className={`text-white transition-all ${isSelected ? 'scale-100' : 'scale-0'}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className={`text-lg font-black leading-tight transition-colors ${isSelected ? 'text-[#FF2442]' : 'text-gray-800'}`}>
                {item.orig}
            </h3>
            <span className={`font-black text-xl flex items-baseline gap-0.5 ${isSelected ? 'text-[#FF2442]' : 'text-gray-800'}`}>
              <span className="text-[10px] uppercase font-bold opacity-30">{currencySymbol}</span>
              {item.price}
            </span>
          </div>
          <p className={`text-xs mt-1.5 font-bold leading-relaxed uppercase tracking-wide transition-colors ${isSelected ? 'text-rose-400' : 'text-gray-400'}`}>
            {item.trans}
          </p>
        </div>
      </div>
      
      {/* Subtle background decoration for selected state */}
      {isSelected && (
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF2442]/5 rounded-bl-full pointer-events-none"></div>
      )}
    </div>
  );
};

export default MenuListItem;
