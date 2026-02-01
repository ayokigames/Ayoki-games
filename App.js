import React, { useState, useMemo, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Flame, 
  Trophy, 
  Clock, 
  LayoutGrid,
  Sigma,
  ChevronRight,
  Target,
  Terminal,
  Cpu,
  Zap,
  Play,
  ArrowLeft,
  Maximize,
  Settings,
  Shield,
  Ghost,
  X,
  ExternalLink,
  EyeOff,
  Keyboard
} from 'lucide-react';
import htm from 'htm';
import { GameCategory } from './types.js';
import { GAMES } from './data/games.js';

const html = htm.bind(React.createElement);

const SettingsModal = ({ isOpen, onClose, cloakEnabled, onToggleCloak }) => {
  if (!isOpen) return null;

  const launchStealth = () => {
    const url = window.location.href;
    const win = window.open();
    if (!win) {
      alert("Popup blocked! Please allow popups to initialize Stealth Engine.");
      return;
    }
    
    win.document.title = "about:blank";
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    win.document.body.style.backgroundColor = '#020617';
    
    const iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = url;
    
    win.document.body.appendChild(iframe);
    
    // Emergency redirect for the parent tab
    window.location.replace("https://start.dvusd.org/");
  };

  return html`
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick=${onClose}></div>
      <div className="relative w-full max-w-xl glass-panel border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-10 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-orbitron text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <${Settings} className="w-5 h-5 text-indigo-500" />
              Command Center Configuration
            </h2>
            <button onClick=${onClose} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
              <${X} className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 space-y-4">
              <div className="flex items-center gap-3 text-indigo-400">
                <${Ghost} className="w-5 h-5" />
                <h3 className="text-xs font-black uppercase tracking-widest">Stealth Engine</h3>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                Launches a new <code className="text-indigo-400">about:blank</code> tab and embeds Math Hub. The current tab will self-destruct to DVUSD Portal.
              </p>
              <button 
                onClick=${launchStealth}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-all shadow-lg shadow-indigo-600/20 uppercase text-[9px] tracking-widest"
              >
                <${ExternalLink} className="w-3 h-3" />
                Launch Cloaked Tab
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-slate-200">
                <${EyeOff} className="w-5 h-5 text-indigo-400" />
                <h3 className="text-xs font-black uppercase tracking-widest">Tab Masking</h3>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                Instantly renames this tab to "about:blank" and replaces the favicon.
              </p>
              <button 
                onClick=${onToggleCloak}
                className=${`w-full py-3 font-black rounded-xl transition-all uppercase text-[9px] tracking-widest border ${
                  cloakEnabled 
                    ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                }`}
              >
                ${cloakEnabled ? 'Active: about:blank' : 'Enable Masking'}
              </button>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-red-400">
                <${Shield} className="w-5 h-5" />
                <h3 className="text-xs font-black uppercase tracking-widest">Panic Protocol</h3>
              </div>
              <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-black text-slate-400">
                KEY: [ESC]
              </div>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
              Pressing the Panic Key (Escape) will instantly redirect all active sessions to the DVUSD login portal. 
            </p>
          </div>

          <div className="flex justify-center text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em]">
            Logic Hub v2.6.0-Security
          </div>
        </div>
      </div>
    </div>
  `;
};

const Navbar = ({ onSearch, onOpenSettings }) => {
  return html`
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-12">
        <${Link} to="/" className="flex items-center gap-3 group shrink-0">
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-indigo-500/50 shadow-lg">
            <${Sigma} className="w-5 h-5 text-white" />
          </div>
          <span className="font-orbitron text-xl font-black tracking-tighter text-white uppercase hidden sm:inline">
            Math Hub<span className="text-indigo-500">.</span>
          </span>
        <//>

        <div className="flex-1 max-w-2xl relative group">
          <${Search} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400" />
          <input 
            type="text" 
            placeholder="Search Training Modules..." 
            onInput=${(e) => onSearch(e.target.value)}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all text-slate-200 placeholder:text-slate-600"
          />
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick=${onOpenSettings}
            className="p-2.5 rounded-xl glass-panel border border-white/5 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all"
            title="Settings"
          >
            <${Settings} className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-6 shrink-0 text-[10px] font-bold text-slate-500 tracking-widest uppercase hidden lg:flex">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              System Online
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
};

const Sidebar = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Modules', icon: LayoutGrid },
    { id: GameCategory.ACTION, name: 'Combat Logic', icon: Flame },
    { id: GameCategory.PUZZLE, name: 'Spatial Solving', icon: Trophy },
    { id: GameCategory.STRATEGY, name: 'Tactical Planning', icon: Target },
    { id: GameCategory.RETRO, name: 'Legacy Archive', icon: Clock },
  ];

  return html`
    <aside className="w-72 hidden xl:block sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-4">
      <div className="space-y-1">
        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-6">Directory</p>
        ${categories.map((cat) => html`
          <button
            key=${cat.id}
            onClick=${() => onCategoryChange(cat.id)}
            className=${`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all group ${
              activeCategory === cat.id 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <${cat.icon} className=${`w-4 h-4 ${activeCategory === cat.id ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
              ${cat.name}
            </div>
            ${activeCategory === cat.id && html`<div className="w-1 h-4 bg-indigo-500 rounded-full"></div>`}
          </button>
        `)}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/10 space-y-4">
        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Training Stats</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-medium">
            <span className="text-slate-500">Global Proficiency</span>
            <span className="text-slate-300">92%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="w-[92%] h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
          </div>
        </div>
      </div>
    </aside>
  `;
};

const GameCard = ({ game }) => {
  return html`
    <${Link} 
      to="/game/${game.id}"
      className="command-card group flex flex-col h-full glass-panel rounded-2xl overflow-hidden border border-white/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src="${game.thumbnail}" 
          alt="${game.title}"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-70 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0"
        />
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[9px] font-black text-white/80 uppercase tracking-widest border border-white/10">
          ${game.category}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-orbitron text-base font-bold text-slate-100 group-hover:text-indigo-400 transition-colors mb-2 text-ellipsis overflow-hidden whitespace-nowrap">
            ${game.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium mb-4">
            ${game.description}
          </p>
        </div>
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-indigo-500/80">
          <div className="flex items-center gap-1.5">
            <${Play} className="w-3 h-3 fill-indigo-500/30" />
            Launch Module
          </div>
        </div>
      </div>
    <//>
  `;
};

const HomePage = ({ games, searchQuery, activeCategory }) => {
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory]);

  return html`
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      ${searchQuery === '' && activeCategory === 'all' && html`
        <header className="relative h-[400px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-12 lg:px-20">
            <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] tracking-[0.4em] uppercase mb-4">
              <${Zap} className="w-4 h-4 fill-indigo-400" />
              Strategic Optimization
            </div>
            <h1 className="font-orbitron text-5xl lg:text-6xl font-black text-white mb-6 leading-none tracking-tighter uppercase">
              COGNITIVE <br />COMMAND
            </h1>
            <p className="text-slate-400 text-lg max-w-xl font-medium mb-10 leading-relaxed">
              Secure baseline for high-performance interactive training modules and tactical coordination.
            </p>
            <div className="flex gap-4">
              <${Link} to="/game/kindergarten" className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-all shadow-xl shadow-indigo-600/30 uppercase text-xs tracking-[0.2em]">
                Initialize Primary Session
                <${ChevronRight} className="w-4 h-4" />
              <//>
            </div>
          </div>
        </header>
      `}

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-4">
            <${Terminal} className="w-4 h-4 text-indigo-500" />
            ${activeCategory === 'all' ? 'Active Operations' : activeCategory}
          </h2>
          <div className="h-[1px] flex-1 bg-white/5 mx-8 hidden sm:block"></div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            ${filteredGames.length} Active Vectors
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          ${filteredGames.map(game => html`<${GameCard} key=${game.id} game=${game} />`)}
        </div>
      </section>
    </div>
  `;
};

const GameDetail = ({ games }) => {
  const { pathname } = useLocation();
  const gameId = pathname.split('/').pop();
  const game = useMemo(() => games.find(g => g.id === gameId), [games, gameId]);
  const iframeRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [game]);

  const toggleFullScreen = () => {
    const el = iframeRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  if (!game) return html`
    <div className="p-20 text-center font-orbitron text-slate-700 flex flex-col items-center gap-6">
      <div className="text-4xl">404</div>
      <div className="text-sm uppercase tracking-widest">ERROR: MODULE_NOT_FOUND</div>
      <${Link} to="/" className="text-indigo-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">Return to Base<//>
    </div>
  `;

  return html`
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between mb-2">
        <${Link} to="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
          <${ArrowLeft} className="w-3 h-3" />
          Back to Directory
        <//>
        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
          Session: ${game.id.toUpperCase()}
        </div>
      </div>

      <div className="relative group aspect-video w-full bg-black rounded-[2rem] overflow-hidden border border-white/5 shadow-[0_0_100px_-20px_rgba(99,102,241,0.2)]">
        <iframe 
          ref=${iframeRef}
          src="${game.url}" 
          title="${game.title}"
          className="w-full h-full border-0"
          allow="autoplay; fullscreen; keyboard; gamepad; microphone; camera; midi; encrypted-media; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-storage-access-by-user-activation"
          allowFullScreen
          loading="lazy"
        />
        <button 
          onClick=${toggleFullScreen}
          className="absolute bottom-6 right-6 p-3 bg-black/60 backdrop-blur-xl border border-white/10 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:scale-110 active:scale-95"
          title="Full Screen Mode"
        >
          <${Maximize} className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-4xl space-y-6">
        <div className="space-y-4">
          <h1 className="font-orbitron text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter">${game.title}</h1>
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-indigo-600/10 text-indigo-400 text-[10px] font-black rounded-lg border border-indigo-500/20 uppercase tracking-widest">
              ${game.category}
            </span>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              Stability: Optimal
            </span>
          </div>
        </div>
        <p className="text-slate-400 text-lg leading-relaxed font-medium">
          ${game.description}
        </p>
      </div>
    </div>
  `;
};

const MathHubApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [cloakEnabled, setCloakEnabled] = useState(false);

  // Persistence of settings
  useEffect(() => {
    const savedCloak = localStorage.getItem('mathhub_cloak') === 'true';
    setCloakEnabled(savedCloak);
  }, []);

  // Panic Key listener and Cloak effect
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        window.location.replace("https://start.dvusd.org/");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    if (cloakEnabled) {
      document.title = "about:blank";
      // Optional: Add a favicon cloaker here if needed
    } else {
      document.title = "Math Hub | Command Center";
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cloakEnabled]);

  const toggleCloak = () => {
    const newVal = !cloakEnabled;
    setCloakEnabled(newVal);
    localStorage.setItem('mathhub_cloak', newVal.toString());
  };

  return html`
    <${Router}>
      <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
        <${Navbar} 
          onSearch=${setSearchQuery} 
          onOpenSettings=${() => setIsSettingsOpen(true)} 
        />
        
        <main className="flex-1 max-w-[1600px] mx-auto w-full px-6 py-12 flex gap-12">
          <${Sidebar} activeCategory=${activeCategory} onCategoryChange=${setActiveCategory} />
          
          <div className="flex-1 min-w-0">
            <${Routes}>
              <${Route} path="/" element=${html`<${HomePage} games=${GAMES} searchQuery=${searchQuery} activeCategory=${activeCategory} />`} />
              <${Route} path="/game/:id" element=${html`<${GameDetail} games=${GAMES} />`} />
            <//>
          </div>
        </main>

        <${SettingsModal} 
          isOpen=${isSettingsOpen} 
          onClose=${() => setIsSettingsOpen(false)} 
          cloakEnabled=${cloakEnabled}
          onToggleCloak=${toggleCloak}
        />

        <footer className="glass-panel border-t border-white/5 py-12 px-6 text-center mt-auto">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 opacity-30">
            <div className="flex items-center gap-2">
              <${Sigma} className="w-4 h-4 text-indigo-400" />
              <span className="font-orbitron font-black uppercase text-[10px] tracking-widest text-white">Math Hub Command</span>
            </div>
            <div className="flex gap-8 text-[9px] font-bold uppercase tracking-widest text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Directory Rules</a>
              <a href="#" className="hover:text-white transition-colors">Global Network</a>
              <a href="#" className="hover:text-white transition-colors">Support Base</a>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">© 2025 COMMAND CENTER</span>
          </div>
        </footer>
      </div>
    <//>
  `;
};

export default MathHubApp;