import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { ShieldCheck, Activity, Users, AlertTriangle, HelpCircle, HardDrive, Share2, Search, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/ui/Badge';

export function Governance() {
  const { user, language } = useAuth();
  const isES = language === 'ES';
  const t = (en: string, es: string) => isES ? es : en;
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  const tabs = [
    { id: 'OVERVIEW', icon: ShieldCheck, label: t('OVERVIEW', 'RESUMEN') },
    { id: 'USER_MGMT', icon: Users, label: t('USER MGMT', 'GESTIÓN DE USUARIOS') },
    { id: 'OPERATIONS', icon: Activity, label: t('OPERATIONS', 'OPERACIONES') },
    { id: 'CAPACITY', icon: HardDrive, label: t('CAPACITY', 'CAPACIDAD') },
    { id: 'LIVE_SESSIONS', icon: Share2, label: t('LIVE SESSIONS', 'SESIONES EN VIVO') },
    { id: 'RACI', icon: UserCheck, label: 'RACI' },
    { id: 'SLA_MONITOR', icon: Activity, label: 'SLA MONITOR' },
    { id: 'COMPLIANCE', icon: ShieldCheck, label: 'COMPLIANCE' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Controls / Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 bg-white rounded-lg border border-slate-200">
         <div className="flex items-center gap-3 w-full xl:w-auto">
            <div className="bg-[#003366] text-white p-2 rounded items-center justify-center flex hidden sm:flex">
               <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-800 text-sm hidden sm:inline-block">{t('CONTROL TOWER', 'TORRE DE CONTROL')}</span>
            
            <div className="relative w-full sm:w-64">
               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
               <input
                 type="text"
                 placeholder={t('Global Search (Users, Hospitals, Courses...)', 'Búsqueda Global (Usuarios, Hospitales, Cursos...)')}
                 className="pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-md w-full focus:ring-2 focus:ring-[#003366] outline-none"
               />
            </div>
         </div>
         
         <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
            <div className="flex gap-2 mr-4">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-slate-200 rounded hover:bg-slate-50 text-slate-700">
                <Users className="w-3 h-3" /> USER
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-slate-200 rounded hover:bg-slate-50 text-slate-700">
                <Activity className="w-3 h-3" /> INSTITUTION
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-slate-200 rounded hover:bg-slate-50 text-slate-700">
                <AlertTriangle className="w-3 h-3" /> EVENT
              </button>
            </div>
            <div className="flex flex-col text-right">
               <span className="text-red-600 font-bold text-xs uppercase tracking-tight">{t('3 CRITICAL EVENTS', '3 EVENTOS CRÍTICOS')}</span>
               <span className="text-slate-500 text-[10px]">{t('1 SLA Breached', '1 SLA Incumplido')}</span>
            </div>
         </div>
      </div>

      {/* Global Scope Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-slate-200">
         <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-tight">
               <Activity className="w-4 h-4" /> {t('GLOBAL SCOPE', 'ALCANCE GLOBAL')}
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-200"></div>
            
            <div className="flex flex-col">
               <span className="text-[9px] text-slate-400 font-bold uppercase">{t('COUNTRY', 'PAÍS')}</span>
               <select className="border-none bg-transparent text-slate-700 font-medium text-xs focus:ring-0 cursor-pointer p-0 w-24">
                  <option>All Country</option>
               </select>
            </div>
            <span className="text-slate-300">/</span>
            
            <div className="flex flex-col">
               <span className="text-[9px] text-slate-400 font-bold uppercase">{t('STATE/PROVINCE', 'ESTADO/PROVINCIA')}</span>
               <select className="border-none bg-transparent text-slate-700 font-medium text-xs focus:ring-0 cursor-pointer p-0 w-28">
                  <option>All State/Province</option>
               </select>
            </div>
            <span className="text-slate-300">/</span>

            <div className="flex flex-col">
               <span className="text-[9px] text-slate-400 font-bold uppercase">{t('CITY', 'CIUDAD')}</span>
               <select className="border-none bg-transparent text-slate-700 font-medium text-xs focus:ring-0 cursor-pointer p-0 w-20">
                  <option>All City</option>
               </select>
            </div>
            <span className="text-slate-300">/</span>

            <div className="flex flex-col">
               <span className="text-[9px] text-slate-400 font-bold uppercase">{t('HOSPITAL', 'HOSPITAL')}</span>
               <select className="border-none bg-transparent text-slate-700 font-medium text-xs focus:ring-0 cursor-pointer p-0 w-24">
                  <option>All Hospital</option>
               </select>
            </div>
         </div>
         <button className="px-4 py-1.5 text-xs font-bold border border-slate-200 text-slate-700 rounded hover:bg-slate-50 uppercase shadow-sm">
           {t('APPLY SCOPE', 'APLICAR ALCANCE')}
         </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100">
         {tabs.map((tab) => {
           const Icon = tab.icon;
           const isActive = activeTab === tab.id;
           return (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                 isActive ? 'bg-white border border-slate-200 text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
               }`}
             >
               <Icon className="w-3.5 h-3.5" />
               {tab.label}
             </button>
           );
         })}
      </div>

      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-5 flex flex-col justify-between">
               <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('TOTAL USERS', 'USUARIOS TOTALES')}</p>
                  <div className="text-3xl font-black text-[#003366]">4,892</div>
               </div>
               <p className="text-emerald-500 text-xs font-bold mt-4">+12 <span className="text-slate-400 font-medium">{t('pending approvals', 'aprobaciones pendientes')}</span></p>
            </Card>
            
            <Card className="p-5 flex flex-col justify-between">
               <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('ACTIVE INSTITUTIONS', 'INSTITUCIONES ACTIVAS')}</p>
                  <div className="text-3xl font-black text-[#003366]">43</div>
               </div>
               <p className="text-[#003366] text-xs font-bold mt-4">2 <span className="text-slate-400 font-medium">{t('suspended currently', 'suspendidas actualmente')}</span></p>
            </Card>

            <Card className="p-5 flex flex-col justify-between">
               <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('CLINICAL REGISTRIES', 'REGISTROS CLÍNICOS')}</p>
                  <div className="text-3xl font-black text-[#003366]">18.4K</div>
               </div>
               <p className="text-emerald-500 text-xs font-bold mt-4">+5% <span className="text-slate-400 font-medium">{t('processed this week', 'procesados esta semana')}</span></p>
            </Card>

            <Card className="p-5 flex flex-col justify-between border-l-4 border-l-red-500">
               <div>
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight mb-2">{t('CRITICAL EVENTS', 'EVENTOS CRÍTICOS')}</p>
                  <div className="text-3xl font-black text-red-500">7</div>
               </div>
               <p className="text-red-500 text-xs font-bold mt-4">{t('Action Required', 'Acción Requerida')}</p>
            </Card>
          </div>

          {/* Security & Access / Ecosystem Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {/* Security & Access */}
             <div>
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-sm font-bold text-slate-700 uppercase">{t('SECURITY & ACCESS', 'SEGURIDAD Y ACCESO')}</h3>
                   <button className="text-[#003366] text-xs font-bold hover:underline flex items-center gap-1">
                     {t('View Audit Log', 'Ver Log de Auditoría')} <ArrowRight className="w-3 h-3" />
                   </button>
                </div>
                <table className="w-full text-sm text-left border-t border-slate-100">
                   <thead>
                     <tr className="border-b border-slate-100">
                       <th className="py-2 text-[10px] font-bold text-slate-400 uppercase">{t('METRIC', 'MÉTRICA')}</th>
                       <th className="py-2 text-[10px] font-bold text-slate-400 uppercase text-right">{t('VALUE', 'VALOR')}</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50/50">
                     <tr>
                       <td className="py-3 font-medium text-slate-600">{t('Active Sessions', 'Sesiones Activas')}</td>
                       <td className="py-3 text-right font-bold text-slate-800">1,204</td>
                     </tr>
                     <tr>
                       <td className="py-3 font-medium text-slate-600">{t('Failed Access Attempts (24h)', 'Intentos Fallidos (24h)')}</td>
                       <td className="py-3 text-right font-bold text-amber-500">86</td>
                     </tr>
                     <tr>
                       <td className="py-3 font-medium text-slate-600">{t('Suspended Accounts', 'Cuentas Suspendidas')}</td>
                       <td className="py-3 text-right font-bold text-red-500">14</td>
                     </tr>
                     <tr>
                       <td className="py-3 font-medium text-slate-600">{t('Temporary Delegations', 'Delegaciones Temporales')}</td>
                       <td className="py-3 text-right font-bold text-blue-500">3</td>
                     </tr>
                   </tbody>
                </table>
             </div>

             {/* Ecosystem Activity */}
             <div>
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-sm font-bold text-slate-700 uppercase">{t('ECOSYSTEM ACTIVITY', 'ACTIVIDAD DEL ECOSISTEMA')}</h3>
                   <button className="text-[#003366] text-xs font-bold hover:underline flex items-center gap-1">
                     {t('View All Metrics', 'Ver Todas las Métricas')} <ArrowRight className="w-3 h-3" />
                   </button>
                </div>
                <table className="w-full text-sm text-left border-t border-slate-100">
                   <thead>
                     <tr className="border-b border-slate-100">
                       <th className="py-2 text-[10px] font-bold text-slate-400 uppercase">{t('METRIC', 'MÉTRICA')}</th>
                       <th className="py-2 text-[10px] font-bold text-slate-400 uppercase text-right">{t('VALUE', 'VALOR')}</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50/50">
                     <tr>
                       <td className="py-3 font-medium text-slate-600">{t('Active Courses', 'Cursos Activos')}</td>
                       <td className="py-3 text-right font-bold text-slate-800">124</td>
                     </tr>
                     <tr>
                       <td className="py-3 font-medium text-slate-600">{t('Tele-sim Events (Month)', 'Eventos Telesim (Mes)')}</td>
                       <td className="py-3 text-right font-bold text-slate-800">89</td>
                     </tr>
                     <tr>
                       <td className="py-3 font-medium text-slate-600">{t('Open Support Tickets', 'Tickets de Soporte Abiertos')}</td>
                       <td className="py-3 text-right font-bold text-amber-500">22</td>
                     </tr>
                     <tr>
                       <td className="py-3 font-medium text-slate-600">{t('SLA Breaches', 'Incumplimientos SLA')}</td>
                       <td className="py-3 text-right font-bold text-red-500">2</td>
                     </tr>
                   </tbody>
                </table>
             </div>
          </div>

          {/* Health Monitor Section */}
          <h3 className="text-sm font-bold text-slate-700 uppercase mt-8 border-b border-slate-200 pb-2">{t('INSTITUTION HEALTH MONITOR', 'MONITOR SALUD INST.')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Card className="p-4 flex flex-col justify-between">
               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('TOTAL INSTITUTIONS', 'TOTAL INSTITUCIONES')}</p>
               <div className="text-2xl font-black text-[#003366]">43</div>
               <p className="text-[#003366] text-xs mt-2 font-medium">12 {t('pending approvals', 'aprob. pendientes')}</p>
            </Card>
            <Card className="p-4 flex flex-col justify-between border-l-4 border-l-emerald-500">
               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('HEALTHY INSTITUTIONS', 'INSTITUCIONES SANAS')}</p>
               <div className="text-2xl font-black text-[#003366]">38</div>
               <p className="text-emerald-500 text-xs mt-2 font-medium">5 {t('require attention', 'req. atención')}</p>
            </Card>
            <Card className="p-4 flex flex-col justify-between border-l-4 border-l-amber-500">
               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-2">{t('RISK FLAGGED', 'EN RIESGO')}</p>
               <div className="text-2xl font-black text-[#003366]">4</div>
               <p className="text-amber-500 text-xs mt-2 font-medium">{t('Missing key personnel', 'Falta personal clave')}</p>
            </Card>
            <Card className="p-4 flex flex-col justify-between border-l-4 border-l-red-500">
               <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight mb-2">{t('SUSPENDED', 'SUSPENDIDAS')}</p>
               <div className="text-2xl font-black text-red-500">1</div>
               <p className="text-red-500 text-xs mt-2 font-medium bg-red-50 px-2 py-0.5 rounded-full self-start">{t('Action Required', 'Acción Requerida')}</p>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'RACI' && <RaciTab t={t} />}

    </div>
  );
}

function RaciTab({ t }: { t: (en: string, es: string) => string }) {
  const roles = [
    { id: 'admin', label: 'ADMIN PRINCIPAL (RED)' },
    { id: 'champion', label: 'CHAMPION / ADMIN LOCAL' },
    { id: 'educator', label: 'CLÍNICO FORMADOR' },
    { id: 'user', label: 'USUARIO CLÍNICO' },
    { id: 'analyst', label: 'ANALISTA AVANZADO' }
  ];

  const matrixData = [
    {
      module: 'GOBERNANZA INSTITUCIONAL',
      activities: [
        { name: 'Validación y aprobación de cuentas', roles: ['I', 'AR', 'C', '', ''] },
        { name: 'Definición de dominios (Whitelist)', roles: ['AR', 'C', '', '', ''] },
      ]
    },
    {
      module: 'MÓDULO ACADÉMICO',
      activities: [
        { name: 'Gestión de evaluaciones y notas', labels: ['CONT'], roles: ['CONT', 'I', 'AR', '', ''] },
        { name: 'Registro de Telesimulación PICU', labels: ['CONT'], roles: ['CONT', 'I', 'R', 'R_ASISTE', ''] },
        { name: 'Consumo de cursos y Pre/Post Tests', labels: ['UMBRAL'], roles: ['I', 'I', 'I', 'AR', ''] },
      ]
    },
    {
      module: 'MÓDULO CLÍNICO Y DATOS',
      activities: [
        { name: 'Ingreso individual de datos paciente', labels: ['CONT', 'MVD'], roles: ['CONT', 'C', '', 'AR', ''] },
        { name: 'Carga masiva (Bulk Upload) de datos', roles: ['I', 'AR', '', '', 'C'] },
        { name: 'Higiene y auditoría de datos', labels: ['MVD'], roles: ['C', 'R', '', '', 'A'] },
      ]
    },
    {
      module: 'ANALÍTICA DE IMPACTO',
      activities: [
        { name: 'Análisis de tasa de mortalidad PICU', roles: ['I', 'AR', 'IC', 'I', 'C'] },
        { name: 'Modelado estadístico y regresiones', roles: ['C', 'I', '', '', 'AR'] },
      ]
    }
  ];

  const RaciBadge = ({ type }: { type: string }) => {
    if (!type) return <span className="text-slate-300 font-medium select-none">—</span>;

    if (type === 'R_ASISTE') {
      return (
        <div className="flex flex-col items-center justify-center gap-0.5">
           <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold border border-transparent rounded bg-blue-500 text-white">R</span>
           <span className="text-[9px] text-slate-400 font-medium leading-none tracking-tight">(Asiste)</span>
        </div>
      );
    }
    if (type === 'IC') {
      return (
        <div className="flex items-center justify-center gap-1">
           <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold border rounded bg-slate-50 text-slate-500 border-slate-200">I</span>
           <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold border border-transparent rounded bg-emerald-500 text-white">C</span>
        </div>
      );
    }

    let style = '';
    let label = type;
    switch (type) {
       case 'AR': style = 'bg-[#003366] text-white border-transparent'; label = 'A/R'; break;
       case 'R': style = 'bg-blue-500 text-white border-transparent'; break;
       case 'A': style = 'bg-amber-500 text-white border-transparent'; break;
       case 'C': style = 'bg-emerald-500 text-white border-transparent'; break;
       case 'I': style = 'bg-slate-50 text-slate-500 border-slate-200'; break;
       case 'CONT': style = 'bg-amber-50 text-amber-700 border-amber-200'; label = '↓ Cont.'; break;
    }
    
    return <span className={`inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold border rounded shadow-sm ${style}`}>{label}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">{t('MATRIZ RACI - ROLE & RESPONSIBILITY ASSIGNMENT', 'MATRIZ RACI - ASIGNACIÓN DE RESPONSABILIDADES')}</h2>
          <p className="text-xs text-slate-500 mt-1">{t('Role ecosystem interaction definitions', 'Definiciones de interacción en el ecosistema de roles')}</p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 w-1/3">
                  {t('MODULE / ACTIVITY', 'MÓDULO / ACTIVIDAD')}
                </th>
                {roles.map(role => (
                  <th key={role.id} className="py-3 px-3 bg-slate-50 border-b border-slate-200 text-[10px] leading-tight font-bold text-center text-slate-600 uppercase w-[12%]">
                    {role.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {matrixData.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  {/* Section Title */}
                  <tr className="bg-slate-50/50">
                    <td colSpan={roles.length + 1} className="py-2.5 px-4 text-[10px] font-bold text-[#003366] uppercase tracking-wider">
                      {section.module}
                    </td>
                  </tr>
                  {/* Activities */}
                  {section.activities.map((activity, aIdx) => (
                    <tr key={aIdx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center flex-wrap gap-1.5">
                          <span className="font-medium text-slate-700 text-xs">{activity.name}</span>
                          {activity.labels?.includes('MVD') && (
                            <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1 py-0.5 rounded ml-1">• MVD</span>
                          )}
                          {activity.labels?.includes('UMBRAL') && (
                            <span className="text-[9px] font-bold text-[#003366] bg-blue-50 px-1 py-0.5 rounded ml-1">^ umbral 80%</span>
                          )}
                        </div>
                      </td>
                      {activity.roles.map((role, rIdx) => (
                        <td key={rIdx} className="py-3 px-2 text-center align-middle">
                          <RaciBadge type={role} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="flex items-center gap-2">
          <RaciBadge type="AR" />
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-tight">{t('Approver & Accountable', 'Aprueba & Responsable')}</span>
        </div>
        <div className="flex items-center gap-2">
          <RaciBadge type="R" />
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-tight">{t('Responsible Executor', 'Responsable ejecutor')}</span>
        </div>
        <div className="flex items-center gap-2">
          <RaciBadge type="A" />
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-tight">{t('Final Accountable', 'Responsable Final')}</span>
        </div>
        <div className="flex items-center gap-2">
          <RaciBadge type="C" />
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-tight">{t('Consulted', 'Consultado')}</span>
        </div>
        <div className="flex items-center gap-2">
          <RaciBadge type="I" />
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-tight">{t('Informed', 'Informado')}</span>
        </div>
        <div className="flex items-center gap-2">
          <RaciBadge type="CONT" />
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-tight">{t('Support / Contingency', 'Soporte / Contingencia - Admin Principal')}</span>
        </div>
        <div className="flex flex-col ml-auto pl-4 border-l border-slate-200">
          <span className="text-[10px] font-medium text-slate-500 whitespace-nowrap">• MVD: {t('Subject to Minimum Viable Dataset', 'Sujeto al Minimum Viable Dataset clínico')}</span>
          <span className="text-[10px] font-medium text-slate-500 whitespace-nowrap">—: {t('No primary assignment', 'Sin asignación primaria')}</span>
        </div>
      </div>
    </div>
  );
}
