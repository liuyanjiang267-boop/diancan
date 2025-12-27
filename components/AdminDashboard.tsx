
import React from 'react';
import { X, Settings, LogOut } from 'lucide-react';
import { MerchantConfig } from '../types';
import { t } from '../translations';
import MerchantSettingsModal from './MerchantSettingsModal';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  config: MerchantConfig;
  onUpdateConfig: (cfg: MerchantConfig) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  isOpen, onClose, 
  config, onUpdateConfig
}) => {
  const zh = t.zh;
  const en = t.en;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 animate-in fade-in duration-200">
      <div className="w-full h-full max-w-5xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden md:rounded-[2rem] md:m-10 border border-gray-100">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 text-gray-800 flex flex-col shrink-0">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-black text-gray-900 brand-font">{zh.adminDashboard}</h2>
            <p className="text-[10px] text-[#FF2442] font-black mt-1 truncate uppercase">{config.storeName}</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FF2442] text-white shadow-lg shadow-rose-100 transition-all">
              <Settings size={20} />
              <span className="font-bold">{zh.tabConfig}</span>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-100">
             <button onClick={onClose} className="w-full py-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-[#FF2442] hover:border-rose-200 font-bold flex items-center justify-center gap-2 transition-all">
                <LogOut size={18} /> {zh.close}
             </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white overflow-hidden flex flex-col relative">
            
            {/* Header Mobile Only */}
            <div className="md:hidden bg-white p-4 flex justify-between items-center shadow-sm z-10">
                <span className="font-black text-gray-800">{zh.tabConfig}</span>
                <button onClick={onClose} className="p-2 bg-rose-50 rounded-full text-[#FF2442]"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="h-full flex justify-center p-4 md:p-8">
                    <div className="w-full max-w-2xl">
                            <MerchantSettingsModal 
                            isOpen={true}
                            onClose={() => {}}
                            config={config}
                            onSave={onUpdateConfig}
                            embedded={true}
                            />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
