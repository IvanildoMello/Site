
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-sm rotate-45"></div>
              </div>
              <span className="text-lg font-bold tracking-tighter uppercase">O PODEROSO</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Moldando o futuro da tecnologia com design inteligente e infraestrutura inquebrável.
            </p>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">O que fazemos</h4>
            <div className="space-y-4">
              <p className="text-gray-500 text-sm leading-relaxed">
                Desenvolvemos ecossistemas digitais de alta performance, focados em escalabilidade infinita e interfaces que antecipam as necessidades do amanhã.
              </p>
              <ul className="text-xs text-indigo-400 font-medium space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                  Arquitetura Cloud Nativa
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                  UX/UI de Próxima Geração
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                  Inteligência Preditiva
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Plataforma</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Infraestrutura</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Edge Network</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Developer Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Empresa</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-110 hover:rotate-12 transition-all duration-300 group">
                <span className="group-hover:text-white transition-colors text-xs">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-110 hover:-rotate-12 transition-all duration-300 group">
                <span className="group-hover:text-white transition-colors text-xs">in</span>
              </a>
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-110 hover:rotate-12 transition-all duration-300 group">
                <span className="group-hover:text-white transition-colors text-xs">git</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-gray-600">
          <p>© 2024 O Poderoso Technologies. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Termos</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
