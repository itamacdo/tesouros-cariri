import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FoodModal({ food, darkMode, onClose }) {
  if (!food) return null;

  // Lógica para transformar o texto numerado em uma lista real
  const recipeSteps = food.gastronomia
    .split(/\d+\.\s+/)
    .filter(step => step.trim().length > 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} 
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl relative border ${
          darkMode ? 'bg-[#151F32] border-slate-700 text-slate-200' : 'bg-white border-stone-100 text-[#2D2926]'
        } p-8 md:p-12 custom-scrollbar`}
      >
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-xl opacity-30 hover:opacity-100 transition-opacity cursor-pointer"
        >
          ✕
        </button>

        {/* Cabeçalho do Alimento */}
        <div className="flex items-center gap-6 mb-8">
          <span className="text-7xl">{food.emoji}</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">{food.nome}</h2>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#BC8F8F]">Ficha Técnica</span>
          </div>
        </div>

        {/* Seção: Superpoder Nutricional */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-500">🛡️</span>
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Benefícios Nutricionais</h3>
          </div>
          <p className="leading-relaxed opacity-80 text-sm md:text-base">
            {food.nutricao}
          </p>
        </section>

        {/* Seção: Passo a Passo Gastronômico */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-orange-400">🍳</span>
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Modo de Preparo Saudável</h3>
          </div>
          
          <div className="space-y-4">
            {recipeSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className={`mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  ✓
                </div>
                <p className="text-sm md:text-base opacity-90 leading-snug">
                  {step.trim()}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer do Modal - Texto aumentado e sem emoji */}
        <footer className="mt-12 pt-6 border-t border-stone-100/20 text-center">
          <p className="text-xs md:text-sm font-medium opacity-70 italic tracking-wide">
            Dica da nutri: Priorize ingredientes orgânicos e feiras locais.
          </p>
        </footer>
      </motion.div>
    </motion.div>
  );
}