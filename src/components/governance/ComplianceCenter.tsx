import React from 'react';
import { Card } from '../ui/Card';
import { ShieldCheck, Download, AlertCircle, CheckCircle2 } from 'lucide-react';

export function ComplianceCenter({ t }: { t: (en: string, es: string) => string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-slate-400" />
               {t('Compliance Center', 'Centro de Cumplimiento')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{t('Monitor MFA adoption, security policies, and permission compliance.', 'Monitorea adopción MFA, políticas de seguridad y cumplimiento de permisos.')}</p>
         </div>
      </div>

      {/* Top Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
           {/* Custom Donut Chart SVG */}
           <div className="relative w-16 h-16 shrink-0">
             <svg viewBox="0 0 36 36" className="w-full h-full">
               <path
                 className="text-slate-100"
                 strokeWidth="4"
                 stroke="currentColor"
                 fill="none"
                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
               />
               <path
                 className="text-amber-500"
                 strokeDasharray="87, 100"
                 strokeWidth="4"
                 strokeLinecap="round"
                 stroke="currentColor"
                 fill="none"
                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
               />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-800">
               87%
             </div>
           </div>
           <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{t('GLOBAL MFA ADOPTION', 'ADOPCIÓN GLOBAL MFA')}</p>
              <div className="text-2xl font-black text-[#003366] mt-0.5">87%</div>
           </div>
        </Card>
        
        <Card className="p-5 flex flex-col justify-between">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{t('STALE PASSWORDS', 'CONTRASEÑAS CADUCADAS')}</p>
           <div className="text-2xl font-black text-[#003366]">141</div>
           <p className="text-slate-400 text-[10px] font-bold uppercase mt-2">REQUIRES ROTATION</p>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{t('EXCESSIVE PRIVILEGES', 'PRIVILEGIOS EXCESIVOS')}</p>
           <div className="text-2xl font-black text-amber-500">12</div>
           <p className="text-amber-500 text-[10px] font-bold flex items-center gap-1 uppercase mt-2"><AlertCircle className="w-3 h-3" /> REVIEW ROLES</p>
        </Card>

        <Card className="p-5 flex flex-col justify-between border-l-4 border-emerald-500">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight flex items-between">{t('ECOSYSTEM COMPLIANCE SCORE', 'PUNTAJE DE CUMPLIMIENTO')}</p>
           <div className="text-3xl font-black text-emerald-600">94<span className="text-lg">/100</span></div>
           <p className="text-emerald-500 text-[10px] font-bold flex items-center gap-1 uppercase mt-2"><CheckCircle2 className="w-3 h-3" /> EXCELLENT</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
         <div className="flex items-center justify-between border-b border-slate-200">
            <div className="flex">
               <button className="px-6 py-3 text-xs font-bold text-[#003366] border-b-2 border-[#003366] bg-white">{t('COMPLIANCE EXCEPTIONS', 'EXCEPCIONES DE CUMPLIMIENTO')}</button>
               <button className="px-6 py-3 text-xs font-bold text-slate-500 hover:text-slate-700">{t('COMPLIANCE AUDIT LOGS', 'LOGS DE AUDITORÍA')}</button>
            </div>
            <div className="pr-4">
               <button className="text-slate-500 border border-slate-300 px-3 py-1.5 rounded text-[10px] font-bold uppercase flex items-center gap-2 hover:bg-slate-50 transition-colors">
                  <Download className="w-3.5 h-3.5" /> {t('EXPORT REPORT', 'EXPORTAR REPORTE')}
               </button>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="bg-[#0f1f3a] text-slate-300">
                  <tr className="text-[10px] font-bold uppercase tracking-tight">
                     <th className="px-4 py-3">{t('USER', 'USUARIO')}</th>
                     <th className="px-4 py-3 text-center">{t('MFA STATUS', 'ESTADO MFA')}</th>
                     <th className="px-4 py-3 text-center">{t('OTP STATUS', 'ESTADO OTP')}</th>
                     <th className="px-4 py-3">{t('IDENTIFYING ISSUES', 'INCONVENIENTES')}</th>
                     <th className="px-4 py-3 text-right">{t('ACTIONS', 'ACCIONES')}</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                     <td className="px-4 py-3">
                        <div className="font-bold text-slate-800 text-xs">QA Educator</div>
                        <div className="text-[10px] text-slate-500">Educator • Last login: 1 day ago</div>
                     </td>
                     <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 border border-red-200 text-red-600 text-[9px] font-bold rounded uppercase">DISABLED</span>
                     </td>
                     <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 border border-emerald-200 text-emerald-600 text-[9px] font-bold rounded uppercase">CONFIGURED</span>
                     </td>
                     <td className="px-4 py-3">
                        <div className="flex gap-2">
                           <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[9px] font-bold rounded uppercase">MFA DISABLED</span>
                        </div>
                     </td>
                     <td className="px-4 py-3 text-right">
                        <button className="text-[10px] font-bold text-[#003366] hover:underline uppercase">ENFORCE POLICY</button>
                     </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                     <td className="px-4 py-3">
                        <div className="font-bold text-slate-800 text-xs">Admin Local</div>
                        <div className="text-[10px] text-slate-500">Champion • Last login: 5 hours ago</div>
                     </td>
                     <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 border border-amber-200 text-amber-600 text-[9px] font-bold rounded uppercase">BYPASS</span>
                     </td>
                     <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 border border-emerald-200 text-emerald-600 text-[9px] font-bold rounded uppercase">CONFIGURED</span>
                     </td>
                     <td className="px-4 py-3">
                        <div className="flex gap-2">
                           <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold rounded uppercase">PASSWORD EXPIRED</span>
                        </div>
                     </td>
                     <td className="px-4 py-3 text-right">
                        <button className="text-[10px] font-bold text-[#003366] hover:underline uppercase">ENFORCE POLICY</button>
                     </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                     <td className="px-4 py-3">
                        <div className="font-bold text-slate-800 text-xs">Guest Analyst</div>
                        <div className="text-[10px] text-slate-500">Data Analyst • Last login: 1 month ago</div>
                     </td>
                     <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 border border-emerald-200 text-emerald-600 text-[9px] font-bold rounded uppercase">ENABLED</span>
                     </td>
                     <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 border border-red-200 text-red-600 text-[9px] font-bold rounded uppercase">PENDING</span>
                     </td>
                     <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                           <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold rounded uppercase">PROLONGED INACTIVITY</span>
                           <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold rounded uppercase">NON-DOMAIN</span>
                           <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[9px] font-bold rounded uppercase">NO OTP SETUP</span>
                        </div>
                     </td>
                     <td className="px-4 py-3 text-right">
                        <button className="text-[10px] font-bold text-[#003366] hover:underline uppercase">ENFORCE POLICY</button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
}
