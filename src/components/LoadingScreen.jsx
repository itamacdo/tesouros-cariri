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
      {/* Container do Spinner + Emoji */}
      <div className="relative flex items-center justify-center w-24 h-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent ${
            isDarkMode ? 'border-t-[#A7C957] border-r-[#A7C957]/30' : 'border-t-[#2D5A27] border-r-[#2D5A27]/30'
          }`}
        />
        <div className="text-3xl select-none">🌿</div>
      </div>

      <div className="mt-8 text-center">
        <h2 className={`text-xs font-bold uppercase tracking-[0.4em] ${
          isDarkMode ? 'text-[#A7C957]' : 'text-[#2D5A27]'
        }`}>
          Expedição Cariri
        </h2>
        <p className={`text-[10px] mt-2 opacity-30 uppercase tracking-widest ${
          isDarkMode ? 'text-white' : 'text-[#2D2926]'
        }`}>
          Carregando Tesouros...
        </p>
      </div>
    </motion.div>
  );
}