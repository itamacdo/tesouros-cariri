import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ isDarkMode }) {
  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center ${
        isDarkMode ? 'bg-[#0E1A0C]' : 'bg-[#F9F9F7]'
      }`}
    >
      {/* Container Centralizado para Spinner + Emoji */}
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Spinner de Carregamento */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={`absolute w-full h-full rounded-full border-t-2 border-r-2 border-transparent ${
            isDarkMode ? 'border-t-[#A7C957] border-r-[#A7C957]/30' : 'border-t-[#2D5A27] border-r-[#2D5A27]/30'
          }`}
        />
        
        {/* Emoji Estático no Centro */}
        <span className="text-3xl select-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🌿</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 text-center"
      >
        <h2 className={`text-xs font-bold uppercase tracking-[0.4em] ${
          isDarkMode ? 'text-[#A7C957]' : 'text-[#2D5A27]'
        }`}>
          Expedição Cariri
        </h2>
        <p className="text-[10px] mt-2 opacity-30 uppercase tracking-widest">
          Carregando Tesouros...
        </p>
      </motion.div>
    </motion.div>
  );
}