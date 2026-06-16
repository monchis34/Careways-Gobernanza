import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ShieldCheck, AlertTriangle, X } from 'lucide-react';

export function LiveSessions({ t }: { t: (en: string, es: string) => string }) {
  const [sessions, setSessions] = useState([
    { id: 1, user: 'QA Super', role: 'Super Admin', inst: 'CareWays System', device: '192.168.1.105', os: 'macOS / Chrome', dur: '2h 15m', status: 'ACTIVE' },
    { id: 2, user: 'QA Educator', role: 'Educator', inst: 'Hospital Universitario', device: '201.23.44.12', os: 'Windows / Edge', dur: '45m', status: 'ACTIVE' },
    { id: 3, user: 'Dr. John Smith', role: 'Clinician', inst: 'Centro Médico ABC', device: '189.12.33.109', os: 'iOS 17 / Safari', dur: '4h 30m', status: 'IDLE' },
    { id: 4, user: 'Jane Doe', role: 'Educator', inst: 'Clínica del Occidente', device: '190.15.55.201', os: 'Windows / Firefox', dur: '12m', status: 'ACTIVE' },
    { id: 5, user: 'QA Analyst', role: 'Data Analyst', inst: 'CareWays System', device: '10.0.0.55', os: 'Linux / Chrome', dur: '6h 10m', status: 'ACTIVE' },
  ]);

  const [modalState, setModalState] = useState<{ isOpen: boolean, type: 'terminate' | 'logout', sessionId: number | null }>({
     isOpen: false, type: 'terminate', sessionId: null
  });
  
  const handleAction = (id: number, type: 'terminate' | 'logout') => {
     setModalState({ isOpen: true, type, sessionId: id });
  };

  const confirmAction = () => {
     if (modalState.sessionId !== null) {
        setSessions(s => s.filter(session => session.id !== modalState.sessionId));
     }
     setModalState({ isOpen: false, type: 'terminate', sessionId: null });
  };

  const activeCount = sessions.filter(s => s.status === 'ACTIVE').length;

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
         <div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               {t('Live Session Monitoring', 'Monitoreo de Sesiones en Vivo')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{t('Real-time overview of active user connections and ecosystem access state.', 'Visión general en tiempo real de las conexiones de usuarios activos y el estado de acceso al ecosistema.')}</p>
         </div>
         <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold uppercase tracking-tight">
            {activeCount} {t('ACTIVE CONNECTIONS', 'CONEXIONES ACTIVAS')}
         </span>
      </div>

      <Card className="overflow-hidden">
         <div className="flex justify-end p-2 bg-slate-50 border-b border-slate-200">
            <input
               type="text"
               placeholder={t('Search sessions...', 'Buscar sesiones...')}
               className="px-3 py-1.5 text-xs border border-slate-200 rounded-md w-64 focus:ring-2 focus:ring-[#003366] outline-none"
             />
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="bg-[#0f1f3a] text-slate-300">
                  <tr className="text-[10px] font-bold uppercase tracking-tight">
                     <th className="px-4 py-3">{t('CONNECTION', 'CONEXIÓN')}</th>
                     <th className="px-4 py-3">{t('USER & ROLE', 'USUARIO Y ROL')}</th>
                     <th className="px-4 py-3">{t('INSTITUTION', 'INSTITUCIÓN')}</th>
                     <th className="px-4 py-3">{t('DEVICE & IP', 'DISPOSITIVO E IP')}</th>
                     <th className="px-4 py-3 text-center">{t('DURATION', 'DURACIÓN')}</th>
                     <th className="px-4 py-3 text-right">{t('ACTIONS', 'ACCIONES')}</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {sessions.map((s) => (
                     <tr key={s.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                           <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase flex items-center gap-1.5 w-max ${s.status === 'ACTIVE' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'ACTIVE' ? 'bg-emerald-600' : 'bg-amber-600'}`}></div> {s.status}
                           </span>
                        </td>
                        <td className="px-4 py-3">
                           <div className="font-bold text-slate-800 text-xs">{s.user}</div>
                           <div className="text-[10px] text-slate-500">{s.role}</div>
                        </td>
                        <td className="px-4 py-3 pb-3">
                           <div className="text-xs text-slate-700">{s.inst}</div>
                        </td>
                        <td className="px-4 py-3">
                           <div className="font-bold text-slate-800 text-xs">{s.device}</div>
                           <div className="text-[10px] text-slate-500">{s.os}</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                           <span className="text-xs font-medium text-slate-600">{s.dur}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleAction(s.id, 'terminate')} className="px-2 py-1 bg-white text-slate-600 text-[10px] font-bold rounded hover:bg-slate-50 border border-slate-200 transition-colors uppercase">
                                 Terminate
                              </button>
                              <button onClick={() => handleAction(s.id, 'logout')} className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded hover:bg-red-100 transition-colors uppercase">
                                 Force Logout
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>

      {/* Confirmation Modal */}
      {modalState.isOpen && (
         <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
               <div className="p-6">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                     </div>
                     <div>
                        <h3 className="text-base font-bold text-slate-800">
                           {modalState.type === 'terminate' ? t('Confirm Terminate Session', 'Confirmar Terminación') : t('Confirm Force Logout', 'Confirmar Cierre Forzado')}
                        </h3>
                        <p className="text-sm text-slate-600 mt-2">
                           {t('Are you sure you want to ', '¿Está seguro que desea ')} 
                           {modalState.type === 'terminate' ? t('terminate session for user ', 'terminar la sesión del usuario ') : t('force logout for user ', 'cerrar forzosamente la sesión del usuario ')} 
                           <strong>{sessions.find(s => s.id === modalState.sessionId)?.user}</strong>? {t('They will be immediately disconnected.', 'Serán desconectados inmediatamente.')}
                        </p>
                     </div>
                  </div>
                  
                  <div className="mt-4 pl-14">
                     <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-tight mb-1">{t('ACTION NOTES (OPTIONAL)', 'NOTAS DE ACCIÓN (OPCIONAL)')}</label>
                     <textarea 
                        className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" 
                        rows={3} 
                        placeholder={t('Provide a reason or context for this action...', 'Proporcione una razón o contexto para esta acción...')}
                     />
                  </div>
               </div>
               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-xl">
                  <button onClick={() => setModalState({ isOpen: false, type: 'terminate', sessionId: null })} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors">
                     {t('Cancel', 'Cancelar')}
                  </button>
                  <button onClick={confirmAction} className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded shadow hover:bg-red-700 transition-colors">
                     {t('Confirm Danger', 'Confirmar Peligro')}
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
