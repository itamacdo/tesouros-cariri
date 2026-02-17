import React from 'react';
import { motion } from 'framer-motion';

export default function Glossary({ terms, isDarkMode }) {
  if (terms.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`mb-10 p-6 md:p-8 rounded-[32px] border transition-all duration-500 ${
        isDarkMode 
          ? 'bg-[#0D1A0D] border-[#2D5A27]/30' 
          : 'bg-emerald-50/40 border-emerald-100'
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xl">📖</span>
        <h3 className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
          isDarkMode ? 'text-[#A7C957]' : 'text-emerald-700'
        }`}>
          Dicionário Gastronómico Regional
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {terms.map((item) => (
          <div key={item.termo} className="group">
            <dt className={`text-xs font-bold mb-1 transition-colors ${
              isDarkMode ? 'text-[#A7C957]' : 'text-emerald-800'
            }`}>
              {item.termo}
            </dt>
            <dd className={`text-[11px] leading-relaxed italic opacity-70 ${
              isDarkMode ? 'text-slate-300' : 'text-stone-600'
            }`}>
              {item.def}
            </dd>
          </div>
        ))}
      </div>
    </motion.div>
  );
}