
import React, { useState } from 'react';
import { Lock, X, ChevronRight } from 'lucide-react';
import { t } from '../translations';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  correctPassword: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess, correctPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const zh = t.zh;
  const en = t.en;

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setError(false);
      setPassword('');
      onLoginSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-8 overflow-hidden border border-gray-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-50 rounded-full text-gray-400 hover:text-[#FF2442] transition-colors"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <div className="flex flex-col items-center mb-8 mt-4">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-[#FF2442] mb-6 shadow-sm border border-rose-100">
            <Lock size={40} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-black text-gray-900">{zh.merchantLogin}</h2>
          <p className="text-sm text-gray-400 font-bold mt-1">{en.enterPin}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••"
              className={`w-full text-center text-4xl font-black tracking-[0.5em] py-5 rounded-[1.5rem] border-2 focus:outline-none focus:ring-4 transition-all ${error ? 'border-red-200 bg-red-50 focus:ring-red-100 text-red-500' : 'border-gray-100 bg-gray-50 focus:border-[#FF2442] focus:ring-rose-100 text-gray-800'}`}
              autoFocus
              maxLength={8}
            />
            {error && (
                <div className="text-center mt-3 animate-in shake">
                    <p className="text-red-500 text-xs font-black bg-red-50 inline-block px-3 py-1 rounded-full">{zh.pinError}</p>
                </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF2442] text-white py-5 rounded-[1.5rem] font-black active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-rose-200"
          >
            <span>{zh.accessSettings}</span>
            <ChevronRight size={20} strokeWidth={3} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
