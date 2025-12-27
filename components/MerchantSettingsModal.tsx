
import React, { useState } from 'react';
import { X, Save, Wifi, CreditCard, Store, Lock, Zap, ShieldCheck, CheckCircle2, Globe } from 'lucide-react';
import { MerchantConfig } from '../types';
import { t } from '../translations';

interface MerchantSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: MerchantConfig;
  onSave: (newConfig: MerchantConfig) => void;
  embedded?: boolean;
}

const MerchantSettingsModal: React.FC<MerchantSettingsModalProps> = ({ isOpen, onClose, config, onSave, embedded = false }) => {
  const [formData, setFormData] = useState<MerchantConfig>({
    ...config
  });
  const [activeTab, setActiveTab] = useState<'general' | 'wifi' | 'payment' | 'security'>('general');
  
  const zh = t.zh;
  const en = t.en;

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const TabButton = ({ id, icon: Icon, labelZh, labelEn }: any) => (
      <button
        onClick={() => setActiveTab(id)}
        className={`flex-1 min-w-[64px] py-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${activeTab === id ? 'bg-white shadow-md text-[#FF2442]' : 'text-gray-300 hover:bg-white/50'}`}
    >
        <Icon size={24} strokeWidth={2.5} className="mb-1.5" />
        <span className="text-[10px] font-black leading-none">{labelZh}</span>
    </button>
  );

  const content = (
      <div className={`flex flex-col h-full ${embedded ? 'bg-transparent' : 'bg-gray-50'}`}>
        {!embedded && (
            <div className="px-6 py-5 bg-white rounded-t-[2.5rem] flex justify-between items-center shadow-sm z-10">
            <div>
                <h2 className="text-lg font-black text-gray-900">{zh.storeSettings}</h2>
                <p className="text-xs text-gray-400 font-bold">{en.storeSettings}</p>
            </div>
            <button onClick={onClose} className="p-2.5 bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} strokeWidth={2.5} />
            </button>
            </div>
        )}

        {/* Tabs */}
        <div className={`flex p-2 gap-1 bg-gray-200/50 overflow-x-auto no-scrollbar ${embedded ? 'rounded-2xl mb-4' : ''}`}>
            <TabButton id="general" icon={Store} labelZh={zh.tabGeneral} labelEn={en.tabGeneral} />
            <TabButton id="wifi" icon={Wifi} labelZh={zh.tabWifi} labelEn={en.tabWifi} />
            <TabButton id="payment" icon={CreditCard} labelZh={zh.tabPayment} labelEn={en.tabPayment} />
            <TabButton id="security" icon={Lock} labelZh={zh.tabSecurity} labelEn={en.tabSecurity} />
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white rounded-2xl">
          
          {activeTab === 'general' && (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">{zh.storeName}</label>
                <input
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2442] shadow-sm transition-all font-bold text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">{zh.currencySymbol}</label>
                <input
                  type="text"
                  value={formData.currencySymbol}
                  onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                  className="w-24 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2442] shadow-sm text-center font-black text-lg text-gray-900"
                />
              </div>
            </div>
          )}

          {activeTab === 'wifi' && (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">{zh.wifiSsid}</label>
                <div className="relative">
                    <Wifi size={20} strokeWidth={2.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
                    <input
                    type="text"
                    value={formData.wifiSsid}
                    onChange={(e) => setFormData({ ...formData, wifiSsid: e.target.value })}
                    className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2442] shadow-sm transition-all font-bold text-gray-900"
                    placeholder="WiFi Name"
                    />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">{zh.wifiPass}</label>
                <div className="relative">
                    <Lock size={20} strokeWidth={2.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
                    <input
                    type="text"
                    value={formData.wifiPass}
                    onChange={(e) => setFormData({ ...formData, wifiPass: e.target.value })}
                    className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2442] shadow-sm transition-all font-bold text-gray-900"
                    placeholder="WiFi Password"
                    />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div className="text-xs text-[#FF2442] font-bold bg-rose-50 p-4 rounded-2xl border border-rose-100 flex gap-2">
                <CreditCard size={18} strokeWidth={2.5} className="shrink-0 mt-0.5" />
                <p className="leading-relaxed">{zh.paymentDesc}</p>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">{zh.alipayMerchantId}</label>
                <input
                  type="text"
                  value={formData.alipayMerchantId || ''}
                  onChange={(e) => setFormData({ ...formData, alipayMerchantId: e.target.value })}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2442] shadow-sm font-mono text-sm font-medium text-gray-900"
                  placeholder="2088..."
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">{zh.wechatMerchantId}</label>
                <input
                  type="text"
                  value={formData.wechatMerchantId || ''}
                  onChange={(e) => setFormData({ ...formData, wechatMerchantId: e.target.value })}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2442] shadow-sm font-mono text-sm font-medium text-gray-900"
                  placeholder="1500..."
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
             <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
               <div className="bg-rose-50 border border-rose-100 rounded-[2rem] p-5 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                      <Zap size={80} strokeWidth={1} className="text-[#FF2442]" />
                  </div>
                  <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                          <Zap size={18} className="text-[#FF2442] fill-current" />
                          <h4 className="font-black text-sm text-gray-800">海外反向代理</h4>
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold mb-4">通过您的服务器中转请求，解决国内用户无法连接 Google API 的问题。</p>
                      
                      <div className="w-full py-3 rounded-xl flex items-center justify-between px-4 bg-white text-[#FF2442] border border-[#FF2442]/20">
                         <span className="text-xs font-black">AI 代理引擎已适配</span>
                         <CheckCircle2 size={16} />
                      </div>
                  </div>
               </div>

               <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">代理服务器 URL</label>
                  <div className="relative">
                      <Globe size={20} strokeWidth={2.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
                      <input
                        type="url"
                        value={formData.apiProxyUrl || ''}
                        onChange={(e) => setFormData({ ...formData, apiProxyUrl: e.target.value })}
                        className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2442] shadow-sm font-mono text-sm font-bold text-gray-900"
                        placeholder="https://your-domain.com/google-api"
                      />
                  </div>
                  <p className="mt-2 text-[10px] text-gray-400 font-bold px-1">请填写在 Nginx 中配置的反向代理完整路径。</p>
               </div>

               <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 ml-1">{zh.newPin}</label>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2442] shadow-sm font-mono text-3xl font-bold tracking-[0.5em] text-center text-gray-900"
                    placeholder="8888"
                  />
               </div>

               <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                      <ShieldCheck size={16} className="text-[#FF2442]" />
                      <label className="text-xs font-black text-gray-900 uppercase tracking-wider">系统安全状态</label>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold mb-4">核心识别服务现已支持动态路径，确保在不同部署环境下均能稳定运行。</p>
               </div>
             </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-white rounded-b-[2.5rem]">
          <button 
            onClick={handleSave}
            className="w-full bg-[#FF2442] text-white rounded-[1.5rem] py-4 font-black flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-rose-100"
          >
            <Save size={20} strokeWidth={2.5} /> 
            <span>{zh.saveChanges}</span>
          </button>
        </div>
      </div>
  );

  if (embedded) return content;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-gray-50 rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh]">
        {content}
      </div>
    </div>
  );
};

export default MerchantSettingsModal;
