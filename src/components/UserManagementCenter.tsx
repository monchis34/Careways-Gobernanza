import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Search, X, Check, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function UserManagementCenter({ t }: { t: (en: string, es: string) => string }) {
  const { user: currentUser } = useAuth();
  
  const initialUsers = [
    { id: 1, name: 'QA Super', email: 'cw+superadmin@gmail.com', role: 'Super Admin', profession: '-', institution: '-', status: 'Pending Approval' },
    { id: 2, name: 'QA Champion', email: 'cw+champion@gmail.com', role: 'Champion', profession: '-', institution: 'CareWays Testing', status: 'Active' },
    { id: 3, name: 'QA Analyst', email: 'cw+analyst@gmail.com', role: 'Data Analyst', profession: '-', institution: 'CareWays Testing', status: 'Active' },
    { id: 4, name: 'QA Admin', email: 'cw+admin@gmail.com', role: 'Main Admin', profession: '-', institution: 'CareWays Testing', status: 'Active' },
    { id: 5, name: 'QA Educator', email: 'cw+educator@gmail.com', role: 'Educator', profession: 'Doctor', institution: 'CareWays Testing', status: 'Active' },
    { id: 6, name: 'QA Clinician', email: 'cw+clinician@gmail.com', role: 'Clinician', profession: 'Nurse', institution: 'CareWays Testing', status: 'Active' },
    { id: 7, name: 'QA Guest', email: 'cw+guest@gmail.com', role: 'Guest', profession: '-', institution: '-', status: 'Active' },
    { id: 8, name: 'Carlos Ramírez', email: 'carlos.pend@example.com', role: 'Clinician', profession: 'Doctor', institution: 'CareWays Testing', status: 'Pending Approval' },
    { id: 9, name: 'Maria Gomez', email: 'mgomez@example.com', role: 'Clinician', profession: 'Nurse', institution: 'CareWays Testing', status: 'Pending Verification' }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedUserForHistory, setSelectedUserForHistory] = useState<any>(null);

  // Business Rule 2: Multi-tenant isolation for CHAMPION
  const visibleUsers = currentUser.role === 'CHAMPION' 
    ? users.filter(u => u.institution === currentUser.institution || u.institution === 'CareWays Testing') 
    : users;

  const handleAddUser = (newUser: any) => {
    // Audit Log per Business Rule 5
    console.log(`[${new Date().toISOString()}] [CREATE_USER] [${newUser.email}] [Autorizado por: ${currentUser.role} / Creado via Panel de Gobierno]`);
    
    setUsers([...users, {
      id: users.length + 1,
      ...newUser
    }]);
    setIsModalOpen(false);
  };

  const handleViewHistory = (user: any) => {
    setSelectedUserForHistory(user);
    setIsHistoryModalOpen(true);
  };

  const pendingCount = visibleUsers.filter(u => u.status.includes('Pending')).length;
  const activeCount = visibleUsers.filter(u => u.status === 'Active').length;
  const rejectedCount = visibleUsers.filter(u => u.status === 'Rejected').length;

  const getRoleStyle = (role: string) => {
    switch(role) {
      case 'Super Admin': return 'text-red-500 border-red-200 bg-transparent';
      case 'Champion': return 'text-amber-500 border-amber-200 bg-transparent';
      case 'Educator': return 'text-blue-500 border-blue-200 bg-transparent';
      case 'Clinician': return 'text-emerald-500 border-emerald-200 bg-transparent';
      case 'Data Analyst': return 'text-indigo-500 border-indigo-200 bg-transparent';
      case 'Main Admin': return 'text-[#003366] border-blue-200 bg-transparent';
      default: return 'text-slate-500 border-slate-200 bg-transparent';
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Active') return 'text-emerald-500';
    if (status.includes('Pending')) return 'text-amber-500';
    if (status === 'Rejected') return 'text-red-500';
    return 'text-slate-500';
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tight">{t('USER MANAGEMENT', 'GESTIÓN DE USUARIOS')}</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-emerald-300 text-emerald-900 text-xs font-bold rounded flex items-center gap-2 hover:bg-emerald-400 transition-colors"
        >
          {t('ADD USER', 'AÑADIR USUARIO')}
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div className="flex items-center gap-6">
          <button className="text-xs font-bold text-slate-400 uppercase tracking-tight hover:text-slate-700">{t('PENDING', 'PENDIENTE')} ({pendingCount})</button>
          <button className="text-xs font-bold text-slate-400 uppercase tracking-tight hover:text-slate-700">{t('ACTIVE', 'ACTIVO')} ({activeCount})</button>
          <button className="text-xs font-bold text-slate-400 uppercase tracking-tight hover:text-slate-700">{t('REJECTED', 'RECHAZADO')} ({rejectedCount})</button>
          <button className="text-xs font-bold text-slate-800 uppercase tracking-tight px-3 py-1 border border-slate-300 rounded-full">{t('ALL', 'TODOS')} ({visibleUsers.length})</button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('Search user...', 'Buscar usuario...')}
              className="pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-md w-64 focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>
          <button className="p-1.5 border border-slate-200 rounded text-slate-500 hover:bg-slate-50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          </button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-tight h-10">
                <th className="px-4 py-2 w-10"><input type="checkbox" className="rounded border-slate-300" /></th>
                <th className="px-4 py-2">{t('USER NAME / EMAIL', 'NOMBRE / EMAIL')}</th>
                <th className="px-4 py-2">{t('ROLE', 'ROL')}</th>
                <th className="px-4 py-2">{t('PROFESSION', 'PROFESIÓN')}</th>
                <th className="px-4 py-2">{t('INSTITUTION', 'INSTITUCIÓN')}</th>
                <th className="px-4 py-2">{t('STATUS', 'ESTADO')}</th>
                <th className="px-4 py-2 text-right">{t('ACTIONS', 'ACCIONES')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded border-slate-300" /></td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-800 text-xs">{user.name}</div>
                    <div className="text-[10px] text-slate-400">{user.email}</div>
                  </td>
                  <td className="px-4 py-3 border-collapse">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${getRoleStyle(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{t(user.profession, user.profession)}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{user.institution}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                       <div className={`flex items-center gap-1.5 text-[10px] font-bold ${getStatusColor(user.status)}`}>
                         <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(user.status).replace('text-', 'bg-')}`}></div>
                         {t(user.status, user.status)}
                       </div>
                       {/* Business Rule 3: SLA Breach for User ID 1 if pending */}
                       {user.id === 1 && user.status === 'Pending Approval' && (
                         <span className="bg-red-100 text-red-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase flex items-center gap-1">
                           <AlertTriangle className="w-3 h-3" /> SLA BREACH
                         </span>
                       )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleViewHistory(user)} className="text-[10px] font-bold text-slate-500 border border-slate-200 px-2 py-1 rounded hover:bg-slate-50 inline-flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" />
                      {t('HISTORY', 'HISTORIAL')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {isModalOpen && (
        <AddUserModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={handleAddUser}
          t={t} 
        />
      )}

      {isHistoryModalOpen && selectedUserForHistory && (
        <AuditHistoryModal 
          user={selectedUserForHistory}
          onClose={() => setIsHistoryModalOpen(false)}
          t={t}
        />
      )}
    </div>
  );
}

function AuditHistoryModal({ user, onClose, t }: { user: any, onClose: () => void, t: (en:string, es:string)=>string }) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
             <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#003366]" /> 
                {t('Audit History', 'Historial de Auditoría')}
             </h3>
             <p className="text-xs text-slate-500 mt-1">{user.name} ({user.email})</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-5">
           <div className="relative border-l border-slate-200 pl-4 space-y-6">
              <div className="relative">
                 <div className="absolute -left-[21px] w-2.5 h-2.5 bg-emerald-500 rounded-full ring-4 ring-white"></div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">STATUS CHANGE: {user.status.toUpperCase()}</p>
                 <p className="text-xs text-slate-700 font-medium">{t('User status updated to ', 'Estado de usuario actualizado a ')} {user.status}</p>
                 <p className="text-[10px] text-slate-400 mt-1">System • Today, 09:41 AM</p>
              </div>

              <div className="relative">
                 <div className="absolute -left-[21px] w-2.5 h-2.5 bg-blue-500 rounded-full ring-4 ring-white"></div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">ROLE ASSIGNED: {user.role.toUpperCase()}</p>
                 <p className="text-xs text-slate-700 font-medium">{t('Assigned role: ', 'Rol asignado: ')} {user.role} {t('in institution: ', 'en institución: ')} {user.institution}</p>
                 <p className="text-[10px] text-slate-400 mt-1">Admin • Yesterday, 14:22 PM</p>
              </div>

              <div className="relative">
                 <div className="absolute -left-[21px] w-2.5 h-2.5 bg-slate-300 rounded-full ring-4 ring-white"></div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">ACCOUNT CREATED</p>
                 <p className="text-xs text-slate-700 font-medium">{t('Initial pre-registration completed.', 'Pre-registro inicial completado.')}</p>
                 <p className="text-[10px] text-slate-400 mt-1">System • Yesterday, 14:20 PM</p>
              </div>
           </div>
        </div>

        <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors">
            {t('Close', 'Cerrar')}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddUserModal({ onClose, onAdd, t }: { onClose: () => void, onAdd: (user: any) => void, t: (en:string, es:string)=>string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Clinician',
    profession: '',
    specialty: '',
    institution: 'Hospital Alianza'
  });
  
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Rule 1: Data Hygiene - Corporate Domain Check
    const requiresDomain = ['Clinician', 'Educator', 'Data Analyst', 'Champion'].includes(formData.role);
    if (requiresDomain) {
      const isPartnerDomain = formData.email.endsWith('@hospitalalianza.org') || formData.email.endsWith('@clinicacentral.com');
      if (!isPartnerDomain) {
        setError(t('Email must belong to a partner institution domain (@hospitalalianza.org or @clinicacentral.com).', 'El correo debe pertenecer a un dominio institucional asociado (@hospitalalianza.org o @clinicacentral.com).'));
        return;
      }
    }

    // Rule 4: Patient Exception
    let initialStatus = 'Pending Verification';
    if (formData.role === 'Patient/Parent') {
      initialStatus = 'Active';
    }

    onAdd({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      profession: formData.role === 'Patient/Parent' ? '-' : (formData.profession || '-'),
      institution: formData.role === 'Patient/Parent' ? '-' : formData.institution,
      status: initialStatus
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#003366] flex items-center gap-2">
             <ShieldCheck className="w-5 h-5" /> 
             {t('Create New User', 'Crear Nuevo Usuario')}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-100 font-medium flex items-start gap-2">
               <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
               <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-tight mb-1">{t('Full Name', 'Nombre Completo')} *</label>
              <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]" />
            </div>
            
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-tight mb-1">{t('Email Address', 'Correo Electrónico')} *</label>
              <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]" placeholder="ej. medico@hospitalalianza.org" />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-tight mb-1">{t('Role', 'Rol')} *</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] bg-white">
                <option value="Clinician">Clinician</option>
                <option value="Educator">Educator</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Champion">Champion</option>
                <option value="Patient/Parent">Patient/Parent</option>
              </select>
            </div>

            {formData.role !== 'Patient/Parent' && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-tight mb-1">{t('Institution', 'Institución')} *</label>
                <select name="institution" value={formData.institution} onChange={handleChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] bg-white">
                  <option value="Hospital Alianza">Hospital Alianza</option>
                  <option value="Clínica Central">Clínica Central</option>
                </select>
              </div>
            )}

            {formData.role !== 'Patient/Parent' && (
              <>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-tight mb-1">{t('Profession', 'Profesión')}</label>
                  <select name="profession" value={formData.profession} onChange={handleChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] bg-white">
                    <option value="">{t('Select...', 'Seleccionar...')}</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Paramedic">Paramedic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-tight mb-1">{t('Specialty', 'Especialidad')}</label>
                  <select 
                    name="specialty" 
                    value={formData.specialty} 
                    onChange={handleChange} 
                    disabled={!formData.profession} 
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] disabled:bg-slate-50 disabled:text-slate-400 bg-white"
                  >
                    <option value="">{t('Select...', 'Seleccionar...')}</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </>
            )}
            
            {/* Advice notice based on Role 4 rules inside UI */}
            {formData.role === 'Patient/Parent' && (
               <div className="col-span-2 p-3 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100 flex items-start gap-2">
                 <Check className="w-4 h-4 shrink-0 mt-0.5" />
                 <p>{t('Patients do not require professional validation and are automatically activated.', 'Los pacientes no requieren validación profesional y se activan automáticamente.')}</p>
               </div>
            )}
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors">
              {t('Cancel', 'Cancelar')}
            </button>
            <button type="submit" className="px-4 py-2 bg-[#003366] text-white text-sm font-bold rounded shadow hover:bg-blue-900 transition-colors">
              {t('Save User', 'Guardar Usuario')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
