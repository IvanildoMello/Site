
import React, { useEffect, useState, useRef, useMemo } from 'react';

interface HeroProps {
  isAdmin?: boolean;
  data: { title1: string; title2: string; description: string; mediaUrl: string };
  onChange: (key: string, value: string) => void;
}

const Hero: React.FC<HeroProps> = ({ isAdmin, data, onChange }) => {
  const [offset, setOffset] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const particles = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      depth: 0.2 + Math.random() * 1.8,
      twinkleDuration: 3 + Math.random() * 5,
      twinkleDelay: Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.6,
    }));
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setOffset(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleImageClick = () => {
    if (isAdmin && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange('mediaUrl', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section ref={containerRef} className="relative pt-40 pb-20 overflow-hidden min-h-screen flex items-center">
      {isAdmin && (
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*,video/*" 
          onChange={handleFileChange} 
        />
      )}
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              transform: `translate(${mousePos.x * 40 * p.depth}px, ${mousePos.y * 40 * p.depth + (offset * -0.1 * p.depth)}px)`,
              transition: 'transform 0.15s cubic-bezier(0.1, 0.2, 0.3, 1)',
              animation: `twinkle ${p.twinkleDuration}s ease-in-out ${p.twinkleDelay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 cursor-default transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-medium text-gray-400">Nova atualização O Poderoso 2.0 disponível</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          <span 
            className={`gradient-text block outline-none transition-all duration-[1200ms] ease-out ${isAdmin ? 'hover:bg-white/10 cursor-text p-2 rounded-xl ring-1 ring-white/10' : ''} ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-8'}`}
            contentEditable={isAdmin}
            onBlur={(e) => onChange('title1', e.currentTarget.innerText)}
            suppressContentEditableWarning
          >
            {data.title1}
          </span>
          <span 
            className={`text-white block outline-none transition-all duration-[1200ms] delay-150 ease-out ${isAdmin ? 'hover:bg-white/10 cursor-text p-2 rounded-xl ring-1 ring-white/10' : ''} ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-8'}`}
            contentEditable={isAdmin}
            onBlur={(e) => onChange('title2', e.currentTarget.innerText)}
            suppressContentEditableWarning
          >
            {data.title2}
          </span>
        </h1>
        
        <p 
          className={`max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed outline-none transition-all duration-1000 delay-300 ${isAdmin ? 'hover:bg-white/10 cursor-text p-2 rounded-xl ring-1 ring-white/10' : ''} ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          contentEditable={isAdmin}
          onBlur={(e) => onChange('description', e.currentTarget.innerText)}
          suppressContentEditableWarning
        >
          {data.description}
        </p>
        
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <button className="relative w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full transition-all duration-500 z-10 min-w-[220px] hover:scale-105 active:scale-95 shadow-xl hover:shadow-white/10">
            Iniciar Projeto Grátis
          </button>
          <button className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all active:scale-95">
            Ver Demonstração
          </button>
        </div>

        <div className={`mt-24 relative max-w-5xl mx-auto group transition-all duration-[1500ms] delay-700 ${isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}>
          {isAdmin && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 bg-indigo-600 text-[10px] px-3 py-1 rounded-full font-bold">
              CLIQUE PARA ENVIAR ARQUIVO LOCAL
            </div>
          )}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 transition-opacity"></div>
          <div 
            onClick={handleImageClick}
            className={`relative glass rounded-2xl overflow-hidden shadow-2xl h-[300px] md:h-[600px] ${isAdmin ? 'cursor-pointer hover:ring-4 ring-indigo-500 transition-all' : ''}`}
          >
            <div className="absolute inset-0 w-full h-[150%] -top-[25%]" style={{ transform: `translateY(${offset * 0.15}px)`, transition: 'transform 0.1s ease-out' }}>
              {data.mediaUrl.includes('video') || data.mediaUrl.startsWith('data:video') ? (
                <video src={data.mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" />
              ) : (
                <img src={data.mediaUrl} alt="Dashboard Preview" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" />
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
          100% { opacity: 0.2; transform: scale(0.9); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
