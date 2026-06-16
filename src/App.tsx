/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Overview } from './pages/Overview';
import { Governance } from './pages/Governance';
import { Patients } from './pages/Patients';
import { Courses } from './pages/Courses';
import { Certifications } from './pages/Certifications';

import { Clinics } from './pages/Clinics';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="governance" element={<Governance />} />
            <Route path="clinics" element={<Clinics />} />
            <Route path="courses" element={<Courses />} />
            <Route path="patients" element={<Patients />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="analytics" element={<div className="p-4 bg-white rounded shadow-sm border border-slate-200">Analytics Center (In Development)</div>} />
            <Route path="institutions" element={<div className="p-4 bg-white rounded shadow-sm border border-slate-200">Institutions Module (In Development)</div>} />
            <Route path="audit" element={<div className="p-4 bg-white rounded shadow-sm border border-slate-200">Audit Center (In Development)</div>} />
            <Route path="settings" element={<div className="p-4 bg-white rounded shadow-sm border border-slate-200">Settings Module (In Development)</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
