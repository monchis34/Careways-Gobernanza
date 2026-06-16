import React from 'react';
import { Card } from '../ui/Card';
import { AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export function OperationsCenter({ t }: { t: (en: string, es: string) => string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight">{t('CRITICAL EVENTS CENTER', 'CENTRO DE EVENTOS CRÍTICOS')}</h3>
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-100 text-red-600 rounded text-[10px] font-bold animate-pulse">
               <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div> LIVE
            </span>
         </div>
         <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded flex items-center gap-2 hover:bg-slate-800 transition-colors">
            <FileText className="w-3.5 h-3.5" /> {t('Export Data', 'Exportar Datos')}
         </button>
      </div>

      <Card className="overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="bg-[#0f1f3a] text-slate-300">
                  <tr className="text-[10px] font-bold uppercase tracking-tight">
                     <th className="px-4 py-3">{t('EVENT ID / TIME', 'ID EVENTO / TIEMPO')}</th>
                     <th className="px-4 py-3">{t('SEVERITY', 'SEVERIDAD')}</th>
                     <th className="px-4 py-3 max-w-[200px]">{t('CATEGORY & DESC', 'CATEGORÍA Y DESC')}</th>
                     <th className="px-4 py-3">{t('USER / INST', 'USUARIO / INST')}</th>
                     <th className="px-4 py-3">{t('STATUS', 'ESTADO')}</th>
                     <th className="px-4 py-3 text-right">{t('ACTIONS', 'ACCIONES')}</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                     <td className="px-4 py-3">
                        <div className="font-bold text-slate-800 text-xs">EVT-892</div>
                        <div className="text-[10px] text-slate-500">22 Aug, 14:32</div>
                     </td>
                     <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded uppercase flex items-center gap-1 w-max">
                           <AlertCircle className="w-3 h-3" /> CRITICAL
                        </span>
                     </td>
                     <td className="px-4 py-3 pb-3">
                        <div className="font-bold text-slate-800 text-xs">Security: Multiple failed login attempts</div>
                        <div className="text-[10px] text-slate-500 truncate w-48">Detected from Admin account</div>
                     </td>
                     <td className="px-4 py-3">
                        <div className="font-bold text-slate-800 text-xs">System</div>
                        <div className="text-[10px] text-slate-500">Network Level</div>
                     </td>
                     <td className="px-4 py-3">
                        <span className="text-amber-600 font-bold text-xs italic">{t('Pending Approval', 'Pendiente Aprobación')}</span>
                     </td>
                     <td className="px-4 py-3 text-right">
                        <button className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded hover:bg-slate-200 border border-slate-300 transition-colors uppercase">
                           Solve
                        </button>
                     </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                     <td className="px-4 py-3">
                        <div className="font-bold text-slate-800 text-xs">EVT-891</div>
                        <div className="text-[10px] text-slate-500">22 Aug, 11:15</div>
                     </td>
                     <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded uppercase flex items-center gap-1 w-max">
                           MEDIUM
                        </span>
                     </td>
                     <td className="px-4 py-3 pb-3">
                        <div className="font-bold text-slate-800 text-xs">Operation: Bulk upload failed</div>
                        <div className="text-[10px] text-slate-500 truncate w-48">Invalid specialty mapping</div>
                     </td>
                     <td className="px-4 py-3">
                        <div className="font-bold text-slate-800 text-xs">Admin Local</div>
                        <div className="text-[10px] text-slate-500">Hospital Alianza</div>
                     </td>
                     <td className="px-4 py-3">
                        <span className="text-amber-600 font-bold text-xs italic">{t('Pending Approval', 'Pendiente Aprobación')}</span>
                     </td>
                     <td className="px-4 py-3 text-right">
                        <button className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded hover:bg-slate-200 border border-slate-300 transition-colors uppercase">
                           Solve
                        </button>
                     </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                     <td className="px-4 py-3">
                        <div className="font-bold text-slate-800 text-xs">EVT-890</div>
                        <div className="text-[10px] text-slate-500">21 Aug, 09:00</div>
                     </td>
                     <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded uppercase flex items-center gap-1 w-max">
                           HIGH
                        </span>
                     </td>
                     <td className="px-4 py-3 pb-3">
                        <div className="font-bold text-slate-800 text-xs">Clinical: Inconsistent patient registry</div>
                        <div className="text-[10px] text-slate-500 truncate w-48">Data detected by NLP auditor</div>
                     </td>
                     <td className="px-4 py-3">
                        <div className="font-bold text-slate-800 text-xs">Dr. Gomez</div>
                        <div className="text-[10px] text-slate-500">Clínica Central</div>
                     </td>
                     <td className="px-4 py-3">
                        <span className="text-blue-600 font-bold text-xs underline">{t('Contingent Resolution', 'Resolución Contingente')}</span>
                     </td>
                     <td className="px-4 py-3 text-right">
                        <button className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded flex gap-1 items-center justify-end ml-auto">
                           <CheckCircle2 className="w-3 h-3" /> Logged
                        </button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
}
