import React from 'react';
import { Card } from '../ui/Card';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Line, ComposedChart
} from 'recharts';

export function CapacityManagement({ t }: { t: (en: string, es: string) => string }) {
  const userGrowthData = [
    { month: 'Jan', current: 8000, projected: null },
    { month: 'Feb', current: 9500, projected: null },
    { month: 'Mar', current: 10200, projected: null },
    { month: 'Apr', current: 11000, projected: null },
    { month: 'May', current: 12450, projected: 12450 },
    { month: 'Jun', current: null, projected: 13200 },
    { month: 'Jul', current: null, projected: 14100 },
  ];

  const datasetVolumeData = [
    { month: 'Jan', current: 400, projected: null },
    { month: 'Feb', current: 450, projected: null },
    { month: 'Mar', current: 520, projected: null },
    { month: 'Apr', current: 600, projected: null },
    { month: 'May', current: 680, projected: null },
    { month: 'Jun', current: null, projected: 850 },
    { month: 'Jul', current: null, projected: 1050 },
  ];

  return (
    <div className="space-y-6">
      <div>
         <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight">{t('Capacity Management', 'Gestión de Capacidad')}</h3>
         <p className="text-xs text-slate-500 mt-1">{t('Monitor network resource utilization and forecast ecosystem scalability.', 'Supervisa la utilización de recursos de la red y pronostica la escalabilidad.')}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border-t-4 border-t-blue-500">
           <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight">{t('ACTIVE USERS', 'USUARIOS ACTIVOS')}</p>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Q3 PROJECTION</span>
           </div>
           <div className="flex items-end gap-3">
              <div className="text-3xl font-black text-[#003366]">12,450</div>
              <div className="text-sm font-bold text-slate-400 mb-1 flex items-center gap-1">
                 → <span className="text-slate-600">14,100</span>
              </div>
           </div>
        </Card>
        <Card className="p-5 border-t-4 border-t-emerald-500">
           <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight">{t('NETWORK INSTITUTIONS', 'INSTITUCIONES EN RED')}</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Q3 PROJECTION</span>
           </div>
           <div className="flex items-end gap-3">
              <div className="text-3xl font-black text-[#003366]">43</div>
              <div className="text-sm font-bold text-slate-400 mb-1 flex items-center gap-1">
                 → <span className="text-slate-600">58</span>
              </div>
           </div>
        </Card>
        <Card className="p-5 border-t-4 border-t-purple-500">
           <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight">{t('SIMULATION DATASETS', 'DATASETS SIMULACIÓN')}</p>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Q3 PROJECTION</span>
           </div>
           <div className="flex items-end gap-3">
              <div className="text-3xl font-black text-[#003366]">680 <span className="text-lg">GB</span></div>
              <div className="text-sm font-bold text-slate-400 mb-1 flex items-center gap-1">
                 → <span className="text-slate-600">1,050 <span className="text-xs">GB</span></span>
              </div>
           </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-5">
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-4">{t('USER GROWTH & PROJECTION', 'CRECIMIENTO Y PROYECCIÓN DE USUARIOS')}</h4>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                     <defs>
                        <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} />
                     <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                     <Area type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" name="Current Users" />
                     <Area type="monotone" dataKey="projected" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" fill="none" name="Projected Trajectory" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
               <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div> Current Users
               </div>
               <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div> Projected Trajectory
               </div>
            </div>
         </Card>

         <Card className="p-5">
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-4">{t('DATASET VOLUME PROJECTION (GB)', 'PROYECCIÓN VOLUMEN DATASET (GB)')}</h4>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={datasetVolumeData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} />
                     <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                     <Bar dataKey="current" fill="#0f1f3a" radius={[4, 4, 0, 0]} name="Current Storage" barSize={30} />
                     <Line type="monotone" dataKey="projected" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} name="Projected Needs" />
                  </ComposedChart>
               </ResponsiveContainer>
            </div>
             <div className="flex items-center justify-center gap-4 mt-2">
               <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <div className="w-2 h-2 rounded bg-[#0f1f3a]"></div> Current Storage (GB)
               </div>
               <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <div className="w-2 h-0.5 bg-red-500"></div> Projected Needs
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
}
