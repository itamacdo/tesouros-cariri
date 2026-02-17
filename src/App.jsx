import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caririCities } from './data/caririData';
import CaririMap from './components/CaririMap';
import FoodModal from './components/FoodModal';
import AboutModal from './components/AboutModal';
import LoadingScreen from './components/LoadingScreen';
import profileImg from './assets/profile.jpg'; // Importante importar aqui para o pre-load

const GLOSSARY_DATA = [
  { termo: 'Jerimum', def: 'Abóbora regional, base nutritiva para purês e assados caririenses.' },
  { termo: 'Flocão', def: 'Farinha de milho flocada, alma do tradicional cuscuz nordestino.' },
  { termo: 'Macaxeira', def: 'Raiz também conhecida como mandioca mansa ou aipim, rica em energia.' },
  { termo: 'Fava', def: 'Grão robusto e nutritivo, prato emblemático da região da Chapada.' },
  { termo: 'Manteiga de Garrafa', def: 'Manteiga clarificada artesanal com aroma amendoado e sabor marcante.' },
  { termo: 'Nata', def: 'Creme de leite fresco artesanal de alta densidade, pura energia regional.' },
  { termo: 'Queijo Coalho', def: 'Queijo resistente ao calor, perfeito para grelhar e manter a textura.' }
];

export default function App() {
  const [activeCityId, setActiveCityId] = useState('barbalha');
  const [selectedFood, setSelectedFood] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Pré-carregamento da foto de perfil para evitar atraso no About Me
    const img = new Image();
    img.src = profileImg;

    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const activeCity = caririCities.find(c => c.id === activeCityId) || caririCities[0];
  const theme = isDarkMode ? 'bg-[#0E1A0C] text-[#F9F9F7]' : 'bg-[#F9F9F7] text-[#2D2926]';

  const activeGlossary = GLOSSARY_DATA.filter(item => 
    activeCity.alimentos.some(food => 
      food.nome.toLowerCase().includes(item.termo.toLowerCase()) || 
      food.gastronomia.toLowerCase().includes(item.termo.toLowerCase())
    )
  );

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen isDarkMode={isDarkMode} />}
      </AnimatePresence>

      <div className={`min-h-screen ${theme} transition-all duration-700 p-4 md:p-8 font-sans`}>
        
        <header className="max-w-5xl mx-auto relative flex flex-col items-center mb-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-2xl md:text-4xl font-serif font-bold tracking-tight ${isDarkMode ? 'text-[#A7C957]' : 'text-[#2D5A27]'}`}
          >
            Tesouros do Cariri
          </motion.h1>
          <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] opacity-40 mt-1">
            Saúde, Cultura e Gastronomia
          </p>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 md:p-3 backdrop-blur-md rounded-xl shadow-lg border cursor-pointer hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/10 border-stone-200'
            }`}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </header>

        <main className="max-w-5xl mx-auto">
          <div className="mb-8 cursor-zoom-in">
            <CaririMap activeId={activeCityId} onSelect={setActiveCityId} isDarkMode={isDarkMode} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCityId} 
              initial={{ opacity: 0, scale: 0.99 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.99 }}
              className={`rounded-[30px] md:rounded-[50px] p-6 md:p-10 border shadow-xl ${
                isDarkMode ? 'bg-[#162914] border-[#2D5A27]/30' : 'bg-white border-stone-50'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 mb-8 border-b border-stone-100/10 pb-8">
                <div className="lg:col-span-2 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-6">
                    <motion.span 
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="text-6xl md:text-7xl"
                    >
                      {activeCity.simbolo}
                    </motion.span>
                    <div>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold mb-1 tracking-tight">{activeCity.nome}</h2>
                      <p className={`text-lg md:text-xl italic font-serif ${isDarkMode ? 'text-[#A7C957]' : 'text-[#2D5A27] opacity-80'}`}>
                        {activeCity.tagline}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-sm md:text-base leading-relaxed opacity-90 max-w-2xl font-light text-justify md:text-left">
                    {activeCity.historia.split('\n\n').map((paragrafo, index) => (
                      <p key={index}>{paragrafo}</p>
                    ))}
                  </div>
                </div>

                <div className={`space-y-4 p-6 md:p-8 rounded-[30px] border self-start ${
                  isDarkMode ? 'bg-[#253D23]/30 border-[#2D5A27]/20' : 'bg-[#FDFDFB] border-stone-100'
                }`}>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-center md:text-left">Pérolas da Cidade</h3>
                  {activeCity.curiosidades.map((c, i) => (
                    <div key={i} className="flex gap-3 text-xs md:text-sm leading-relaxed italic opacity-80">
                      <span className="text-[#BC8F8F]">✦</span>
                      <p>{c}</p>
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {activeGlossary.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className={`mb-10 p-6 rounded-[30px] border overflow-hidden ${
                      isDarkMode ? 'bg-[#2D5A27]/10 border-[#2D5A27]/30' : 'bg-emerald-50/30 border-emerald-100'
                    }`}
                  >
                    <h3 className={`text-[9px] font-bold uppercase tracking-[0.3em] mb-4 text-center md:text-left ${
                      isDarkMode ? 'text-[#A7C957]' : 'text-emerald-600'
                    }`}>
                      Dicionário Regional
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeGlossary.map(item => (
                        <div key={item.termo} className="text-xs">
                          <span className={`font-bold ${isDarkMode ? 'text-[#A7C957]' : 'text-emerald-700'}`}>
                            {item.termo}:
                          </span>
                          <p className="opacity-70 italic leading-snug">{item.def}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <h3 className="text-center text-[9px] font-bold uppercase tracking-[0.4em] opacity-30 mb-8">
                  Frutos da Nossa Terra
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {activeCity.alimentos.map(food => (
                    <motion.button 
                      key={food.nome} 
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedFood(food)}
                      className={`p-6 md:p-8 rounded-[30px] border flex flex-col items-center text-center transition-all cursor-pointer shadow-sm hover:shadow-md ${
                        isDarkMode ? 'bg-[#253D23]/20 border-[#2D5A27]/10' : 'bg-white border-stone-50'
                      }`}
                    >
                      <span className="text-5xl md:text-6xl mb-4">{food.emoji}</span>
                      <h4 className="font-serif font-bold text-lg md:text-xl mb-1">{food.nome}</h4>
                      <div className="flex gap-2">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#BC8F8F] border border-[#BC8F8F]/20 px-2 rounded-full">Nutrição</span>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#BC8F8F] border border-[#BC8F8F]/20 px-2 rounded-full">Receita</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="max-w-5xl mx-auto mt-16 mb-12 text-center flex flex-col items-center gap-6">
          <div className={`w-24 h-px ${isDarkMode ? 'bg-[#2D5A27]/30' : 'bg-stone-200'}`} />
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => setIsAboutOpen(true)}
              className={`group relative px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                isDarkMode 
                  ? 'bg-[#2D5A27] text-[#F9F9F7] border border-[#A7C957]/20 shadow-emerald-900/20' 
                  : 'bg-[#2D5A27] text-white shadow-[#2D5A27]/20'
              }`}
            >
              <span className="relative z-10">Conheça a Desenvolvedora</span>
              <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500" />
            </button>
            <div className="opacity-30 text-[10px] uppercase tracking-[0.4em] font-medium">
              Expedição Cariri • Juazeiro do Norte • {new Date().getFullYear()}
            </div>
          </div>
        </footer>

        <AnimatePresence>
          {isAboutOpen && (
            <AboutModal 
              isOpen={isAboutOpen} 
              onClose={() => setIsAboutOpen(false)} 
              isDarkMode={isDarkMode} 
              profileImg={profileImg} // Passando a imagem pré-carregada
            />
          )}
        </AnimatePresence>

        {selectedFood && (
          <FoodModal food={selectedFood} darkMode={isDarkMode} onClose={() => setSelectedFood(null)} />
        )}
      </div>
    </>
  );
}