
import React from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { t } from '../translations';

interface AlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

const AlbumModal: React.FC<AlbumModalProps> = ({ isOpen, onClose, images }) => {
  const zh = t.zh;
  const en = t.en;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-100">
        <div className="px-6 py-5 flex justify-between items-center border-b border-gray-50">
          <div>
              <h2 className="text-lg font-black text-gray-900 flex items-center gap-2 brand-font">
                <ImageIcon size={20} strokeWidth={2.5} className="text-[#FF2442]" />
                {zh.albumTitle}
              </h2>
              <span className="text-xs text-gray-400 font-bold ml-7 uppercase tracking-widest">{en.albumTitle}</span>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-rose-50 text-gray-400 hover:text-[#FF2442] transition-colors">
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50/30">
          {images.length === 0 ? (
            <div className="h-60 flex flex-col items-center justify-center text-gray-300">
              <ImageIcon size={64} strokeWidth={1.5} className="mb-4 opacity-20" />
              <p className="font-bold">{zh.noImages}</p>
            </div>
          ) : (
            <div className="columns-2 gap-4 pb-8 space-y-4">
              {images.map((img, idx) => (
                <div key={idx} className="break-inside-avoid rounded-xl overflow-hidden shadow-sm bg-white border border-gray-100 relative group">
                  <img 
                    src={img} 
                    alt={`Album ${idx + 1}`} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumModal;
