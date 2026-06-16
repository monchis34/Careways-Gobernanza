import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth, Role } from '../context/AuthContext';

export function Layout() {
  const { user, setUser } = useAuth();
  
  const getAvailableRoles = (): Role[] => {
    // For demo purposes, we infer 'base role' from name or just allow based on current role max permission
    const current = user.role;
    if (user.name === 'Admin User' || current === 'SUPER_ADMIN') {
      return ['SUPER_ADMIN', 'CHAMPION', 'DATA_ANALYST', 'EDUCATOR', 'CLINICAL_USER', 'PARENT_PATIENT', 'GUEST'];
    }
    if (current === 'CHAMPION') {
      return ['CHAMPION', 'EDUCATOR', 'CLINICAL_USER', 'PARENT_PATIENT', 'GUEST'];
    }
    if (current === 'EDUCATOR') {
      return ['EDUCATOR', 'CLINICAL_USER'];
    }
    return [current];
  };

  const availableRoles = getAvailableRoles();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      <div className="bg-[#002244] text-slate-300 text-xs py-1.5 px-6 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <span>Estás viendo como</span>
          <select 
            className="bg-[#003366] text-white font-bold px-2 py-0.5 rounded border border-[#004488] outline-none" 
            value={user.role} 
            onChange={e => setUser({ ...user, role: e.target.value as Role })}
          >
            {availableRoles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <span>. Todas las acciones se ejecutan con permisos de este rol.</span>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-8 relative">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
