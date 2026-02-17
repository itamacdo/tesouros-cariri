import React from 'react';
import { motion } from 'framer-motion';

// Removemos o import direto da imagem aqui para usar a que vem do App.jsx
export default function AboutModal({ isOpen, onClose, isDarkMode, profileImg }) {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 rounded-[40px] shadow-2xl relative border ${
          isDarkMode ? 'bg-[#162914] border-[#2D5A27]/30 text-slate-200' : 'bg-white border-stone-100 text-[#2D2926]'
        } custom-scrollbar`}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-xl opacity-20 hover:opacity-100 cursor-pointer">✕</button>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative shrink-0">
            {/* Moldura da Foto com efeito de elevação */}
            <div className={`w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 ${
              isDarkMode ? 'border-[#2D5A27]/20' : 'border-stone-50'
            } shadow-xl bg-stone-100`}>
              <img 
                src={profileImg} 
                alt="Maria Ita" 
                loading="eager"
                fetchpriority="high"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Maria+Ita&background=2D5A27&color=fff&size=200"; }}
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold mb-1 tracking-tight">Maria Ita Macêdo</h2>
            <p className={`text-xs font-bold uppercase tracking-widest mb-6 italic ${
              isDarkMode ? 'text-[#A7C957]' : 'text-emerald-600'
            }`}>
              Pesquisadora & Desenvolvedora
            </p>
            
            <div className="space-y-4 text-sm md:text-base leading-relaxed opacity-90 font-light text-justify md:text-left">
              <p>
                Natural de <strong>Fortaleza</strong> e residente em <strong>Juazeiro do Norte</strong>, Maria Ita é estudante de Nutrição e Gastronomia na <strong>UNINASSAU</strong>. Sua trajetória une a precisão tecnológica do setor hospitalar à alma da culinária regional.
              </p>
              <p>
                Com paixão por <strong>dados, pesquisa e programação</strong>, ela utiliza a tecnologia para democratizar a ciência nutricional, transformando informações complexas em conhecimentos acessíveis e visuais.
              </p>
            </div>

            {/* Tags de competências para preencher o visual */}
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-2">
              {['Nutrição', 'Gastronomia', 'React', 'Data Science'].map(skill => (
                <span key={skill} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                  isDarkMode ? 'bg-white/5 border-white/10 text-[#A7C957]' : 'bg-stone-50 border-stone-100 text-stone-500'
                }`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}