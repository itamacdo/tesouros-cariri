import React from 'react';
import { motion } from 'framer-motion';

// Coordenadas ajustadas para um formato panorâmico (X horizontal, Y vertical)
const mapCities = [
  { id: 'santana', x: 12, y: 30, nome: 'Santana', simbolo: '🦖' },
  { id: 'nova-olinda', x: 28, y: 20, nome: 'N. Olinda', simbolo: '👞' },
  { id: 'crato', x: 18, y: 70, nome: 'Crato', simbolo: '🌳' },
  { id: 'juazeiro', x: 42, y: 40, nome: 'Juazeiro', simbolo: '⛪' },
  { id: 'barbalha', x: 55, y: 75, nome: 'Barbalha', simbolo: '🚩' },
  { id: 'missao-velha', x: 72, y: 35, nome: 'M. Velha', simbolo: '🌊' },
  { id: 'milagres', x: 90, y: 45, nome: 'Milagres', simbolo: '🤝' },
  { id: 'brejo-santo', x: 80, y: 80, nome: 'B. Santo', simbolo: '🚜' },
];

export default function CaririMap({ activeId, onSelect, isDarkMode }) {
  return (
    <div className={`relative w-full max-w-5xl mx-auto rounded-[40px] overflow-hidden transition-all duration-700 border shadow-md ${
      isDarkMode 
        ? 'bg-[#151F32] border-slate-700/50' 
        : 'bg-white border-stone-100'
    }`}
    // Proporção panorâmica (21/9) para reduzir a altura sem achatar os elementos
    style={{ aspectRatio: '21/9', minHeight: '280px' }} 
    >
      
      <div className="relative w-full h-full p-4 md:p-8">
        
        {/* Fundo sutil para preencher o espaço horizontal */}
        <div className={`absolute inset-0 pointer-events-none opacity-30 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5' 
            : 'bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5'
        }`} />

        {mapCities.map((city) => (
          <motion.button
            key={city.id}
            onClick={() => onSelect(city.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
            style={{ left: `${city.x}%`, top: `${city.y}%` }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Ícones em formato de quadrado arredondado conforme a imagem do projeto */}
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-2xl transition-all shadow-sm border-2 ${
              activeId === city.id 
                ? `${isDarkMode ? 'bg-blue-600 border-white' : 'bg-[#2D5A27] border-white'} scale-110 z-20 shadow-lg` 
                : `${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-white'} hover:border-emerald-500`
            }`}>
              {city.simbolo}
            </div>

            {/* Legendas menores e elegantes */}
            <span className={`mt-1.5 px-2 py-0.5 rounded-full text-[7px] md:text-[9px] font-bold uppercase tracking-widest transition-colors ${
              activeId === city.id 
                ? 'bg-[#2D5A27] text-white shadow-sm' 
                : `${isDarkMode ? 'bg-slate-900/60 text-slate-400' : 'bg-stone-50 text-stone-400'}`
            }`}>
              {city.nome}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}