import React from 'react';
import { Card } from '../ui/Card';
import { Activity, ShieldCheck, Heart, AlertCircle, CheckCircle2 } from 'lucide-react';
import { NetworkOverview } from '../NetworkOverview';

export function GovernanceOverview({ t }: { t: (en: string, es: string) => string }) {
  return (
    <div className="space-y-6">
      {/* Network Overview section */}
      <NetworkOverview />

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 flex flex-col justify-between">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('TOTAL USERS', 'TOTAL USUARIOS')}</p>
          <div className="text-3xl font-black text-[#003366]">4,892</div>
          <p className="text-amber-500 text-xs mt-2 font-medium bg-amber-50 px-2 py-0.5 rounded self-start">+12 {t('pending approvals', 'aprob. pendientes')}</p>
        </Card>
        <Card className="p-5 flex flex-col justify-between">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('ACTIVE INSTITUTIONS', 'INSTITUCIONES ACTIVAS')}</p>
          <div className="text-3xl font-black text-[#003366]">43</div>
          <p className="text-slate-500 text-xs mt-2 font-medium">2 {t('suspended globally', 'suspendidas globalmente')}</p>
        </Card>
        <Card className="p-5 flex flex-col justify-between">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('CLINICAL REGISTRIES', 'REGISTROS CLÍNICOS')}</p>
          <div className="text-3xl font-black text-[#003366]">18.4K</div>
          <p className="text-emerald-500 text-xs mt-2 font-medium flex items-center gap-1"><Activity className="w-3 h-3" /> +5% {t('processed', 'procesados')}</p>
        </Card>
        <Card className="p-5 flex flex-col justify-between border-l-4 border-l-red-500">
          <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight mb-2 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> {t('CRITICAL EVENTS', 'EVENTOS CRÍTICOS')}</p>
          <div className="text-3xl font-black text-red-500">7</div>
          <p className="text-red-500 text-xs mt-2 font-bold cursor-pointer hover:underline">{t('Action Required', 'Acción Requerida')} →</p>
        </Card>
      </div>

      {/* Security & Access / Ecosystem Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
               <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-slate-400" />
                 {t('SECURITY & ACCESS', 'SEGURIDAD Y ACCESO')}
               </h3>
               <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 uppercase bg-indigo-50 px-2 py-1 rounded">{t('View Audit Log', 'Ver Log Auditoría')} →</button>
            </div>
            <table className="w-full text-sm text-left">
               <thead className="bg-slate-50/50">
                 <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                   <th className="px-5 py-2">{t('METRIC', 'MÉTRICA')}</th>
                   <th className="px-5 py-2 text-right">{t('VALUE', 'VALOR')}</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 <tr>
                   <td className="px-5 py-3 font-medium text-slate-700">{t('Active Sessions', 'Sesiones Activas')}</td>
                   <td className="px-5 py-3 text-right font-bold text-slate-900">1,204</td>
                 </tr>
                 <tr>
                   <td className="px-5 py-3 font-medium text-slate-700">{t('Failed Access Attempts (24h)', 'Intentos Fallidos (24h)')}</td>
                   <td className="px-5 py-3 text-right font-bold text-amber-600 border-l-2 border-transparent">86</td>
                 </tr>
                 <tr>
                   <td className="px-5 py-3 font-medium text-slate-700">{t('Suspended Accounts', 'Cuentas Suspendidas')}</td>
                   <td className="px-5 py-3 text-right font-bold text-red-600 border-l-2 border-transparent">14</td>
                 </tr>
                 <tr>
                   <td className="px-5 py-3 font-medium text-slate-700">{t('Temporary Delegations', 'Delegaciones Temporales')}</td>
                   <td className="px-5 py-3 text-right font-bold text-slate-900">3</td>
                 </tr>
               </tbody>
            </table>
         </Card>

         <Card className="overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
               <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight flex items-center gap-2">
                 <Activity className="w-4 h-4 text-slate-400" />
                 {t('ECOSYSTEM ACTIVITY', 'ACTIVIDAD DEL ECOSISTEMA')}
               </h3>
               <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 uppercase bg-indigo-50 px-2 py-1 rounded">{t('View Metrics', 'Ver Métricas')} →</button>
            </div>
            <table className="w-full text-sm text-left">
               <thead className="bg-slate-50/50">
                 <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                   <th className="px-5 py-2">{t('METRIC', 'MÉTRICA')}</th>
                   <th className="px-5 py-2 text-right">{t('VALUE', 'VALOR')}</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 <tr>
                   <td className="px-5 py-3 font-medium text-slate-700">{t('Active Courses', 'Cursos Activos')}</td>
                   <td className="px-5 py-3 text-right font-bold text-slate-900">124</td>
                 </tr>
                 <tr>
                   <td className="px-5 py-3 font-medium text-slate-700">{t('Tele-sim Events (Month)', 'Eventos Telesim (Mes)')}</td>
                   <td className="px-5 py-3 text-right font-bold text-slate-900">89</td>
                 </tr>
                 <tr>
                   <td className="px-5 py-3 font-medium text-slate-700">{t('Open Support Tickets', 'Tickets Abiertos')}</td>
                   <td className="px-5 py-3 text-right font-bold text-amber-600">22</td>
                 </tr>
                 <tr>
                   <td className="px-5 py-3 font-medium text-slate-700">{t('SLA Breaches', 'Incumplimientos SLA')}</td>
                   <td className="px-5 py-3 text-right font-bold text-red-600">2</td>
                 </tr>
               </tbody>
            </table>
         </Card>
      </div>

      {/* Region Details } */}
      <div className="mt-8">
         <h3 className="text-sm font-bold text-slate-700 uppercase mb-4">{t('REGION DETAILS', 'DETALLES DE REGIÓN')}</h3>
         <Card className="overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="bg-slate-50 border-b border-slate-200">
                 <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                   <th className="px-4 py-3">{t('REGION', 'REGIÓN')}</th>
                   <th className="px-4 py-3">{t('COUNTRY', 'PAÍS')}</th>
                   <th className="px-4 py-3">{t('INSTITUTIONS', 'INSTITUCIONES')}</th>
                   <th className="px-4 py-3">{t('PROFESSIONALS', 'PROFESIONALES')}</th>
                   <th className="px-4 py-3">{t('STATUS', 'ESTADO')}</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 <tr className="hover:bg-slate-50 text-xs">
                   <td className="px-4 py-3 font-medium text-slate-800">Latinoamérica</td>
                   <td className="px-4 py-3 text-slate-600">México, Colombia, Argentina</td>
                   <td className="px-4 py-3 font-bold text-slate-800">18</td>
                   <td className="px-4 py-3 text-slate-600">6,240</td>
                   <td className="px-4 py-3"><span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">{t('ACTIVE', 'ACTIVO')}</span></td>
                 </tr>
                 <tr className="hover:bg-slate-50 text-xs">
                   <td className="px-4 py-3 font-medium text-slate-800">Norteamérica</td>
                   <td className="px-4 py-3 text-slate-600">USA, Canadá</td>
                   <td className="px-4 py-3 font-bold text-slate-800">10</td>
                   <td className="px-4 py-3 text-slate-600">3,800</td>
                   <td className="px-4 py-3"><span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">{t('ACTIVE', 'ACTIVO')}</span></td>
                 </tr>
                 <tr className="hover:bg-slate-50 text-xs">
                   <td className="px-4 py-3 font-medium text-slate-800">Europa</td>
                   <td className="px-4 py-3 text-slate-600">España, Francia, Alemania, Italia</td>
                   <td className="px-4 py-3 font-bold text-slate-800">8</td>
                   <td className="px-4 py-3 text-slate-600">2,150</td>
                   <td className="px-4 py-3"><span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-bold">{t('EXPANSION', 'EXPANSIÓN')}</span></td>
                 </tr>
               </tbody>
             </table>
           </div>
         </Card>
      </div>

      {/* Health Monitor Section */}
      <div className="mt-8">
        <h3 className="text-sm font-bold text-slate-700 uppercase border-b border-slate-200 pb-2">{t('INSTITUTION HEALTH MONITOR', 'MONITOR SALUD INST.')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <Card className="p-4 flex flex-col justify-between">
             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('TOTAL INSTITUTIONS', 'TOTAL INSTITUCIONES')}</p>
             <div className="text-2xl font-black text-[#003366]">43</div>
             <p className="text-[#003366] text-xs mt-2 font-medium">12 {t('pending approvals', 'aprob. pendientes')}</p>
          </Card>
          <Card className="p-4 flex flex-col justify-between border-l-4 border-l-emerald-500">
             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('HEALTHY INSTITUTIONS', 'INSTITUCIONES SANAS')}</p>
             <div className="text-2xl font-black text-[#003366]">38</div>
             <p className="text-emerald-500 text-xs mt-2 font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {t('Regular operations', 'Operaciones regulares')}</p>
          </Card>
          <Card className="p-4 flex flex-col justify-between border-l-4 border-l-amber-500">
             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('RISK FLAGGED', 'EN RIESGO')}</p>
             <div className="text-2xl font-black text-[#003366]">4</div>
             <p className="text-amber-500 text-xs mt-2 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {t('Missing key personnel', 'Falta personal clave')}</p>
          </Card>
          <Card className="p-4 flex flex-col justify-between border-l-4 border-l-red-500">
             <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight mb-2">{t('SUSPENDED', 'SUSPENDIDAS')}</p>
             <div className="text-2xl font-black text-red-500">1</div>
             <p className="text-red-500 text-xs mt-2 font-medium bg-red-50 px-2 py-0.5 rounded-sm self-start uppercase">{t('Critical Missing Roles', 'Roles Clínicos Faltantes')}</p>
          </Card>
        </div>
        
        {/* Health Monitor Table */}
        <div className="mt-4">
          <Card className="overflow-hidden">
            <div className="flex bg-slate-50 border-b border-slate-200">
               <button className="px-6 py-3 text-xs font-bold text-[#003366] border-b-2 border-[#003366] bg-white">{t('ALL', 'TODAS')}</button>
               <button className="px-6 py-3 text-xs font-bold text-slate-500 hover:text-slate-700">{t('CRITICAL MISSING ROLES', 'ROLES CLÍNICOS FALTANTES')} <span className="ml-1 bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px]">1</span></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    <th className="px-4 py-3">{t('INSTITUTION NAME', 'NOMBRE INSTITUCIÓN')}</th>
                    <th className="px-4 py-3">{t('LOCATION', 'UBICACIÓN')}</th>
                    <th className="px-4 py-3">{t('HEALTH STATUS', 'ESTADO SALUD')}</th>
                    <th className="px-4 py-3">{t('RISK FACTORS', 'FACTORES RIESGO')}</th>
                    <th className="px-4 py-3 text-right">{t('ACTIONS', 'ACCIONES')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 text-xs">
                    <td className="px-4 py-3 font-medium text-slate-800">Hospital Alianza</td>
                    <td className="px-4 py-3 text-slate-600">Bogotá D.C., Colombia</td>
                    <td className="px-4 py-3"><span className="text-emerald-600 flex items-center gap-1 font-bold"><CheckCircle2 className="w-3 h-3" /> Healthy</span></td>
                    <td className="px-4 py-3 text-slate-500">—</td>
                    <td className="px-4 py-3 text-right"><button className="text-[#003366] font-bold hover:underline">Manage</button></td>
                  </tr>
                  <tr className="hover:bg-slate-50 text-xs">
                    <td className="px-4 py-3 font-medium text-slate-800">Clínica San Juan</td>
                    <td className="px-4 py-3 text-slate-600">Medellín, Colombia</td>
                    <td className="px-4 py-3"><span className="text-red-600 flex items-center gap-1 font-bold"><AlertCircle className="w-3 h-3" /> Suspended</span></td>
                    <td className="px-4 py-3 text-red-600 font-medium">Missing Champion, 4 SLA Breaches</td>
                    <td className="px-4 py-3 text-right"><button className="text-[#003366] font-bold hover:underline">Manage</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
