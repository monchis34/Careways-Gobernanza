import { useAuth, Role } from '../context/AuthContext';
import { LogOut, Globe, User, Shield } from 'lucide-react';

export function Header() {
  const { user, language, setLanguage } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10 w-full">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
          {language === 'ES' ? 'Centro de Gobernanza y Operaciones' : 'Governance & Operations Center'}
        </h1>
        {user.role !== 'SUPER_ADMIN' && user.institutionName ? (
          <span className="hidden md:inline-flex items-center px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase rounded border border-indigo-100">
            {user.institutionName}
          </span>
        ) : (
          <span className="hidden md:inline-flex items-center px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase rounded border border-indigo-100">
            Super Admin
          </span>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 sm:gap-6">
        
        {/* Language Switcher */}
        <div className="flex items-center gap-1">
          <Globe className="w-4 h-4 text-slate-500" />
          <button
            onClick={() => setLanguage('EN')}
            className={`text-xs font-medium px-2 py-1 rounded transition-colors ${language === 'EN' ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('ES')}
            className={`text-xs font-medium px-2 py-1 rounded transition-colors ${language === 'ES' ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
          >
            ES
          </button>
        </div>

        <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-slate-900">{user.name}</span>
            <span className="text-xs text-slate-500 capitalize">{user.role.replace('_', ' ').toLowerCase()}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#003366] flex items-center justify-center text-white font-bold">
            {user.name.split(' ').map(n => n[0]).join('').substring(0,2)}
          </div>
        </div>
      </div>
    </header>
  );
}
