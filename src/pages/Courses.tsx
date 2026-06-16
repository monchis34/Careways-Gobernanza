import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BookOpen, Users, FileCheck, PlayCircle, AlertTriangle, ShieldCheck, Video } from 'lucide-react';
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
          <h1 className="text-2xl font-bold text-slate-800">{t('Course Catalog', 'Catálogo de Cursos')}</h1>
          <p className="text-slate-500 text-sm mt-1">
            {t('Explore our educational content to improve your clinical skills through the curriculum.', 'Explora nuestro contenido educativo para mejorar tus habilidades clínicas a través del currículum.')}
          </p>
        </div>
        
        {(user.role === 'SUPER_ADMIN' || user.role === 'EDUCATOR') && (
          <button className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white text-sm font-bold rounded hover:bg-blue-900 transition-colors">
            + {t('New Course', 'Nuevo Curso')}
          </button>
        )}
      </div>

      {user.role === 'CLINICAL_USER' && <ClinicalUserCourses t={t} />}
      {(user.role === 'EDUCATOR' || user.role === 'CHAMPION' || user.role === 'SUPER_ADMIN') && <AdminEducatorCourses role={user.role} t={t} />}
    </div>
  );
}

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
                   <span>{t('Progress', 'Progreso')}</span>
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
               <div className="absolute top-3 left-3"><Badge variant="success">{t('Completed', 'Completado')}</Badge></div>
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
                   <span>92%</span>
                 </div>
                 <button className="w-full mt-2 py-1.5 border border-slate-200 text-xs font-bold text-slate-600 rounded">
                   {t('Download Certificate', 'Descargar Certificado')}
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
        <Card className="flex flex-col">
          <CardHeader>
             <CardTitle>{t('Total Certifications Overview', 'Resumen de Certificaciones')}</CardTitle>
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

