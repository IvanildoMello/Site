
import React from 'react';

const FEATURE_DATA = [
  {
    title: "Velocidade Extrema",
    desc: "Otimizado para tempos de resposta sub-milissegundos em escala global.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    )
  },
  {
    title: "Segurança de Elite",
    desc: "Criptografia de ponta a ponta e compliance nativo com as normas mundiais.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8-8v4" /></svg>
    )
  },
  {
    title: "Integração Fluida",
    desc: "Conecte-se com todo o seu stack tecnológico em apenas alguns cliques.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1V4z" /></svg>
    )
  }
];

interface FeaturesProps {
  isAdmin?: boolean;
}

const Features: React.FC<FeaturesProps> = ({ isAdmin }) => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 outline-none ${isAdmin ? 'hover:bg-white/5 cursor-text' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning>Desenvolvido para Performance</h2>
          <p className={`text-gray-400 max-w-xl mx-auto outline-none ${isAdmin ? 'hover:bg-white/5 cursor-text' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning>Tudo o que você precisa para escalar sua aplicação sem comprometer a qualidade ou a segurança.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURE_DATA.map((feature, idx) => (
            <div 
              key={idx} 
              className="glass p-8 rounded-3xl group hover:border-indigo-500/80 hover:scale-[1.02] transition-all duration-500 relative border-white/10"
            >
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 outline-none ${isAdmin ? 'hover:bg-white/5 cursor-text' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning>
                {feature.title}
              </h3>
              <p className={`text-gray-400 leading-relaxed outline-none ${isAdmin ? 'hover:bg-white/5 cursor-text' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
