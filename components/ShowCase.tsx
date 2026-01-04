
import React, { useEffect, useState, useRef } from 'react';

interface ShowCaseProps {
  isAdmin?: boolean;
  data: { mainImage: string; title: string; subtitle: string; description: string };
  onChange: (key: string, value: string) => void;
  onNavigate?: (page: string) => void;
}

const ShowCase: React.FC<ShowCaseProps> = ({ isAdmin, data, onChange, onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setScrollY(window.innerHeight - rect.top);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageClick = (e: React.MouseEvent) => {
    if (isAdmin && fileInputRef.current) {
      e.stopPropagation();
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange('mainImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
      {isAdmin && (
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      )}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Card Principal de Destaque */}
          <div 
            onClick={() => !isAdmin && onNavigate?.('postagens')}
            className={`md:col-span-8 glass rounded-2xl md:rounded-3xl overflow-hidden group relative min-h-[350px] md:min-h-[500px] transition-all duration-500 ${!isAdmin ? 'cursor-pointer hover:scale-[1.01] active:scale-95' : ''}`}
          >
            <div 
              className="absolute inset-0 w-full h-[140%] -top-[20%]" 
              style={{ transform: `translateY(${scrollY * 0.05}px)`, transition: 'transform 0.1s linear' }}
            >
              <img src={data.mainImage} className="w-full h-full object-cover opacity-60" alt="Showcase Media" />
            </div>
            
            {isAdmin && (
              <button 
                onClick={handleImageClick}
                className="absolute top-4 right-4 z-20 bg-indigo-600 hover:bg-indigo-500 text-[10px] px-3 py-1 rounded-full font-bold transition-colors shadow-lg"
              >
                ALTERAR FOTO (ADMIN)
              </button>
            )}

            {!isAdmin && (
              <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 z-10 w-full text-left">
              <span 
                className={`text-indigo-400 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2 md:mb-4 block outline-none ${isAdmin ? 'hover:bg-white/10 p-1 rounded transition-colors ring-1 ring-white/10' : ''}`}
                contentEditable={isAdmin}
                onBlur={(e) => onChange('subtitle', e.currentTarget.innerText)}
                suppressContentEditableWarning
              >
                {data.subtitle}
              </span>
              <h3 
                className={`text-2xl md:text-4xl font-bold mb-2 md:mb-4 tracking-tight outline-none ${isAdmin ? 'hover:bg-white/10 p-1 rounded transition-colors ring-1 ring-white/10' : ''}`}
                contentEditable={isAdmin}
                onBlur={(e) => onChange('title', e.currentTarget.innerText)}
                suppressContentEditableWarning
              >
                {data.title}
              </h3>
              <p 
                className={`text-gray-300 text-sm md:text-base max-w-md leading-relaxed opacity-90 outline-none ${isAdmin ? 'hover:bg-white/10 p-1 rounded transition-colors ring-1 ring-white/10' : ''}`}
                contentEditable={isAdmin}
                onBlur={(e) => onChange('description', e.currentTarget.innerText)}
                suppressContentEditableWarning
              >
                {data.description}
              </p>
            </div>
          </div>

          {/* Card Secundário (Navega para postagens também) */}
          <div 
            onClick={() => onNavigate?.('postagens')}
            className="md:col-span-4 glass rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col justify-between border-white/5 cursor-pointer group hover:border-indigo-500/50 transition-all duration-500 hover:scale-[1.02]"
          >
            <div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 md:mb-8 border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-indigo-400 transition-colors">Ver Novidades</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">Explore nossos últimos artigos, atualizações de rede e insights da indústria.</p>
            </div>
            
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
              <span>Acessar Blog</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCase;
