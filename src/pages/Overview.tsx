import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Activity, Server, Database, Globe, Users, Building2, BookOpen, AppWindow, ShieldAlert, ArrowRight, UserCheck, AlertTriangle, FileCheck, Stethoscope, LineChart, BrainCircuit, ShieldCheck } from 'lucide-react';

export function Overview() {
  const { user, language } = useAuth();
  const isES = language === 'ES';

  const t = (en: string, es: string) => isES ? es : en;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800">
              {user.role === 'SUPER_ADMIN' 
                ? t('Multi-Tenant Platform', 'Plataforma Multi-Tenant') 
                : t('Institution overview', 'Visión de la institución')}
            </h1>
            <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded">
              {user.role.replace('_', ' ')}
            </span>
          </div>
          <p className="text-slate-500 mt-1">
            {user.role === 'SUPER_ADMIN' 
              ? t('Global view of the ecosystem by country and institution.', 'Visión global del ecosistema por país e institución.') 
              : t('Institution overview, performance and alerts.', 'Visión de la institución, rendimiento y alertas.')}
          </p>
        </div>
        
        {/* Top Filters (Only for SUPER_ADMIN to match the image exactly) */}
        {user.role === 'SUPER_ADMIN' && (
           <div className="flex gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-sm">
                 <Globe className="w-4 h-4 text-blue-500" />
                 <select className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer">
                    <option>{t('All Countries', 'Todos los Países')}</option>
                 </select>
              </div>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-sm">
                 <Building2 className="w-4 h-4 text-emerald-500" />
                 <select className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer">
                    <option>{t('All Cities', 'Todas las Ciudades')}</option>
                 </select>
              </div>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-sm">
                 <Activity className="w-4 h-4 text-indigo-500" />
                 <select className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer">
                    <option>{t('All Hospitals', 'Todos los Hospitales')}</option>
                 </select>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 text-sm font-bold shadow-sm">
                 {t('Refresh', 'Actualizar')}
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-[#003366] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-900">
                 {t('Export', 'Exportar')}
              </button>
           </div>
        )}
      </div>

      {user.role === 'SUPER_ADMIN' && <SuperAdminOverview t={t} />}
      {user.role === 'CHAMPION' && <ChampionOverview />}
      {user.role === 'DATA_ANALYST' && <DataAnalystOverview />}
      {user.role === 'EDUCATOR' && <EducatorOverview />}
    </div>
  );
}

function SuperAdminOverview({ t }: { t: (en: string, es: string) => string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
               <Globe className="w-5 h-5" />
            </div>
            <div>
               <h2 className="text-lg font-bold text-slate-800 tracking-tight uppercase">{t('MULTI-TENANT OVERVIEW', 'VISIÓN MULTI-TENANT')}</h2>
               <p className="text-slate-500 text-xs">{t('Global view of the ecosystem by country and institution', 'Visión global del ecosistema por país e institución')}</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Institutions */}
        <Card className="p-5 flex flex-col justify-between">
           <div className="flex items-start justify-between">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Building2 className="w-4 h-4" /></div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1"><LineChart className="w-3 h-3" /> +15%</span>
           </div>
           <div className="mt-4">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-1">{t('ACTIVE INSTITUTIONS', 'INSTITUCIONES ACTIVAS')}</p>
              <div className="text-3xl font-black text-slate-800">43</div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tight mt-1">{t('Across 12 countries and 34 cities', 'A través de 12 países y 34 ciudades')}</p>
           </div>
           <div className="mt-4 h-8 flex items-end">
              <div className="w-full bg-blue-100 rounded-t h-full relative overflow-hidden">
                 <svg className="absolute bottom-0 w-full h-full text-blue-500" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 100 L20 80 L40 90 L60 40 L80 50 L100 10" vectorEffect="non-scaling-stroke"/>
                 </svg>
              </div>
           </div>
        </Card>
        
        {/* Geographic Dist */}
        <Card className="p-5 flex flex-col justify-between">
           <div className="flex items-start justify-between">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Globe className="w-4 h-4" /></div>
           </div>
           <div className="mt-4">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-1">{t('GEOGRAPHIC DIST.', 'DIST. GEOGRÁFICA')}</p>
              <div className="text-3xl font-black text-slate-800">28</div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tight mt-1">{t('Active regions', 'Regiones activas')}</p>
           </div>
           <div className="mt-4 h-8 flex items-end gap-1">
              <div className="w-1/3 bg-emerald-500 rounded-t h-full"></div>
              <div className="w-1/4 bg-blue-400 rounded-t h-2/3"></div>
              <div className="w-1/5 bg-blue-300 rounded-t h-1/2"></div>
              <div className="flex-1 bg-blue-200 rounded-t h-1/4"></div>
           </div>
           <p className="text-[9px] font-bold text-slate-400 uppercase mt-2">{t('Top: LatAm (65%), USA (35%)', 'Top: LatAm (65%), USA (35%)')}</p>
        </Card>

        {/* MOM Growth Rate */}
        <Card className="p-5 flex flex-col justify-between">
           <div className="flex items-start justify-between">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Activity className="w-4 h-4" /></div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-tight">META: 5%</span>
           </div>
           <div className="mt-4">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-1">{t('MOM GROWTH RATE', 'TASA CRECIMIENTO MOM')}</p>
              <div className="text-3xl font-black text-slate-800">8.4<span className="text-xl text-slate-400">%</span></div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tight mt-1">{t('Calculated from new onboarding', 'Calculado desde onbording nuevo')}</p>
           </div>
           <div className="mt-4 flex items-center gap-2">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-amber-500 w-3/4 rounded-full"></div>
              </div>
              <span className="text-[#003366] text-[10px]"><ShieldCheck className="w-3 h-3 text-emerald-500" /></span>
           </div>
        </Card>

        {/* Network Coverage */}
        <Card className="p-5 flex flex-col justify-between">
           <div className="flex items-start justify-between">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Users className="w-4 h-4" /></div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tight">GLOBAL</span>
           </div>
           <div className="mt-4">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight mb-1">{t('NETWORK COVERAGE', 'COBERTURA DE RED')}</p>
              <div className="text-3xl font-black text-slate-800">12</div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tight mt-1">{t('Countries with active presence', 'Países con presencia activa')}</p>
           </div>
           <div className="mt-4 flex gap-2 w-full text-center text-[10px] font-bold uppercase">
              <div className="flex-1 bg-blue-50 text-blue-600 rounded py-1 flex flex-col"><span className="text-sm">3</span> {t('AM', 'AM')}</div>
              <div className="flex-1 bg-emerald-50 text-emerald-600 rounded py-1 flex flex-col"><span className="text-sm">4</span> {t('EU', 'EU')}</div>
              <div className="flex-1 bg-amber-50 text-amber-600 rounded py-1 flex flex-col"><span className="text-sm">5</span> {t('AS-AF', 'AS-AF')}</div>
           </div>
        </Card>
      </div>

      <Card>
         <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">{t('Region Details', 'Detalles de Región')}</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <tr>
                     <th className="px-5 py-3">{t('REGIÓN', 'REGIÓN')}</th>
                     <th className="px-5 py-3">{t('PAÍS', 'PAÍS')}</th>
                     <th className="px-5 py-3 text-center">{t('INSTITUCIONES', 'INSTITUCIONES')}</th>
                     <th className="px-5 py-3 text-center">{t('PROFESIONALES', 'PROFESIONALES')}</th>
                     <th className="px-5 py-3 text-right">{t('ESTADO', 'ESTADO')}</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                     <td className="px-5 py-4 font-bold text-[#003366] flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> {t('Latinoamérica', 'Latinoamérica')}</td>
                     <td className="px-5 py-4 text-slate-600 text-xs font-medium">{t('México, Colombia, Argentina', 'México, Colombia, Argentina')}</td>
                     <td className="px-5 py-4 text-center font-bold text-slate-800">18</td>
                     <td className="px-5 py-4 text-center font-bold text-slate-800">6,240</td>
                     <td className="px-5 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {t('ACTIVO', 'ACTIVO')}</span>
                     </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                     <td className="px-5 py-4 font-bold text-[#003366] flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> {t('Norteamérica', 'Norteamérica')}</td>
                     <td className="px-5 py-4 text-slate-600 text-xs font-medium">{t('Estados Unidos, Canadá', 'Estados Unidos, Canadá')}</td>
                     <td className="px-5 py-4 text-center font-bold text-slate-800">10</td>
                     <td className="px-5 py-4 text-center font-bold text-slate-800">3,800</td>
                     <td className="px-5 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {t('ACTIVO', 'ACTIVO')}</span>
                     </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                     <td className="px-5 py-4 font-bold text-[#003366] flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div> {t('Europa', 'Europa')}</td>
                     <td className="px-5 py-4 text-slate-600 text-xs font-medium">{t('España, Francia, Alemania, Italia', 'España, Francia, Alemania, Italia')}</td>
                     <td className="px-5 py-4 text-center font-bold text-slate-800">8</td>
                     <td className="px-5 py-4 text-center font-bold text-slate-800">2,150</td>
                     <td className="px-5 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-50 text-blue-700 text-[10px] font-bold uppercase"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {t('EXPANSIÓN', 'EXPANSIÓN')}</span>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </Card>

      <div>
         <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
               <Activity className="w-4 h-4" />
            </div>
            <div>
               <h2 className="text-sm font-bold text-slate-800 tracking-tight uppercase">{t('PLATFORM PERFORMANCE', 'RENDIMIENTO DE PLATAFORMA')}</h2>
               <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tight">{t('Real-time technical metrics', 'Métricas técnicas en tiempo real')}</p>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center"><Activity className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{t('SYSTEM UPTIME', 'TIEMPO DE ACTIVIDAD')}</p>
                    <p className="text-lg font-black text-slate-800 mt-0.5">99.98%</p>
                  </div>
               </div>
               <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-tight">META: ≥99.5%</span>
            </Card>
            <Card className="p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center"><Activity className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{t('AVG. API LATENCY', 'LATENCIA MEDIA API')}</p>
                    <p className="text-lg font-black text-slate-800 mt-0.5">142ms</p>
                  </div>
               </div>
               <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-tight">OPTIMAL</span>
            </Card>
            <Card className="p-4 flex items-center justify-between border-l-4 border-l-red-500">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center"><AlertTriangle className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{t('ERROR RATE', 'TASA DE ERRORES')}</p>
                    <p className="text-lg font-black text-red-600 mt-0.5">0.8%</p>
                  </div>
               </div>
               <span className="text-[9px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-tight">META: <span className="font-sans">&lt;</span>1%</span>
            </Card>
         </div>
      </div>
    </div>
  );
}

function ChampionOverview() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'INSTITUTION USERS', value: '45', icon: Users, color: 'text-blue-500' },
          { label: 'OPEN CASES', value: '12', icon: Activity, color: 'text-amber-500' },
          { label: 'CERTIFICATION RATE', value: '88%', icon: BookOpen, color: 'text-emerald-500' },
          { label: 'PENDING APPROVALS', value: '3', icon: UserCheck, color: 'text-red-500' },
        ].map((stat, i) => (
          <div key={i}>
            <Card className="p-5">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-tight mb-1">{stat.label}</p>
              <div className="flex items-end justify-between mt-2">
                <span className="text-3xl font-black text-[#003366]">{stat.value}</span>
                <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Local Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded border border-amber-100">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Inactive User Warning</h4>
                  <p className="text-xs text-amber-700 mt-1">2 Clinical Users have not logged in for 30 days.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-100">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Missing PIM3 Data</h4>
                  <p className="text-xs text-red-700 mt-1">Found 4 patient records missing mandatory PIM3 parameters.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Institution Yield Ranking</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8 text-center bg-slate-50 rounded-lg m-5 border border-slate-100">
             <div className="text-4xl font-bold text-emerald-600 mb-2">Top 5%</div>
             <p className="text-sm text-slate-500">Your institution ranks in the top 5% of the CareWays Collaborative Registry for data quality.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DataAnalystOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'SUBMITTED CASES', value: '142', icon: FileCheck, color: 'text-blue-500' },
          { label: 'DRAFT CASES', value: '8', icon: Activity, color: 'text-amber-500' },
          { label: 'MISSING DATA ALERTS', value: '14', icon: AlertTriangle, color: 'text-red-500' },
          { label: 'PIM3 COMPLETION', value: '94%', icon: Stethoscope, color: 'text-emerald-500' },
        ].map((stat, i) => (
          <div key={i}>
            <Card className="p-5">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-tight mb-1">{stat.label}</p>
              <div className="flex items-end justify-between mt-2">
                <span className="text-3xl font-black text-[#003366]">{stat.value}</span>
                <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
           <CardHeader>
             <CardTitle>Métricas y Score PIM3</CardTitle>
           </CardHeader>
           <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase">Probabilidad de Mortalidad</p>
                    <div className="text-2xl font-black text-[#003366] mt-1">16.4%</div>
                    <p className="text-[10px] text-slate-400 mt-1">Fórmula Analítica PIM3</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase">Score Calculadora</p>
                    <div className="text-2xl font-black text-[#003366] mt-1">-1.63</div>
                    <p className="text-[10px] text-slate-400 mt-1">Logaritmo predictivo</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase">Tasa Mortalidad Ajustada</p>
                    <div className="text-2xl font-black text-amber-600 mt-1">1.12 O/E</div>
                    <p className="text-[10px] text-slate-400 mt-1">Observada vs Esperada</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase">Higiene de Datos</p>
                    <div className="text-2xl font-black text-emerald-600 mt-1">98%</div>
                    <p className="text-[10px] text-slate-400 mt-1">Variables críticas completas</p>
                 </div>
              </div>

              <div>
                 <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-[#003366]" /> Variables Clínicas Críticas Recolectadas (Input PIM3)</h4>
                 <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                    <span className="px-2 py-1 bg-slate-100 rounded">Reacción Pupilar</span>
                    <span className="px-2 py-1 bg-slate-100 rounded">Presión Arterial Sistólica</span>
                    <span className="px-2 py-1 bg-slate-100 rounded">Relación de Oxigenación</span>
                    <span className="px-2 py-1 bg-slate-100 rounded">Exceso de Base</span>
                    <span className="px-2 py-1 bg-slate-100 rounded">Ventilación Mecánica</span>
                    <span className="px-2 py-1 bg-slate-100 rounded">Tipo de Admisión</span>
                    <span className="px-2 py-1 bg-slate-100 rounded">Recuperación Quirúrgica</span>
                    <span className="px-2 py-1 bg-slate-100 rounded">Estratificación de Riesgo</span>
                 </div>
              </div>
           </CardContent>
        </Card>

        <Card>
           <CardHeader>
             <div className="flex items-center justify-between w-full">
               <CardTitle>Correlación Educativa vs Outcomes</CardTitle>
               <button className="text-[10px] font-bold text-[#003366] uppercase">Exportar Análisis</button>
             </div>
           </CardHeader>
           <CardContent>
              <div className="h-64 bg-slate-50 border border-slate-100 rounded flex flex-col items-center justify-center text-slate-400 relative p-4">
                 <LineChart className="w-12 h-12 mb-3 text-slate-300" />
                 <p className="text-sm text-center font-medium">Gráfico de correlación dinámico: Desempeño Educacional VS Tasa Mortalidad Ajustada y Eventos Críticos</p>
                 <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-bold text-slate-400">
                   <span>Certificación &lt; 50%</span>
                   <span>Certificación &gt; 90%</span>
                 </div>
              </div>
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
                 <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                 <div>
                    <h5 className="text-xs font-bold text-red-800">Flag de Exclusión: Mortalidad &lt; 24h</h5>
                    <p className="text-[10px] text-red-700 mt-1">3 pacientes fallecidos en las primeras 24h desde admisión han sido excluidos del benchmark estándar bajo la flag <code>analytics_excludeMortalityBenchmark</code>.</p>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}

function EducatorOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'ASSIGNED COURSES', value: '8', icon: BookOpen, color: 'text-blue-500' },
          { label: 'ACTIVE LEARNERS', value: '124', icon: Users, color: 'text-emerald-500' },
          { label: 'CERTIFICATIONS ISSUED', value: '42', icon: FileCheck, color: 'text-indigo-500' },
        ].map((stat, i) => (
          <div key={i}>
            <Card className="p-5">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-tight mb-1">{stat.label}</p>
              <div className="flex items-end justify-between mt-2">
                <span className="text-3xl font-black text-[#003366]">{stat.value}</span>
                <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

