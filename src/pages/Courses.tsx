import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BookOpen, Users, FileCheck, PlayCircle, AlertTriangle, ShieldCheck, Video, Lock, Info, PlusCircle, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/ui/Badge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function Courses() {
  const { user, language } = useAuth();
  const isES = language === 'ES';
  const t = (en: string, es: string) => isES ? es : en;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-800">{t('Course Catalog', 'Catálogo de Cursos')}</h1>
            <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
              {user.role === 'SUPER_ADMIN' && <><GlobeIcon className="w-3 h-3" /> {t('Global Network', 'Red Global')}</>}
              {user.role === 'CHAMPION' && <><BuildingIcon className="w-3 h-3" /> {t('Local Institution', 'Institución Local')}</>}
              {user.role === 'EDUCATOR' && <><UsersIcon className="w-3 h-3" /> {t('Assigned Groups', 'Grupos Asignados')}</>}
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            {t('Explore our educational content to improve your clinical skills through the curriculum.', 'Explora nuestro contenido educativo para mejorar tus habilidades clínicas a través del currículum.')}
          </p>
        </div>
        
        {(user.role === 'SUPER_ADMIN' || user.role === 'CHAMPION') && (
          <button className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white text-sm font-bold rounded hover:bg-blue-900 transition-colors relative group">
            <PlusCircle className="w-4 h-4" /> 
            {user.role === 'SUPER_ADMIN' ? t('New Curriculum', 'Nuevo Pensum Modular') : t('Assign Learning Path', 'Asignar Ruta Local')}
            {/* Tooltip UX */}
            <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-10 text-center">
              {user.role === 'SUPER_ADMIN' ? 
                t('Create modular courses globally.', 'Creación de pensum modular y contingencias globales.') : 
                t('Tag and associate local users.', 'Asignar etiquetas y usuarios de la institución.')}
            </div>
          </button>
        )}
      </div>

      {user.role === 'CLINICAL_USER' && <ClinicalUserCourses t={t} />}
      {(user.role === 'EDUCATOR' || user.role === 'CHAMPION' || user.role === 'SUPER_ADMIN') && <AdminEducatorCourses role={user.role} t={t} />}
    </div>
  );
}

function GlobeIcon({ className }: { className?: string }) { return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> }
function BuildingIcon({ className }: { className?: string }) { return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg> }
function UsersIcon({ className }: { className?: string }) { return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }

function ClinicalUserCourses({ t }: { t: (en: string, es: string) => string }) {
  return (
    <div className="space-y-6">
      <Card className="bg-[#003366] text-white overflow-hidden p-8 border-none flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
           <h2 className="text-2xl font-bold mb-2">{t('Welcome to CareWays', 'Bienvenido a CareWays')}</h2>
           <p className="text-blue-200 text-sm max-w-md">
             {t('Tell us about yourself to personalize your experience. Continue with your life support learning modules.', 'Cuéntanos sobre ti para personalizar tu experiencia. Continúa con tus módulos de aprendizaje de soporte vital.')}
           </p>
           <button className="mt-4 bg-white text-[#003366] font-bold px-4 py-2 rounded text-sm hover:bg-blue-50">
             {t('Complete my profile', 'Completar mi perfil')}
           </button>
        </div>
        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-white opacity-80" />
        </div>
      </Card>

      <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">{t('My Learning Paths', 'Mis Rutas de Aprendizaje')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <Card className="hover:shadow-md transition-shadow cursor-pointer p-0 overflow-hidden flex flex-col">
            <div className="h-32 bg-slate-100 flex items-center justify-center relative">
               <div className="absolute top-3 left-3"><Badge variant="default">{t('In progress', 'En progreso')}</Badge></div>
               <BookOpen className="w-12 h-12 text-slate-300" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
               <h4 className="font-bold text-slate-800 mb-1">{t('Advanced Airway Surgery', 'Cirugía Avanzada de Vía Aérea')}</h4>
               <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                 {t('Management of complications in tracheostomy and airway rescue.', 'Manejo de complicaciones en traqueostomía y rescate de vía aérea.')}
               </p>
               
               <div className="mt-auto">
                 <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                   <span>{t('Theory Progress', 'Progreso Teórico')}</span>
                   <span>64%</span>
                 </div>
                 <div className="w-full bg-slate-200 rounded-full h-2">
                   <div className="bg-[#003366] h-2 rounded-full" style={{width: '64%'}}></div>
                 </div>
               </div>
            </div>
         </Card>

         <Card className="hover:shadow-md transition-shadow cursor-pointer p-0 overflow-hidden flex flex-col">
            <div className="h-32 bg-slate-100 flex items-center justify-center relative">
               <div className="absolute top-3 left-3"><Badge variant="success">{t('Theory Completed', 'Teoría Completada')}</Badge></div>
               <BookOpen className="w-12 h-12 text-slate-300" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
               <h4 className="font-bold text-slate-800 mb-1">{t('Pediatric Sepsis 101', 'Sepsis Pediátrica 101')}</h4>
               <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                 {t('Early identification and management of septic shock.', 'Identificación temprana y manejo del shock séptico.')}
               </p>
               
               <div className="mt-auto">
                 <div className="flex justify-between text-xs font-bold text-emerald-600 mb-1">
                   <span>{t('Post-test Passed', 'Post-test Aprobado')}</span>
                   <span>85%</span>
                 </div>
                 <button className="w-full mt-2 py-1.5 border border-emerald-200 text-xs font-bold text-emerald-700 bg-emerald-50 rounded">
                   {t('Ready for Telesimulation', 'Listo para Telesimulación')}
                 </button>
               </div>
            </div>
         </Card>

         <Card className="opacity-75 cursor-not-allowed p-0 overflow-hidden flex flex-col relative group">
           {/* Tooltip explaining locked state */}
           <div className="absolute hidden group-hover:block top-16 left-1/2 -translate-x-1/2 w-56 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-10 text-center">
              {t('Locked. Complete 100% of theory and pass the post-test with >= 80%.', 'Bloqueado. Completa el 100% de la teoría y aprueba el post-test con >= 80%.')}
            </div>

            <div className="h-32 bg-slate-100 flex items-center justify-center relative bg-gradient-to-br from-slate-100 to-slate-200">
               <div className="absolute top-3 right-3 text-slate-400 bg-white p-1.5 rounded-full shadow-sm"><Lock className="w-4 h-4" /></div>
               <Video className="w-12 h-12 text-slate-300" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
               <h4 className="font-bold text-slate-500 mb-1 flex items-center gap-2">{t('Live Telesimulation: Sepsis', 'Telesimulación en Vivo: Sepsis')}</h4>
               <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                 {t('Practical application scenario with instructors.', 'Escenario de aplicación práctica con instructores.')}
               </p>
               
               <div className="mt-auto">
                 <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                   <span className="flex items-center gap-1"><Info className="w-3 h-3"/> {t('Prerequisites pending', 'Prerrequisitos pendientes')}</span>
                 </div>
                 <button disabled className="w-full mt-2 py-1.5 cursor-not-allowed bg-slate-100 text-xs font-bold text-slate-400 rounded">
                   {t('Locked System', 'Sistema Bloqueado')}
                 </button>
               </div>
            </div>
         </Card>
      </div>
    </div>
  )
}

function AdminEducatorCourses({ role, t }: { role: string; t: (en: string, es: string) => string }) {
  const moduleData = [
    { name: t('Intro', 'Introducción'), consumption: 92 },
    { name: t('Surgery', 'Cirugía'), consumption: 78 },
    { name: t('PICU', 'PICU'), consumption: 85 },
    { name: t('Ward', 'Ward Nursing'), consumption: 60 },
    { name: t('Speech', 'Speech Therapy'), consumption: 55 },
    { name: t('Anesth', 'Anesthesia'), consumption: 88 },
    { name: t('Parent', 'Pat/Child'), consumption: 45 },
  ];

  const certificationData = [
    { name: t('Completed', 'Realizados'), value: 420 },
    { name: t('Pending', 'Pendientes'), value: 130 },
    { name: t('Rejected', 'Rechazados'), value: 85 },
  ];
  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      
      {/* Educational Statistics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Consumption */}
        <Card className="flex flex-col">
          <CardHeader>
             <CardTitle>{t('% Consumption of viewed courses', '% Consumo de cursos vistos')}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moduleData}>
                    <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} opacity={0.6} />
                    <YAxis label={{ value: '%', position: 'insideLeft', dataKey: 'consumption'}} tick={{fontSize: 10}} opacity={0.6} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{fontSize: "12px", borderRadius: "8px"}} />
                    <Bar dataKey="consumption" fill="#003366" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

        {/* Certifications Overview */}
        <Card className="flex flex-col relative group">
          {/* Tooltip for Yield Ranking Note */}
          <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-10 text-center">
             {t('Yield Ranking Score includes: Learning + Commitment + Consistency.', 'El Score de Yield Ranking incluye: Aprendizaje + Compromiso + Consistencia.')}
          </div>
          <CardHeader>
             <CardTitle className="flex justify-between items-center">
               <span>{t('Certifications & Yield Ranking', 'Certificaciones y Yield Ranking')}</span>
               <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold uppercase">{t('Composite Score', 'Score Compuesto')}</span>
             </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6">
             <div className="w-48 h-48 relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={certificationData} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                      {certificationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{fontSize: "12px", borderRadius: "8px"}} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-2xl font-black text-slate-800">635</span>
                   <span className="text-[10px] text-slate-400 font-bold uppercase">{t('Total', 'Total')}</span>
                </div>
             </div>
             <div className="flex-1 w-full space-y-4">
                <div>
                   <h4 className="text-xs font-bold text-slate-700 uppercase mb-2 border-b border-slate-100 pb-1">{t('Rejected Attempts Breakdown', 'Desglose de Rechazos')}</h4>
                   <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-slate-500 font-medium">{t('1 Attempt', '1 Intento')}</span>
                         <span className="font-bold text-slate-800">45</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-slate-500 font-medium">{t('2 Attempts', '2 Intentos')}</span>
                         <span className="font-bold text-slate-800">25</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-red-500 font-medium">{t('3+ Attempts (Blocked)', '3+ Intentos (Bloqueados)')}</span>
                         <span className="font-bold text-red-600">15</span>
                      </div>
                   </div>
                </div>

                {/* Score Indicators added for the UX UI role logic */}
                <div className="pt-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">{t('Yield Ranking Groups', 'Grupos Yield Ranking')}</h4>
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                     <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Alto</span>
                     <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Medio</span>
                     <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Riesgo</span>
                  </div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Telesimulations Overview */}
      <h3 className="text-lg font-bold text-slate-800 mt-8 border-b border-slate-200 pb-2">{t('Telesimulation Sessions Tracking', 'Seguimiento de Sesiones de Telesimulación')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
         <Card className="p-4 flex flex-col justify-center items-center text-center bg-blue-50/50">
           <Video className="w-5 h-5 text-blue-500 mb-2" />
           <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tight mb-1">{t('Total Sessions', 'Total Sesiones')}</p>
           <span className="text-2xl font-black text-[#003366]">148</span>
         </Card>
         <Card className="p-4 flex flex-col justify-center items-center text-center bg-indigo-50/50">
           <Users className="w-5 h-5 text-indigo-500 mb-2" />
           <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tight mb-1">{t('Students', 'Estudiantes Particip.')}</p>
           <span className="text-2xl font-black text-[#003366]">610</span>
         </Card>
         <Card className="p-4 flex flex-col justify-center items-center text-center">
           <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-1">{t('0 Simulations', '0 Simulaciones')}</p>
           <span className="text-xl font-bold text-slate-700">85</span>
         </Card>
         <Card className="p-4 flex flex-col justify-center items-center text-center">
           <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-tight mb-1">{t('1 Simulation', '1 Simulación')}</p>
           <span className="text-xl font-bold text-slate-700">220</span>
         </Card>
         <Card className="p-4 flex flex-col justify-center items-center text-center">
           <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-tight mb-1">{t('2 Simulations', '2 Simulaciones')}</p>
           <span className="text-xl font-bold text-slate-700">190</span>
         </Card>
         <Card className="p-4 flex flex-col justify-center items-center text-center">
           <p className="text-[#003366] text-[10px] font-bold uppercase tracking-tight mb-1">{t('3+ Simulations', '3+ Simulaciones')}</p>
           <span className="text-xl font-bold text-slate-700">115</span>
         </Card>
      </div>

    </div>
  );
}

