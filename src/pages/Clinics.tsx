import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Search, UserPlus, FileText, Video, Stethoscope, AlertTriangle, ShieldCheck, Download, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Clinics() {
  const { user, language } = useAuth();
  const [activeTab, setActiveTab] = useState('Directory');
  const isES = language === 'ES';
  const t = (en: string, es: string) => isES ? es : en;

  if (user.role === 'CLINICAL_USER' || user.role === 'PARENT_PATIENT' || user.role === 'GUEST') {
    return <div className="p-8 text-center text-slate-500">{t("You don't have permission to access the clinical directory.", "No tienes permisos para acceder al directorio clínico.")}</div>;
  }

  const isReadOnly = user.role === 'DATA_ANALYST';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('Clinical Center & Educational Governance', 'Centro Clínico & Gobernanza Educativa')}</h1>
          <p className="text-slate-500 text-sm mt-1">{t('Monitor learning progression, clinical competencies and telesimulation performance.', 'Monitorea la progresión del aprendizaje, competencias clínicas y desempeño en telesimulación.')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded hover:bg-slate-50 shadow-sm transition-colors">
            <Download className="w-4 h-4" /> {t('Export Report', 'Exportar Reporte')}
          </button>
          
          {user.role === 'SUPER_ADMIN' && (
             <button className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white text-sm font-bold rounded shadow-sm hover:bg-blue-900 transition-colors">
               <UserPlus className="w-4 h-4" /> {t('Configure Educational Hierarchy', 'Configurar Jerarquía Educativa')}
             </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5">
           <p className="text-slate-500 text-xs font-bold uppercase tracking-tight mb-1">{t('Active Learners', 'Aprendices Activos')}</p>
           <div className="flex items-end gap-2 mt-2">
             <span className="text-3xl font-black text-[#003366]">1,284</span>
             <span className="text-slate-400 text-xs font-bold mb-1.5 uppercase">({user.role === 'SUPER_ADMIN' ? t('Network', 'Red') : user.institutionName})</span>
           </div>
        </Card>
        <Card className="p-5">
           <p className="text-slate-500 text-xs font-bold uppercase tracking-tight mb-1">{t('Upcoming Telesimulations', 'Telesimulaciones Prox.')}</p>
           <div className="flex items-end gap-2 mt-2">
             <span className="text-3xl font-black text-amber-500">8</span>
             <span className="text-slate-400 text-xs font-bold mb-1.5">{t('Blocked', 'Bloqueadas')}</span>
           </div>
        </Card>
        <Card className="p-5">
           <p className="text-slate-500 text-xs font-bold uppercase tracking-tight mb-1">{t('Avg P-Test Score', 'Score Promedio P-Test')}</p>
           <div className="flex items-end gap-2 mt-2">
             <span className="text-3xl font-black text-[#003366]">84.2%</span>
           </div>
        </Card>
        <Card className="p-5">
           <div className="flex items-center gap-1 mb-1 justify-between">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-tight">{t('At-Risk Yield Ranking', 'Yield Ranking en Riesgo')}</p>
              <AlertTriangle className="w-4 h-4 text-red-400" />
           </div>
           <div className="flex items-end gap-2 mt-2">
             <span className="text-3xl font-black text-red-500">42</span>
             <span className="text-slate-400 text-xs font-bold mb-1.5">{t('Students', 'Alumnos')}</span>
           </div>
        </Card>
      </div>

      <Card>
        <div className="border-b border-slate-200 px-5 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex gap-6 overflow-x-auto">
             {['Directory', 'Engagement', 'Telesimulation'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === tab ? 'border-[#003366] text-[#003366]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
               >
                 {tab === 'Directory' && <Users className="w-4 h-4" />}
                 {tab === 'Engagement' && <TrendingUp className="w-4 h-4" />}
                 {tab === 'Telesimulation' && <Video className="w-4 h-4" />}
                 {tab === 'Directory' ? t('Directory', 'Directorio') : tab === 'Engagement' ? t('Engagement & Analytics', 'Engagement & Analytics') : t('Telesimulation Management', 'Gestión Telesimulación')} 
               </button>
             ))}
          </div>

          <div className="relative py-3 w-full md:w-64">
             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
             <input
               type="text"
               placeholder={t('Search clinician or specialist...', 'Buscar clínico o especialista...')}
               className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-md w-full focus:ring-2 focus:ring-[#003366] outline-none bg-white shadow-sm"
             />
          </div>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'Directory' && (
             <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                 <tr>
                   <th className="px-6 py-4">{t('Clinician', 'Clínico')}</th>
                   <th className="px-6 py-4">{t('Curriculum / Specialty', 'Curriculum / Especialidad')}</th>
                   <th className="px-6 py-4 text-center">{t('Progress (API)', 'Progreso (API)')}</th>
                   <th className="px-6 py-4 text-center">{t('Telesim & Status', 'Telesim. & Status')}</th>
                   <th className="px-6 py-4 text-center">{t('Yield Ranking', 'Yield Ranking')}</th>
                   <th className="px-6 py-4 text-right">{t('Actions', 'Acciones')}</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 text-slate-700">
                  {[
                    { name: 'Dr. Evelyn Zayyan', int: 'Saint Jude', role: t('PIM3 Pediatrician', 'Pediatra PIM3'), curr: t('Airway Surgery', 'Cirugía Vía Aérea'), prog: 100, test: 94, cert: 'Certified', tele: 'Completed', yield: 'High', attempts: 1 },
                    { name: 'Lic. Ruben Ruiz', int: 'Memorial Hosp.', role: t('ICU Nurse', 'Enfermero UCI'), curr: t('ICU Fundamentals', 'Fundamentos UCI'), prog: 85, test: 75, cert: 'In Progress', tele: 'Blocked', yield: 'Moderate', attempts: 2 },
                    { name: 'Dra. Diana Valderrama', int: 'Saint Jude', role: t('Anesthesiologist', 'Anestesióloga'), curr: t('Crisis Resource Mgmt', 'Crisis Resource Mgmt'), prog: 40, test: null, cert: 'In Progress', tele: 'Blocked', yield: 'At Risk', attempts: 0 },
                    { name: 'Dr. Carlos Mendoza', int: 'General Clinic', role: t('Surgery Resident', 'Residente Cirugía'), curr: t('Airway Surgery', 'Cirugía Vía Aérea'), prog: 100, test: 50, cert: 'In Progress', tele: 'Blocked', yield: 'Critical', attempts: 3 },
                  ].map((u, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#003366]/10 flex items-center justify-center text-[#003366] font-bold shrink-0">
                            {u.name.split(' ').slice(1).map(x => x[0]).join('').substring(0,2)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-sm">{u.name}</div>
                            <div className="text-xs text-slate-500">{user.role === 'SUPER_ADMIN' ? u.int : u.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="font-semibold text-slate-700 text-xs">{u.curr}</div>
                         <div className="text-[10px] text-slate-400 mt-0.5">{u.role}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center justify-center">
                          <div className="flex items-center gap-2 mb-1 w-full max-w-[120px] justify-between text-[10px] font-bold">
                             <span className={u.prog === 100 ? 'text-emerald-600' : 'text-[#003366]'}>{u.prog}% {t('Viewed', 'Vistos')}</span>
                             {u.test !== null && <span className={u.test >= 80 ? 'text-emerald-600' : 'text-red-500'}>Test: {u.test}%</span>}
                          </div>
                          <div className="w-full max-w-[120px] bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div className={`h-1.5 rounded-full ${u.prog === 100 ? 'bg-emerald-500' : 'bg-[#003366]'}`} style={{ width: `${u.prog}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                           {u.cert === 'Certified' ? <Badge variant="success">{t('Certified', 'Certificado')}</Badge> : <Badge variant="default">{t('In Process', 'En Proceso')}</Badge>}
                           <span className={`text-[10px] font-bold flex items-center gap-1 ${u.tele === 'Blocked' ? 'text-red-500' : 'text-emerald-600'}`}>
                              {u.tele === 'Blocked' ? t('No Telesim pass', 'Sin pase a Telesim') : t('Telesim Passed', 'Telesim Aprobada')}
                           </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {u.yield === 'High' && <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded">{t('High Performer', 'High Performer')}</span>}
                        {u.yield === 'Moderate' && <span className="px-2 py-1 bg-blue-100 text-[#003366] text-[10px] font-bold rounded">{t('Moderate', 'Moderate')}</span>}
                        {u.yield === 'At Risk' && <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded">{t('At Risk', 'At Risk')}</span>}
                        {u.yield === 'Critical' && <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded">{t('Critical Risk', 'Critical Risk')}</span>}
                        
                        {u.attempts === 3 && u.test! < 80 && (
                           <div className="mt-1 text-[9px] text-red-600 flex items-center justify-center gap-1 font-bold">
                              <AlertTriangle className="w-3 h-3" /> {t('Blocked (3 Att.)', 'Bloqueado (3 Int.)')}
                           </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-[10px] font-bold text-[#003366] hover:underline uppercase">{t('View Details', 'Ver Details')}</button>
                      </td>
                    </tr>
                  ))}
               </tbody>
             </table>
          )}

          {activeTab === 'Telesimulation' && (
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 {(user.role === 'EDUCATOR' || user.role === 'SUPER_ADMIN') ? (
                    <>
                       <div className="border border-slate-200 rounded p-5 bg-white shadow-sm flex items-start gap-4">
                           <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded flex items-center justify-center shrink-0">
                               <Video className="w-6 h-6" />
                           </div>
                           <div>
                              <h3 className="font-bold text-slate-800 text-sm">{t('Next Session: Complex Intubation', 'Próxima Sesión: Intubación Compleja')}</h3>
                              <p className="text-xs text-slate-500 mt-1">{t('Cohort B - Pediatric Surgery. 4 Participants ready.', 'Cohorte B - Cirugía Pediátrica. 4 Participantes habilitados.')}</p>
                              <div className="mt-4 flex gap-2">
                                 <button className="text-xs font-bold bg-[#003366] text-white px-3 py-1.5 rounded">{t('Start Facilitation', 'Iniciar Facilitación')}</button>
                                 <button className="text-xs font-bold text-slate-600 px-3 py-1.5 rounded border border-slate-200 hover:bg-slate-50">{t('Manage Group', 'Gestionar Grupo')}</button>
                              </div>
                           </div>
                       </div>
                       
                       <div className="border border-red-100 rounded p-5 bg-red-50/30 flex items-start gap-4">
                           <div className="w-12 h-12 bg-red-50 text-red-500 rounded flex items-center justify-center shrink-0">
                               <FileText className="w-6 h-6" />
                           </div>
                           <div>
                              <h3 className="font-bold text-slate-800 text-sm">{t('Group Pending Grade', 'Evaluación y Calificación Grupal Pendiente')}</h3>
                              <p className="text-xs text-slate-500 mt-1">{t('Grade yesterday\'s group simulation to automatically issue individual certifications.', 'Califica al grupo de la simulación de ayer para liberar las certificaciones individuales automáticamente.')}</p>
                              <button className="mt-4 text-xs font-bold bg-white text-red-600 px-3 py-1.5 rounded border border-red-200 hover:bg-red-50 shadow-sm">
                                {t('Group Grading', 'Evaluar Grupo (Group Grading)')}
                              </button>
                           </div>
                       </div>
                    </>
                 ) : (
                    <div className="col-span-2 text-center p-8 text-slate-500 text-sm">
                       {t('Telesimulation room management securely belongs to Educators.', 'La gestión de salas de telesimulación y calificaciones grupales ("Group Grading") pertenece estrictamente a los Educadores.')}
                    </div>
                 )}
             </div>
          )}

          {activeTab === 'Engagement' && (
             <div className="p-12 text-center">
                <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-700">{t('Consumption Metrics & Video Traceability', 'Métricas de Consumo y Trazabilidad de Video')}</h3>
                <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
                   {t('The system monitors theoretical classes with >90% threshold via Video Telemetry before releasing post-tests to prevent fast-forward fraud. (API Backend Active)', 'El sistema monitorea el visionado de clases teóricas previniendo fraude (saltos rápidos / fast-forward) con un umbral de obligatoriedad >90% a través de la Telemetría de Video antes de habilitar los post-tests. (API Backend Active)')}
                </p>
             </div>
          )}
        </div>
      </Card>
    </div>
  );
}
