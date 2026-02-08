'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import NeoCardFloatingBadge from './components/NeoCardFloatingBadge';

import { 
  Cross, 
  MapPin, 
  Calendar, 
  Check, 
  X, 
  ArrowRight,
  Music,
  Instagram,
  Quote,
  Zap,
  Menu
} from 'lucide-react';

// --- DATA ADO / MODERNE ---
const DATA = {
  name: "THOMAS",
  event: "Profession de Foi",
  date: "14 Juin 2026",
  hashtag: "#ThomasFaith2026",
  verse: "Je suis la lumière du monde. Celui qui me suit ne marchera pas dans les ténèbres.",
  verseRef: "Jean 8:12",
  church: {
    name: "Cathédrale Notre-Dame de Sion",
    address: "Rue de la Cathédrale 13, 1950 Sion",
    time: "10h30",
    map: "https://maps.app.goo.gl/HJCoCcaJembNpfHx9"
  },
  party: {
    name: "Garden Party",
    address: "Rue des châteaux 18, 1950 Sion",
    time: "12h30",
    map: "https://maps.app.goo.gl/T8WKRfkV3dyd2NEt5"
  },
  images: {
    hero: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1920&auto=format&fit=crop", 
    portrait: "https://images.pexels.com/photos/31493424/pexels-photo-31493424.jpeg", 
  }
};

export default function CommunionPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isRsvpOpen, setRsvpOpen] = useState(false);

  // --- LOGIN LOGIC ---
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (passwordInput.toUpperCase() === 'THOMAS26') {
      setIsAuthenticated(true);
    }
  };

  // Confetti Electrique
  useEffect(() => {
    if (isAuthenticated) {
        const end = Date.now() + 1500;
        const colors = ['#3b82f6', '#ffffff', '#6366f1'];
        (function frame() {
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });
        if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }
  }, [isAuthenticated]);

  // --- LOGIN SCREEN (DARK MODE) ---
  if (!isAuthenticated) {
    return (
        <div className="h-screen w-full bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
             {/* BACKGROUND GLOWS */}
             <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
             <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                   <NeoCardFloatingBadge theme="light" />

             <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="z-10 w-full max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/20"
             >
                 <div className="mb-10 text-center">
                    <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,99,235,0.5)] transform -rotate-6">
                        <Cross className="text-white w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">{DATA.event}</h1>
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
                        <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest">Espace Privé</p>
                    </div>
                 </div>

                 <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative group">
                        <input 
                            type="password" 
                            placeholder="CODE ACCÈS" 
                            className="w-full bg-black/30 border border-white/10 p-5 rounded-2xl text-center text-xl font-bold tracking-[0.2em] text-white outline-none focus:border-blue-500 focus:bg-black/50 transition-all uppercase placeholder:text-white/20 placeholder:tracking-normal placeholder:font-medium"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                    </div>
                    
                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 group">
                        <span>DÉVERROUILLER</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </form>
                 <p className="text-center text-slate-500 text-xs mt-8">Code invité : <span className="text-slate-300 font-mono">THOMAS26</span></p>
             </motion.div>
        </div>
    )
  }

  // --- MAIN SITE (DARK MODE) ---
  return (
    <div className="bg-[#020617] text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <QuoteSection />
      <DetailsSection />
      <TimelineSection />
      <InstaTeaser />
        <NeoCardFloatingBadge theme="light" />

      
      {/* RSVP Fixed Button */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-6">
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setRsvpOpen(true)}
          className="pointer-events-auto w-full max-w-md bg-white text-blue-900 py-4 rounded-2xl font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 border-2 border-transparent hover:border-blue-400 transition-all"
        >
           Confirmer ma venue <ArrowRight size={18} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isRsvpOpen && <RsvpModal onClose={() => setRsvpOpen(false)} />}
      </AnimatePresence>

      <footer className="py-24 text-center bg-[#0f172a] border-t border-white/5 mt-12 pb-32">
        <h2 className="text-4xl font-black text-white/10 uppercase tracking-tighter select-none">{DATA.hashtag}</h2>
      </footer>
    </div>
  );
}

// --- COMPONENTS ---

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
            <div className="text-xl font-black tracking-tighter">{DATA.name}.</div>
            <div className="text-xs font-bold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                {DATA.date}
            </div>
        </nav>
    )
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-20">
       {/* Background Image */}
       <div className="absolute inset-0 z-0 m-4 rounded-[3rem] overflow-hidden border border-white/10">
          <motion.div style={{ y }} className="absolute inset-0">
             <img src={DATA.images.hero} className="w-full h-full object-cover opacity-60" alt="Hero" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
          </motion.div>
       </div>

       {/* Floating Title */}
       <div className="relative z-10 px-6 mt-auto mb-20">
          <motion.div 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
              <span className="inline-block px-4 py-1 rounded-full bg-blue-600/20 border border-blue-500/50 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                Save The Date
              </span>
              <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-6 drop-shadow-2xl">
                PROFESSION<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">DE FOI</span>
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-slate-300 font-medium">
                  <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-blue-500" /> {DATA.date}
                  </div>
                  <div className="hidden md:block w-1 h-1 bg-slate-500 rounded-full" />
                  <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-blue-500" /> Cathédrale Dame de Sion
                  </div>
              </div>
          </motion.div>
       </div>
    </section>
  );
}

function QuoteSection() {
    return (
        <section className="py-24 px-6 bg-[#020617]">
            <div className="max-w-3xl mx-auto text-center relative">
                <Quote className="w-16 h-16 text-blue-900/30 absolute -top-8 -left-8 -z-10" />
                <TypewriterText text={DATA.verse} />
                <div className="mt-8 inline-flex items-center gap-2 text-blue-500 font-bold uppercase tracking-widest text-sm border border-blue-500/20 px-4 py-2 rounded-lg bg-blue-500/10">
                    <Zap size={14} fill="currentColor" /> {DATA.verseRef}
                </div>
            </div>
        </section>
    )
}

function TypewriterText({ text }: { text: string }) {
    return (
        <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, textShadow: "0 0 0px #3b82f6" }}
                    whileInView={{ opacity: 1, textShadow: "0 0 10px #3b82f6" }}
                    transition={{ delay: index * 0.03 }}
                >
                    {char}
                </motion.span>
            ))}
        </h3>
    )
}

function DetailsSection() {
    return (
        <section className="py-12 px-4">
            <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Eglise Card */}
                <div className="bg-[#0f172a] p-8 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                        <Cross size={150} className="text-white" />
                    </div>
                    <div className="relative z-10">
                        <span className="text-blue-400 font-bold uppercase tracking-wider text-xs mb-2 block">10H30 • Cérémonie</span>
                        <h3 className="text-3xl font-black text-white mb-2">{DATA.church.name}</h3>
                        <p className="text-slate-400 mb-8 max-w-xs">{DATA.church.address}</p>
                        <a href={DATA.church.map} target="_blank" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-all">
                            <MapPin size={16} /> GPS
                        </a>
                    </div>
                </div>

                {/* Party Card */}
                <div className="bg-gradient-to-br from-blue-700 to-indigo-800 p-8 rounded-[2rem] text-white hover:from-blue-600 hover:to-indigo-700 transition-all group relative overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.2)]">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                        <Music size={150} />
                    </div>
                    <div className="relative z-10">
                        <span className="text-blue-200 font-bold uppercase tracking-wider text-xs mb-2 block">12H30 • Garden Party</span>
                        <h3 className="text-3xl font-black text-white mb-2">{DATA.party.name}</h3>
                        <p className="text-blue-100 mb-8 max-w-xs">{DATA.party.address}</p>
                        <a href={DATA.party.map} target="_blank" className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-6 py-3 rounded-xl font-bold text-sm border border-white/10 hover:bg-black/30 transition-all">
                            <MapPin size={16} /> GPS
                        </a>
                    </div>
                </div>

            </div>
        </section>
    )
}

function TimelineSection() {
    return (
        <section className="py-24 px-6 overflow-hidden">
             <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-16">
                 <div className="w-full md:w-1/2 relative">
                     <motion.div 
                        whileHover={{ scale: 1.02, rotate: -2 }}
                        className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl rotate-2 border-4 border-blue-900/30"
                     >
                         <img src={DATA.images.portrait} className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Thomas" />
                         <div className="absolute inset-0 bg-blue-500/10 pointer-events-none mix-blend-overlay"></div>
                     </motion.div>
                     {/* Graphic element */}
                     <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-40 z-0"></div>
                 </div>

                 <div className="w-full md:w-1/2">
                     <h2 className="text-4xl font-black text-white mb-8">MON PARCOURS</h2>
                     <div className="space-y-8 border-l-2 border-slate-800 pl-8 relative">
                         <TimelineItem year="2012" title="Baptême" desc="L'entrée dans la communauté." />
                         <TimelineItem year="2020" title="1ère Communion" desc="La première rencontre." />
                         <TimelineItem year="2026" title="Profession de Foi" desc="Je confirme mon choix et je m'engage." active />
                     </div>
                 </div>
             </div>
        </section>
    )
}

function TimelineItem({ year, title, desc, active }: any) {
    return (
        <div className="relative group">
            <span className={`absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 border-[#020617] ${active ? 'bg-blue-500 shadow-[0_0_15px_#3b82f6]' : 'bg-slate-700'}`}></span>
            <span className={`text-sm font-bold ${active ? 'text-blue-400' : 'text-slate-500'} mb-1 block`}>{year}</span>
            <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h4>
            <p className="text-slate-400 text-sm">{desc}</p>
        </div>
    )
}

function InstaTeaser() {
    return (
        <section className="py-12 bg-[#0f172a] text-white overflow-hidden relative border-y border-white/5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="container mx-auto px-6 text-center relative z-10 py-12">
                <Instagram className="w-12 h-12 mx-auto mb-6 text-pink-500" />
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Partagez vos moments</h2>
                <div className="inline-block bg-white/5 backdrop-blur border border-white/10 px-8 py-4 rounded-2xl text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
                    {DATA.hashtag}
                </div>
            </div>
        </section>
    )
}

// --- RSVP MODAL (Dark Modern) ---
function RsvpModal({ onClose }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none"
    >
       <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
       
       <div className="bg-[#0f172a] w-full max-w-md rounded-[2rem] p-8 shadow-2xl relative pointer-events-auto overflow-hidden border border-white/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white"><X size={20} /></button>
          
          <div className="mb-8">
              <h3 className="text-2xl font-black text-white uppercase">Confirmation</h3>
              <p className="text-slate-400 font-medium">On compte sur vous !</p>
          </div>
          
          <div className="space-y-4">
             <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nom / Prénom</label>
                <input type="text" className="w-full bg-black/30 border border-white/10 p-4 rounded-xl font-bold text-white outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600" placeholder="Thomas & Famille" />
             </div>
             
             <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Présence</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                    <label className="cursor-pointer">
                        <input type="radio" name="presence" className="peer sr-only" />
                        <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center font-bold text-slate-400 peer-checked:border-blue-500 peer-checked:text-blue-400 peer-checked:bg-blue-500/10 transition-all">
                            Je viens 👍
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" name="presence" className="peer sr-only" />
                        <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center font-bold text-slate-400 peer-checked:border-slate-500 peer-checked:text-slate-300 peer-checked:bg-white/5 transition-all">
                            Désolé 👎
                        </div>
                    </label>
                </div>
             </div>

             <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Message (Optionnel)</label>
                <textarea className="w-full bg-black/30 border border-white/10 p-4 rounded-xl font-medium text-white outline-none focus:border-blue-500 transition-colors h-24 resize-none placeholder:text-slate-600" placeholder="Trop hâte !"></textarea>
             </div>
             
             <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] mt-2 transition-transform active:scale-95">
                Envoyer
             </button>
          </div>
       </div>
    </motion.div>
  );
}