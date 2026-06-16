import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { ShieldCheck, Activity, Users, AlertTriangle, HelpCircle, HardDrive, Share2, Search, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/ui/Badge';
import { UserManagementCenter } from '../components/UserManagementCenter';
import { NetworkOverview } from '../components/NetworkOverview';
import { GovernanceOverview } from '../components/governance/GovernanceOverview';
import { OperationsCenter } from '../components/governance/OperationsCenter';
import { CapacityManagement } from '../components/governance/CapacityManagement';
import { LiveSessions } from '../components/governance/LiveSessions';
import { SlaMonitor } from '../components/governance/SlaMonitor';
import { ComplianceCenter } from '../components/governance/ComplianceCenter';

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
      {/* Role Banner */}
      <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded flex items-center justify-between text-xs font-medium">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>
            {isES ? (
              <>Estás viendo la plataforma como <strong>{user.role}</strong>. Todas las acciones se ejecutan con los permisos de ese rol.</>
            ) : (
              <>You are viewing the platform as <strong>{user.role}</strong>. All actions run with that role's permissions.</>
            )}
          </span>
        </div>
        <button className="font-bold border border-amber-300 px-2 py-0.5 rounded hover:bg-amber-100 uppercase text-[10px] flex gap-1 items-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
          {isES ? 'VOLVER A MI ROL' : 'RETURN TO MY ROLE'}
        </button>
      </div>

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
               <select disabled={user.role === 'CHAMPION'} className="border border-transparent bg-transparent text-slate-700 font-medium text-xs focus:ring-0 cursor-pointer p-0 w-24 disabled:opacity-50">
                  <option>All Country</option>
               </select>
            </div>
            <span className="text-slate-300">/</span>
            
            <div className="flex flex-col">
               <span className="text-[9px] text-slate-400 font-bold uppercase">{t('STATE/PROVINCE', 'ESTADO/PROVINCIA')}</span>
               <select disabled={user.role === 'CHAMPION'} className="border-none bg-transparent text-slate-700 font-medium text-xs focus:ring-0 cursor-pointer p-0 w-28 disabled:opacity-50">
                  <option>All State/Province</option>
               </select>
            </div>
            <span className="text-slate-300">/</span>

            <div className="flex flex-col">
               <span className="text-[9px] text-slate-400 font-bold uppercase">{t('CITY', 'CIUDAD')}</span>
               <select disabled={user.role === 'CHAMPION'} className="border-none bg-transparent text-slate-700 font-medium text-xs focus:ring-0 cursor-pointer p-0 w-20 disabled:opacity-50">
                  <option>All City</option>
               </select>
            </div>
            <span className="text-slate-300">/</span>

            <div className="flex flex-col">
               <span className="text-[9px] text-slate-400 font-bold uppercase">{t('HOSPITAL', 'HOSPITAL')}</span>
               <select disabled={user.role === 'CHAMPION'} className="border border-transparent bg-transparent text-slate-700 font-medium text-xs focus:ring-0 cursor-pointer p-1 -m-1 rounded w-32 disabled:bg-slate-50 disabled:border-slate-200">
                  <option>{user.role === 'CHAMPION' ? user.institution || 'CareWays Testing' : 'All Hospital'}</option>
                  {user.role !== 'CHAMPION' && <option>Hospital Alianza</option>}
                  {user.role !== 'CHAMPION' && <option>Clínica Central</option>}
               </select>
            </div>
         </div>
         <button disabled={user.role === 'CHAMPION'} className="px-4 py-1.5 text-xs font-bold border border-slate-200 text-slate-700 rounded hover:bg-slate-50 uppercase shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
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

      <div className="pt-2">
         {activeTab === 'OVERVIEW' && <GovernanceOverview t={t} />}
         {activeTab === 'USER_MGMT' && <UserManagementCenter t={t} />}
         {activeTab === 'OPERATIONS' && <OperationsCenter t={t} />}
         {activeTab === 'CAPACITY' && <CapacityManagement t={t} />}
         {activeTab === 'LIVE_SESSIONS' && <LiveSessions t={t} />}
         {activeTab === 'RACI' && <RaciTab t={t} />}
         {activeTab === 'SLA_MONITOR' && <SlaMonitor t={t} />}
         {activeTab === 'COMPLIANCE' && <ComplianceCenter t={t} />}
      </div>
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
