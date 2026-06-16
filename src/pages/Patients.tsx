import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Search, Filter, MoreHorizontal, Download, UploadCloud, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Patients() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('ALL');

  if (user.role === 'EDUCATOR' || user.role === 'GUEST' || user.role === 'PARENT_PATIENT') {
    return <div className="p-8 text-center text-slate-500">You do not have permission to access patient records.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Patient Registry</h1>
          <p className="text-slate-500 text-sm mt-1">Track admissions, assess clinical outcomes and data registrations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          
          {(user.role === 'SUPER_ADMIN' || user.role === 'CHAMPION' || user.role === 'DATA_ANALYST') && (
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
              <UploadCloud className="w-4 h-4" /> Bulk upload
            </button>
          )}

          {(user.role === 'SUPER_ADMIN' || user.role === 'CHAMPION' || user.role === 'CLINICAL_USER') && (
             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
               + New patient
             </button>
          )}
        </div>
      </div>

      <Card>
        <div className="border-b border-slate-200 px-5 bg-slate-50">
          <div className="flex items-center gap-6 overflow-x-auto">
             <div className="flex items-center gap-2 py-3 border-r border-slate-200 pr-4">
               <Filter className="w-4 h-4 text-slate-400" />
               <span className="text-sm font-medium text-slate-700">FILTERS</span>
             </div>
             
             {['ALL', 'DRAFT', 'COMPLETE'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
               >
                 {tab.charAt(0) + tab.slice(1).toLowerCase()}
               </button>
             ))}

            <div className="flex-1 py-2 hidden md:block">
               {user.role === 'SUPER_ADMIN' && (
                 <div className="flex gap-2">
                   <select className="text-sm bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none">
                     <option>Institution...</option>
                   </select>
                   <select className="text-sm bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none">
                     <option>Diagnosis...</option>
                   </select>
                 </div>
               )}
            </div>
             
            <div className="relative py-2 hidden sm:block">
               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
               <input
                 type="text"
                 placeholder="Search by name, MRN or admission..."
                 className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-md w-64 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
               />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Patient / Info</th>
                <th className="px-6 py-4">Admission / Dis</th>
                <th className="px-6 py-4">Diagnosis #</th>
                <th className="px-6 py-4">Completion</th>
                <th className="px-6 py-4 text-right">Risk / Alerts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
               {/* Mock Data */}
               {[
                 { 
                   name: 'MARIA JOSÉ CHAMORRO CARCAMO', 
                   unit: 'PEDIATRIC PICU', 
                   admDate: 'Dec 17, 2025', 
                   disDate: '15:23', 
                   diag: 2, 
                   completion: 72, 
                   issue: 'Missing Data: PIM3 missing mandatory param.',
                   risk: 'low' 
                 },
                 { 
                   name: 'ROSA MARIA CASTILLO VILLEGAS', 
                   unit: 'NEONATAL NICU', 
                   admDate: 'Dec 12, 2025', 
                   disDate: '09:12', 
                   diag: 0, 
                   completion: 72, 
                   issue: 'Missing Data: PIM3 missing mandatory param.',
                   risk: 'low' 
                 },
                 { 
                   name: 'LIAM OROZCO ARRIETA', 
                   unit: 'PEDIATRIC PICU', 
                   admDate: 'Nov 1, 2025', 
                   disDate: '10:00', 
                   diag: 4, 
                   completion: 100, 
                   issue: 'Clear',
                   risk: 'high' 
                 }
               ].map((patient, i) => (
                 <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">
                         {patient.name.charAt(0)}
                       </div>
                       <div>
                         <div className="font-semibold text-slate-800">{patient.name}</div>
                         <div className="text-xs text-slate-500 uppercase mt-0.5">{patient.unit}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     <div className="font-medium">{patient.admDate}</div>
                     <div className="text-xs text-slate-500">{patient.disDate}</div>
                   </td>
                   <td className="px-6 py-4 font-mono text-slate-600">{patient.diag}</td>
                   <td className="px-6 py-4 min-w-[200px]">
                     <div className="flex items-center justify-between text-xs mb-1 font-medium">
                       <span className="text-emerald-700">72%</span> <span className="text-slate-400">DRAFT</span>
                     </div>
                     <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                       <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${patient.completion}%` }}></div>
                     </div>
                     {patient.completion < 100 && (
                       <p className="text-[10px] text-amber-600 mt-1 truncate max-w-[250px]">
                          {patient.issue}
                       </p>
                     )}
                   </td>
                   <td className="px-6 py-4 text-right flex items-center justify-end gap-3 h-full pt-6">
                     {patient.risk === 'high' 
                        ? <Badge variant="error">HIGH RISK</Badge> 
                        : <Badge variant="success">LOW RISK</Badge>}
                     
                     {patient.completion < 100 && <div className="w-2 h-2 rounded-full bg-amber-500"></div>}
                     <button className="text-blue-600 hover:text-blue-800 font-medium text-xs uppercase tracking-wider ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       Open <ChevronDown className="inline w-3 h-3 -rotate-90" />
                     </button>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
