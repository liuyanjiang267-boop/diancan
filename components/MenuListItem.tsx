
import React from 'react';
import { Check } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuListItemProps {
  item: MenuItem;
  isSelected: boolean;
  toggleSelection: (id: number) => void;
  currencySymbol: string;
}

const MenuListItem: React.FC<MenuListItemProps> = ({ item, isSelected, toggleSelection, currencySymbol }) => {
  return (
    <div
      onClick={() => toggleSelection(item.id)}
      className={`
        relative overflow-hidden rounded-[1.5rem] p-4 cursor-pointer transition-all duration-300 border
        ${isSelected 
          ? 'bg-[#FFF0F2] border-[#FF2442] shadow-sm' 
          : 'bg-white border-slate-50 hover:border-rose-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox Visual - Bubbly Style */}
        <div 
          className={`
            w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-1 transition-all duration-300
            ${isSelected 
                ? 'bg-[#FF2442] border-[#FF2442] shadow-md shadow-rose-200' 
                : 'bg-white border-slate-200 group-hover:border-rose-300'
            }
          `}
        >
          <Check size={16} strokeWidth={4} className={`text-white transition-transform duration-300 ${isSelected ? 'scale-100' : 'scale-0'}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-3">
            <h3 className={`text-[17px] font-black leading-tight transition-colors ${isSelected ? 'text-[#FF2442]' : 'text-slate-800'}`}>
                {item.orig}
            </h3>
            <span className={`font-black whitespace-nowrap text-lg px-2 rounded-lg ${isSelected ? 'text-[#FF2442]' : 'text-slate-800'}`}>
              <span className="text-xs align-top mr-0.5 opacity-60 font-bold">{currencySymbol}</span>
              {item.price}
            </span>
          </div>
          <p className={`text-sm mt-1.5 font-bold leading-relaxed transition-colors ${isSelected ? 'text-rose-400' : 'text-slate-400'}`}>
            {item.trans}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuListItem;
