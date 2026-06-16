import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Activity, Users, Heart, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export function NetworkOverview() {
  const [lastUpdated, setLastUpdated] = useState('17:10 hrs');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastUpdated(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} hrs`);
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Platform Performance Dashboard Section */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tight mb-4">Rendimiento de Plataforma</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 flex flex-col justify-between border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Tasa de Error</p>
                <div className="text-3xl font-black text-slate-800 mt-1">0.12%</div>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-tight">META: &lt;1%</span>
                <span className="text-[10px] font-bold text-emerald-600">-0.88pp</span>
              </div>
            </div>
            
            {/* Custom SVG Sparkline */}
            <div className="h-16 w-full relative mt-2">
              <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,10 C20,15 40,5 60,20 C80,30 95,35 100,35 L100,40 L0,40 Z" 
                  fill="url(#sparkline-gradient)" 
                />
                <path 
                  d="M0,10 C20,15 40,5 60,20 C80,30 95,35 100,35" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="2" 
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx="100" cy="35" r="3" fill="#10b981" />
              </svg>
            </div>
          </Card>
        </div>
      </div>

      {/* Impacto Global */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tight mb-4">Impacto Global</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Profesionales Capacitados</p>
                <div className="text-2xl font-black text-slate-800 mt-1">12,450</div>
                <div className="text-xs font-bold text-emerald-600 mt-2">+18.2% crecimiento</div>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </Card>

          <Card className="p-5 border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Pacientes Registrados</p>
                <div className="text-2xl font-black text-slate-800 mt-1">892k</div>
                <div className="text-xs font-bold text-emerald-600 mt-2">+24.7% crecimiento</div>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                <Heart className="w-5 h-5" />
              </div>
            </div>
          </Card>

          <Card className="p-5 border border-slate-200 flex flex-col justify-between">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Reducción de Mortalidad</p>
            <div className="text-2xl font-black text-slate-800 my-2">14.2%</div>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg self-start">
              <CheckCircle2 className="w-4 h-4" /> Meta superada
            </div>
          </Card>

          <Card className="p-5 border border-slate-200 relative overflow-hidden flex flex-col justify-between">
            {/* Subtle yellow blob */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-200 opacity-30 rounded-full blur-2xl pointer-events-none"></div>
            
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight relative z-10">ROI Educativo</p>
              <div className="text-2xl font-black text-slate-800 mt-1 relative z-10">315%</div>
            </div>
            
            <div className="mt-4 relative z-10">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                <span>Beneficios: $4.2M</span>
                <span>Costos: $1.0M</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[80%] rounded-full"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Cumplimiento y Seguridad */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tight mb-4">Cumplimiento y Seguridad</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 border border-slate-200 flex items-center gap-4">
             {/* Custom Donut Chart SVG */}
             <div className="relative w-14 h-14 shrink-0">
               <svg viewBox="0 0 36 36" className="w-full h-full">
                 <path
                   className="text-slate-100"
                   strokeWidth="3"
                   stroke="currentColor"
                   fill="none"
                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                 />
                 <path
                   className="text-amber-500"
                   strokeDasharray="87, 100"
                   strokeWidth="3"
                   strokeLinecap="round"
                   stroke="currentColor"
                   fill="none"
                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                 />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-800">
                 87%
               </div>
             </div>
             <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Adopción MFA</p>
                <div className="text-lg font-black text-slate-800 mt-0.5">87%</div>
             </div>
          </Card>

          <Card className="p-5 border border-slate-200">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Incidentes de Seguridad</p>
            <div className="text-2xl font-black text-slate-800 my-2">0</div>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded">
              <ShieldCheck className="w-3 h-3" /> Sin incidentes activos
            </div>
          </Card>

          <Card className="p-5 border border-slate-200 flex flex-col justify-between">
            <div>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Auditorías Completadas</p>
               <div className="text-2xl font-black text-slate-800 mt-1">24</div>
            </div>
            <div className="mt-auto">
               <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                  <span>Auto: 18</span>
                  <span>Manual: 6</span>
               </div>
               <div className="w-full flex h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: '75%' }}></div>
                  <div className="bg-slate-300 h-full" style={{ width: '25%' }}></div>
               </div>
            </div>
          </Card>

          <Card className="p-5 border border-slate-200 flex items-center gap-4">
             {/* Custom Donut Chart SVG */}
             <div className="relative w-14 h-14 shrink-0">
               <svg viewBox="0 0 36 36" className="w-full h-full">
                 <path
                   className="text-slate-100"
                   strokeWidth="3"
                   stroke="currentColor"
                   fill="none"
                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                 />
                 <path
                   className="text-emerald-500"
                   strokeDasharray="100, 100"
                   strokeWidth="3"
                   strokeLinecap="round"
                   stroke="currentColor"
                   fill="none"
                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                 />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-800">
                 100%
               </div>
             </div>
             <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Score HIPAA</p>
                <div className="text-lg font-black text-slate-800 mt-0.5">100%</div>
             </div>
          </Card>
        </div>
      </div>

      {/* Resumen Ejecutivo */}
      <div className="bg-[#1e2f4c] text-white rounded-xl p-4 flex flex-col md:flex-row items-center justify-between shadow-lg">
         <div className="text-sm font-medium mb-3 md:mb-0">
            43 instituciones, 99.98% uptime, reducción de mortalidad 14.2%, ROI 315%
         </div>
         <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-300">Última actualización: {lastUpdated}</span>
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded transition-colors font-bold disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              Actualizar datos
            </button>
         </div>
      </div>

    </div>
  );
}
