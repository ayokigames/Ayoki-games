import React, { useState, useMemo, useEffect, useRef } from 'react';

import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Flame, 
  Clock, 
  LayoutGrid,
  Sigma,
  ChevronRight,
  Target,
  Terminal,
  Play,
  ArrowLeft,
  Maximize,
  Settings,
  Shield,
  Ghost,
  EyeOff,
  Sparkles,
  ExternalLink,
  Lock,
  Cpu,
  Zap,
  Layers,
  Trash2,
  Sun
  Sun,
  Maximize,
  Terminal
} from 'lucide-react';
import htm from 'htm';
import { GameCategory } from './types.ts';
@@ -130,17 +126,17 @@ const SettingsView = ({ cloakEnabled, onToggleCloak, performanceSettings, onUpda
            <button onClick=${() => onUpdatePerformance('gpuBoost', !performanceSettings.gpuBoost)} className=${`flex flex-col p-6 rounded-[2rem] border transition-all text-left ${performanceSettings.gpuBoost ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-slate-900/50 border-white/5 hover:bg-white/5'}`}>
              <${Cpu} className=${`w-6 h-6 mb-4 ${performanceSettings.gpuBoost ? 'text-indigo-400' : 'text-slate-600'}`} />
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Hardware Uplink</h3>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Enable GPU-accelerated frame buffering.</p>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Enable GPU frame buffering.</p>
            </button>
            <button onClick=${() => onUpdatePerformance('ultraLight', !performanceSettings.ultraLight)} className=${`flex flex-col p-6 rounded-[2rem] border transition-all text-left ${performanceSettings.ultraLight ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-slate-900/50 border-white/5 hover:bg-white/5'}`}>
              <${Sun} className=${`w-6 h-6 mb-4 ${performanceSettings.ultraLight ? 'text-indigo-400' : 'text-slate-600'}`} />
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Resource Saver</h3>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Strip blurs and shadows for high FPS.</p>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Strip blurs and shadows.</p>
            </button>
            <button onClick=${() => { localStorage.clear(); window.location.reload(); }} className="flex flex-col p-6 rounded-[2rem] border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 transition-all text-left group">
              <${Trash2} className="w-6 h-6 mb-4 text-red-400 group-hover:scale-110 transition-transform" />
              <${Trash2} className="w-6 h-6 mb-4 text-red-400" />
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Wipe Memory</h3>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Clear all local cache and refresh hub.</p>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Clear cache and refresh.</p>
            </button>
          </div>
        </section>
@@ -260,11 +256,6 @@ const GameView = ({ games, performanceSettings }) => {
    }
  }, [game]);

  const handleLoad = () => {
    setProgress(100);
    setTimeout(() => setIsLoading(false), 300);
  };

  if (!game) return html`<div className="p-40 text-center font-orbitron text-slate-500">ERR: MODULE_MISSING</div>`;

  return html`
@@ -276,19 +267,14 @@ const GameView = ({ games, performanceSettings }) => {
        <//>
      </div>

      <div className=${`group relative aspect-video w-full bg-slate-950 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl ${performanceSettings.gpuBoost ? 'gpu-uplink' : ''}`}>
        <iframe src="${game.url}" className="w-full h-full border-0" allow="autoplay; fullscreen; keyboard" onLoad=${handleLoad} />
      <div className=${`group relative aspect-video w-full bg-slate-950 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl`}>
        <iframe src="${game.url}" className="w-full h-full border-0" allow="autoplay; fullscreen; keyboard" onLoad=${() => setIsLoading(false)} />
        ${isLoading && html`
          <div className="absolute inset-0 bg-[#020617] flex flex-col items-center justify-center z-50">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
            </div>
            <div className="w-48 space-y-3">
              <p className="text-[10px] font-black text-white uppercase tracking-widest text-center">Decrypting Module...</p>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-300 shadow-[0_0_8px_#6366f1]" style=${{ width: `${progress}%` }}></div>
              </div>
            </div>
            <p className="text-[10px] font-black text-white uppercase tracking-widest text-center">Decrypting Module...</p>
          </div>
        `}
      </div>
@@ -327,10 +313,10 @@ const MathHubApp = () => {
  }, []);

  useEffect(() => {
    localStorage.setItem('hub_performance', JSON.stringify(performanceSettings));
    document.body.classList.toggle('ultra-light', performanceSettings.ultraLight);
    // FIX: Convert boolean cloakEnabled to string to satisfy localStorage.setItem type requirement
    localStorage.setItem('hub_cloak', String(cloakEnabled));
    document.title = cloakEnabled ? "Google Docs" : "Math Hub | Command Center";
  }, [performanceSettings, cloakEnabled]);
  }, [cloakEnabled]);

  const updatePerformance = (key, val) => setPerformanceSettings(p => ({ ...p, [key]: val }));

@@ -355,19 +341,9 @@ const MathHubApp = () => {
          <//>
        </div>
      </main>
      
      <footer className="glass-panel border-t border-white/5 py-12 px-6 mt-20 opacity-30 text-center">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-3">
            <${Sigma} className="w-4 h-4 text-indigo-500" />
            <span>Terminal Version 5.2.0-Alpha</span>
          </div>
          <span>Status: Uplink Secure</span>
        </div>
      </footer>
    </div>
  `;
};

const RootWrapper = () => html`<${Router}><${MathHubApp} /><//>`;
export default RootWrapper;
export default RootWrapper;
