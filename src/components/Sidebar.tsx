import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  UserSquare2,
  BarChart3,
  Building2,
  ShieldCheck,
  Settings,
  Activity,
  Award
} from 'lucide-react';

const getNavItems = (role: string, lang: string) => {
  const isES = lang === 'ES';
  const allItems = [
    { path: '/', label: isES ? 'Resumen' : 'Overview', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'CHAMPION', 'DATA_ANALYST', 'EDUCATOR'] },
    { path: '/governance', label: isES ? 'Centro de Gobernanza' : 'Governance Center', icon: ShieldCheck, roles: ['SUPER_ADMIN'] },
    { path: '/clinics', label: isES ? 'Clínicos' : 'Clinics', icon: Users, roles: ['SUPER_ADMIN', 'CHAMPION', 'DATA_ANALYST', 'EDUCATOR'] },
    { path: '/courses', label: isES ? 'Cursos' : 'Courses', icon: BookOpen, roles: ['SUPER_ADMIN', 'CHAMPION', 'EDUCATOR', 'CLINICAL_USER'] },
    { path: '/patients', label: isES ? 'Pacientes' : 'Patients', icon: Activity, roles: ['SUPER_ADMIN', 'CHAMPION', 'DATA_ANALYST', 'CLINICAL_USER'] },
    { path: '/certifications', label: isES ? 'Certificados' : 'Certifications', icon: Award, roles: ['SUPER_ADMIN', 'CHAMPION', 'EDUCATOR', 'CLINICAL_USER'] },
    { path: '/analytics', label: isES ? 'Analítica' : 'Analytics', icon: BarChart3, roles: ['SUPER_ADMIN', 'CHAMPION', 'DATA_ANALYST', 'EDUCATOR'] },
    { path: '/settings', label: isES ? 'Ajustes' : 'Settings', icon: Settings, roles: ['SUPER_ADMIN', 'CHAMPION', 'DATA_ANALYST', 'EDUCATOR', 'CLINICAL_USER'] },
  ];

  return allItems.filter(item => item.roles.includes(role));
};

export function Sidebar() {
  const { user, language } = useAuth();
  const navItems = getNavItems(user.role, language);

  return (
    <aside className="w-60 bg-[#003366] text-white flex flex-col h-full shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-blue-800/50">
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shrink-0">
           <div className="w-5 h-5 border-2 border-[#003366] rounded-full"></div>
        </div>
        <span className="font-bold tracking-tight text-lg uppercase">CAREWAYS</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-6 py-3 transition-all text-sm font-medium',
                    isActive
                      ? 'bg-white/10 border-l-4 border-white text-white'
                      : 'hover:bg-white/5 text-blue-100 border-l-4 border-transparent'
                  )
                }
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
