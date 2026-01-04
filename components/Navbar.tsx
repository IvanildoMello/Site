
import React, { useState } from 'react';

interface NavbarProps {
  scrolled: boolean;
  navigateTo: (page: string) => void;
  activePage: string;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, navigateTo, activePage, isAdmin, setIsAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Projetos', id: 'projetos' },
    { name: 'Fotos', id: 'fotos' },
    { name: 'Postagens', id: 'postagens' },
    { name: 'Sobre', id: 'sobre' },
  ];

  const handleNavClick = (id: string) => {
    navigateTo(id);
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled || isOpen || activePage !== 'home' ? 'py-4 bg-[#050505]/80 backdrop-blur-lg border-b border-white/5' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 relative z-[110] cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-sm rotate-45"></div>
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">O PODEROSO</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors relative ${activePage === link.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
                {activePage === link.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-indigo-500"></span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 relative z-[110]">
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`group relative text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 overflow-hidden border ${
                isAdmin 
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-white animate-pulse' : 'bg-gray-600'}`}></span>
                {isAdmin ? 'MODO ADMIN: ON' : 'ADMIN LOGIN'}
              </span>
            </button>
            
            <button 
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              aria-label="Menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[90] md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-2xl"></div>
        <div className="relative h-full flex flex-col items-center justify-center gap-8 px-6 pt-20">
          {navLinks.map((link, idx) => (
            <button 
              key={link.id} 
              onClick={() => handleNavClick(link.id)}
              className={`text-3xl font-bold text-white transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => { setIsAdmin(!isAdmin); setIsOpen(false); }}
            className={`mt-8 text-lg font-bold py-3 px-8 rounded-full border ${isAdmin ? 'bg-indigo-600 border-indigo-400 text-white' : 'border-white/20 text-gray-400'}`}
          >
            {isAdmin ? 'Desativar Admin' : 'Ativar Modo Admin'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
