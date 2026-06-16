import { createContext, useContext, useState, ReactNode } from 'react';

export type Role =
  | 'SUPER_ADMIN'
  | 'CHAMPION'
  | 'DATA_ANALYST'
  | 'EDUCATOR'
  | 'CLINICAL_USER'
  | 'PARENT_PATIENT'
  | 'GUEST';

interface User {
  name: string;
  role: Role;
  institutionId?: string;
  institutionName?: string;
}

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    name: 'Admin User',
    role: 'SUPER_ADMIN',
    institutionName: 'Global Network',
  });
  const [language, setLanguage] = useState('EN');

  return (
    <AuthContext.Provider value={{ user, setUser, language, setLanguage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
