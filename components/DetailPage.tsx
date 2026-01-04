
import React, { useState, useEffect } from 'react';

interface DetailPageProps {
  page: string;
  onBack: () => void;
  isAdmin?: boolean;
  siteData: any;
  updateContent: (section: string, key: string, value: string) => void;
}

const LazyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative w-full h-full bg-white/5 overflow-hidden rounded-xl">
      {/* Skeleton overlay */}
      <div className={`absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-white/10 transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100 animate-pulse'}`} />
      
      <img
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-[1200ms] cubic-bezier(0.23, 1, 0.32, 1) ${
          isLoaded 
            ? 'opacity-100 scale-100 blur-0 rotate-0' 
            : 'opacity-0 scale-[1.15] blur-md -rotate-1'
        }`}
      />
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-500" />
    </div>
  );
};

const ProjectCard: React.FC<{ i: number; isAdmin?: boolean }> = ({ i, isAdmin }) => {
  const [scrollY, setScrollY] = useState(0);
  const cardRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setScrollY((rect.top + rect.height / 2) - window.innerHeight / 2);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={cardRef} className="glass rounded-3xl overflow-hidden group border border-white/5 hover:border-white/10 transition-all duration-500">
      <div className="h-72 overflow-hidden relative">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%]" style={{ transform: `translateY(${scrollY * 0.08}px)`, transition: 'transform 0.1s ease-out' }}>
          <img src={`https://images.unsplash.com/photo-${1614850523296 + i}-d8c1af93d400?q=80&w=1000&auto=format&fit=crop`} className="w-full h-full object-cover" alt="Projeto" />
        </div>
      </div>
      <div className="p-8 relative bg-[#050505]/40 backdrop-blur-sm">
        <h3 className={`text-2xl font-bold mb-4 outline-none ${isAdmin ? 'hover:bg-white/5 cursor-text' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning>Alpha System 0{i}</h3>
        <p className={`text-gray-400 leading-relaxed outline-none ${isAdmin ? 'hover:bg-white/5 cursor-text' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning>Desenvolvimento de interface neural avançada para processamento de dados quânticos.</p>
      </div>
    </div>
  );
};

const DetailPage: React.FC<DetailPageProps> = ({ page, onBack, isAdmin, siteData, updateContent }) => {
  const renderContent = () => {
    switch (page) {
      case 'projetos':
        return (
          <div className="grid md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map(i => <ProjectCard key={i} i={i} isAdmin={isAdmin} />)}
          </div>
        );
      case 'fotos':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="aspect-square glass rounded-xl overflow-hidden group cursor-pointer hover:ring-2 ring-indigo-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.2)]"
              >
                <LazyImage src={`https://images.unsplash.com/photo-${1446776811953 + i}-b23d57bd21aa?q=80&w=600&auto=format&fit=crop`} alt={`O Poderoso visual ${i + 1}`} />
              </div>
            ))}
          </div>
        );
      case 'postagens':
        return (
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass p-8 md:p-10 rounded-[2.5rem] border-white/5 hover:border-indigo-500/40 transition-all duration-500 group relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em]">Março {24 - i}, 2024</span>
                  <h3 className={`text-2xl md:text-3xl font-bold mt-3 mb-5 outline-none ${isAdmin ? 'hover:bg-white/5 cursor-text' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning>
                    {i === 1 ? 'O Futuro das Interfaces Espaciais' : i === 2 ? 'Arquitetura de Dados em Escala Galáctica' : 'Design Minimalista'}
                  </h3>
                  <p className={`text-gray-400 leading-relaxed max-w-2xl text-lg outline-none ${isAdmin ? 'hover:bg-white/5 cursor-text' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning>
                    Explorando como a realidade aumentada está mudando a forma como interagimos com o vácuo digital.
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'sobre':
        return (
          <div className="max-w-3xl">
            <h3 className="text-3xl font-bold mb-6">Nossa Missão</h3>
            <p 
              className={`text-xl text-gray-400 leading-relaxed mb-8 outline-none ${isAdmin ? 'hover:bg-white/5 cursor-text' : ''}`}
              contentEditable={isAdmin}
              onBlur={(e) => updateContent('sobre', 'missao', e.currentTarget.innerText)}
              suppressContentEditableWarning
            >
              {siteData.sobre.missao}
            </p>
            <div className="grid grid-cols-2 gap-12 mt-12 mb-20">
              <div>
                <h4 className={`text-white font-bold text-4xl mb-2 outline-none ${isAdmin ? 'hover:bg-white/5 cursor-text' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning>12k+</h4>
                <p className="text-gray-500 uppercase tracking-widest text-xs">Usuários Ativos</p>
              </div>
              <div>
                <h4 className={`text-white font-bold text-4xl mb-2 outline-none ${isAdmin ? 'hover:bg-white/5 cursor-text' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning>99.9%</h4>
                <p className="text-gray-500 uppercase tracking-widest text-xs">Uptime Global</p>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-indigo-400">Conecte-se Conosco</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
                  <a key={social} href="#" className="glass p-6 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-all">
                    <span className="font-medium">{social}</span>
                    <span>→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span className="text-sm font-medium uppercase tracking-widest">Voltar para Home</span>
      </button>
      <div className="reveal reveal-visible">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-16 capitalize gradient-text tracking-tighter">{page}</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default DetailPage;
