import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Award, PlayCircle, Video, Clock, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Certifications() {
  const { language } = useAuth();
  const isES = language === 'ES';
  const t = (en: string, es: string) => isES ? es : en;
  const [activeTab, setActiveTab] = useState('Todos');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('My Certificates', 'Mis Certificados')}</h1>
        <p className="text-slate-500 text-sm mt-1">
          {t('Here you will find all the certificates you have obtained upon completing courses and telesimulations from Careways Collaborative.', 'Aquí encontrarás todos los certificados que has obtenido al completar cursos y telesimulaciones de Careways Collaborative.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-50 text-[#003366] rounded-lg"><Award className="w-5 h-5" /></div>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{t('TOTAL CERTIFICATES', 'CERTIFICADOS TOTALES')}</p>
          </div>
          <span className="text-xl font-black text-slate-800">0</span>
        </Card>
        
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><PlayCircle className="w-5 h-5" /></div>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{t('CLINICAL TEACHING', 'ENSEÑANZA CLÍNICA')}</p>
          </div>
          <span className="text-xl font-black text-slate-800">0</span>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Video className="w-5 h-5" /></div>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{t('TELESIMULATION', 'TELESIMULACIÓN')}</p>
          </div>
          <span className="text-xl font-black text-slate-800">0</span>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-5 h-5" /></div>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{t('PENDING ACCREDITATION', 'ESPERA ACREDITACIÓN')}</p>
          </div>
          <span className="text-xl font-black text-slate-800">0</span>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
          <div className="flex gap-6 overflow-x-auto">
             {['Todos', 'Cursos', 'Telesimulación'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`py-2 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab ? 'border-[#003366] text-[#003366]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
               >
                 {tab === 'Todos' && t('All', 'Todos')}
                 {tab === 'Cursos' && t('Courses', 'Cursos')}
                 {tab === 'Telesimulación' && t('Telesimulation', 'Telesimulación')}
               </button>
             ))}
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center text-xs text-slate-500 font-bold uppercase gap-2">
               <span>{t('Sort by:', 'ORDENAR POR:')}</span>
               <select className="border border-slate-200 rounded px-2 py-1 bg-white outline-none text-slate-700">
                 <option>{t('Most recent', 'Más recientes')}</option>
               </select>
             </div>
             
             <div className="relative w-64 hidden sm:block">
               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
               <input
                 type="text"
                 placeholder={t('Search by title or number...', 'Buscar por título o número...')}
                 className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded w-full focus:ring-2 focus:ring-[#003366] outline-none"
               />
             </div>
          </div>
        </div>

        <div className="p-12 text-center text-slate-500 text-sm">
           <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
           <p className="font-bold text-slate-700 text-base">{t('No certificates found', 'No se encontraron certificados')}</p>
           <p className="mt-1">{t('Adjust filters or search to view your certificates.', 'Ajusta los filtros o la búsqueda para ver tus certificados.')}</p>
        </div>
      </Card>
    </div>
  );
}
