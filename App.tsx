
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ShowCase from './components/ShowCase';
import Footer from './components/Footer';
import DetailPage from './components/DetailPage';
import Chatbox from './components/Chatbox';

const STORAGE_KEY = 'o_poderoso_site_data_v3';

const DEFAULT_DATA = {
  hero: {
    title1: "A Próxima Era da",
    title2: "Inteligência Digital",
    description: "Construa o futuro com infraestrutura escalável, design minimalista e performance de ponta. A plataforma definitiva para criadores e engenheiros de elite.",
    mediaUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832"
  },
  showcase: {
    mainImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    title: "Dados em Tempo Real",
    subtitle: "Analytics de Próxima Geração",
    description: "Monitore cada interação com precisão cirúrgica. Nossa engine de processamento lida com bilhões de eventos diariamente."
  },
  sobre: {
    missao: "Nascemos da necessidade de criar ferramentas que acompanhem a velocidade da luz. O Poderoso não é apenas uma empresa de tecnologia, é um laboratório de experiências futuras."
  }
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [siteData, setSiteData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  });

  const updateContent = (section: string, key: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay for UX feedback
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
      setHasChanges(false);
      setIsSaving(false);
      alert('Alterações salvas com sucesso localmente!');
    }, 800);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [currentPage]);

  const navigateTo = (page: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page.toLowerCase());
  };

  return (
    <div className={`min-h-screen bg-[#050505] transition-all duration-700 selection:bg-indigo-500/30 ${isAdmin ? 'ring-inset ring-4 ring-indigo-500/30' : ''}`}>
      {/* Admin Control Panel */}
      {isAdmin && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-4 w-full max-w-md px-4">
          {hasChanges && (
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-4 rounded-2xl text-sm font-bold shadow-[0_20px_40px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-3 transform active:scale-95 border border-indigo-400/50 ${isSaving ? 'opacity-70 cursor-wait' : 'animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500'}`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Persistindo dados...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                  PUBLICAR ALTERAÇÕES
                </>
              )}
            </button>
          )}
          <div className="bg-[#111] backdrop-blur-xl text-white/70 px-6 py-3 rounded-2xl text-[10px] tracking-[0.2em] font-black flex items-center gap-3 shadow-2xl border border-white/10 uppercase">
            <span className={`w-2 h-2 rounded-full ${hasChanges ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></span>
            Editor Ativo: Clique nos textos para editar
          </div>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      <Navbar scrolled={scrolled} navigateTo={navigateTo} activePage={currentPage} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      
      <main className={`relative z-10 transition-all duration-500 ${isAdmin ? 'cursor-crosshair' : ''}`}>
        {currentPage === 'home' ? (
          <>
            <div className="reveal">
              <Hero data={siteData.hero} isAdmin={isAdmin} onChange={(key, val) => updateContent('hero', key, val)} />
            </div>
            <div className="reveal"><Features isAdmin={isAdmin} /></div>
            <div className="reveal">
              <ShowCase 
                data={siteData.showcase} 
                isAdmin={isAdmin} 
                onChange={(key, val) => updateContent('showcase', key, val)} 
                onNavigate={navigateTo}
              />
            </div>
            <Chatbox />
          </>
        ) : (
          <DetailPage page={currentPage} onBack={() => setCurrentPage('home')} isAdmin={isAdmin} siteData={siteData} updateContent={updateContent} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
