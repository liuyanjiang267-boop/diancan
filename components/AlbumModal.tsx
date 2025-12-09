
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
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-black rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/10">
        <div className="px-6 py-5 flex justify-between items-center bg-white/5">
          <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <ImageIcon size={20} strokeWidth={2.5} className="text-amber-400" />
                {zh.albumTitle}
              </h2>
              <span className="text-xs text-slate-400 font-bold ml-7">{en.albumTitle}</span>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors">
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-black">
          {images.length === 0 ? (
            <div className="h-60 flex flex-col items-center justify-center text-slate-600">
              <ImageIcon size={64} strokeWidth={1.5} className="mb-4 opacity-20" />
              <p className="font-bold">{zh.noImages}</p>
            </div>
          ) : (
            <div className="columns-2 gap-4 pb-8 space-y-4">
              {images.map((img, idx) => (
                <div key={idx} className="break-inside-avoid rounded-xl overflow-hidden shadow-lg bg-slate-800 relative group">
                  <img 
                    src={img} 
                    alt={`Album ${idx + 1}`} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
