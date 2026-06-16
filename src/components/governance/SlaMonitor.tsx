import React from 'react';
import { Card } from '../ui/Card';
import { Clock, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export function SlaMonitor({ t }: { t: (en: string, es: string) => string }) {
  const SLAs = [
    { 
      title: 'USER APPROVALS', avg: '4h 15m', target: '24h 00m', progress: 18, 
      status: 'success', statusText: 'WELL WITHIN SLA LIMITS' 
    },
    { 
      title: 'COURSE EVALUATIONS', avg: '3d 12h', target: '24h 00m', progress: 130, 
      status: 'error', statusText: 'ATTENTIONS SLA LIMIT' 
    },
    { 
      title: 'CRITICAL SUPPORT TICKETS', avg: '2h 45m', target: '2h 00m', progress: 138, 
      status: 'error', statusText: 'SLA BREACH DETECTED' 
    },
    { 
      title: 'INSTITUTION ONBOARDING', avg: '12d', target: '15d', progress: 80, 
      status: 'warning', statusText: 'MONITOR CLOSELY' 
    },
    { 
      title: 'DATASET REVIEW APPROVAL', avg: '45m', target: '4h', progress: 18, 
      status: 'success', statusText: 'OPTIMAL TURNAROUND' 
    }
  ];

  return (
    <div className="space-y-6">
      <div>
         <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            {t('SLA Monitoring Center', 'Centro de Monitoreo de SLA')}
         </h3>
         <p className="text-xs text-slate-500 mt-1">{t('Track average resolution times against defined Service Level Agreements.', 'Rastrea los tiempos de resolución promedio contra los Acuerdos de Nivel de Servicio definidos.')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SLAs.map((sla, idx) => {
           let barColor = 'bg-emerald-400';
           let icon = <CheckCircle2 className="w-3.5 h-3.5" />;
           let textColor = 'text-emerald-700';
           let bgColor = 'bg-emerald-50';

           if (sla.status === 'warning') {
              barColor = 'bg-amber-400';
              icon = <AlertTriangle className="w-3.5 h-3.5" />;
              textColor = 'text-amber-700';
              bgColor = 'bg-amber-50';
           } else if (sla.status === 'error') {
              barColor = 'bg-red-500';
              icon = <ShieldAlert className="w-3.5 h-3.5" />;
              textColor = 'text-red-700';
              bgColor = 'bg-red-50';
           }

           const progressClamped = Math.min(sla.progress, 100);

           return (
              <Card key={idx} className="p-5 flex flex-col justify-between">
                 <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-tight mb-4">{sla.title}</h4>
                 
                 <div className="flex justify-between items-end mb-6">
                    <div>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mb-1">{t('AVG RESOLUTION', 'RESOLUCIÓN PROM')}</p>
                       <div className={`text-2xl font-black ${sla.status === 'error' ? 'text-red-600' : 'text-[#003366]'}`}>
                          {sla.avg}
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mb-1">{t('SLA TARGET', 'META SLA')}</p>
                       <div className="text-lg font-bold text-slate-500">{sla.target}</div>
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-tight mb-1.5">
                       <span>{t('PROGRESS TO LIMIT', 'PROGRESO AL LÍMITE')}</span>
                       <span>{sla.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                       <div className={`h-full ${barColor} rounded-full`} style={{ width: `${progressClamped}%` }}></div>
                    </div>
                 </div>

                 <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${bgColor} ${textColor} text-[10px] font-bold rounded uppercase tracking-tight w-max`}>
                    {icon} {sla.statusText}
                 </div>
              </Card>
           );
        })}
      </div>
    </div>
  );
}
