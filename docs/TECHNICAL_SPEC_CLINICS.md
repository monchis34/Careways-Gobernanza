# CAREWAYS CONNECT - MÓDULO CLÍNICOS (CLINICS)
## DOCUMENTO TÉCNICO DE ARQUITECTURA Y ESPECIFICACIONES

### 1. VISIÓN GENERAL
Este documento describe la arquitectura, diseño e implementación del módulo "Clínicos" (Clinics) dentro de la plataforma CareWays Connect. Este módulo reemplaza el concepto tradicional de "Gestión de Usuarios" y centraliza la gobernanza educativa, seguimiento de aprendizaje clínico, manejo de telesimulaciones y trazabilidad de certificaciones.

### 2. ARQUITECTURA DE ROLES Y PERMISOS (RBAC)
El sistema opera bajo una única interfaz (Single-Shell) donde la visibilidad y las acciones de mutación de estado dependen dinámicamente del contexto y rol del usuario.

*   **Super Admin:** Visibilidad "Cross-Tenant" (Toda la red hospitalaria, todos los países). Gobierna y audita configuraciones iniciales.
*   **Champion:** Visibilidad aislada por Institución ("Single-Tenant"). Coordina rutas de aprendizaje, revisa métricas agregadas (Yield Ranking, Engagement) sin poder editar contenido médico ni alterar rubricas.
*   **Educador:** Gestor de cohortes clínicas y telesimulaciones. Evalúa competencias (Knowledge, Skills, Teamwork) y aplica modelo de "Group Grading".
*   **Usuario Clínico (Clinical User):** Estudiante o profesional que transita el currículo, realiza simulaciones y evaluaciones para obtener certificación automática validada.

### 3. COMPONENTES PRINCIPALES DEL MÓDULO (UI/UX)

#### 3.1. Dashboards & KPIs
Despliegue dinámico de widgets basados en el nivel de acceso (Red Global vs Institución).
*   **Métricas Core:** Estudiantes Activos, En Progreso, Completados, Certificados, En Riesgo (At Risk).
*   **Engagement:** Sesiones futuras de Telesimulación, Promedio de calificación (Post-Test), Score de Engagement.
*   **Yield Ranking:** Formula algorítmica: `[Learning Score] * [Engagement Score] * [Consistency Score]`. Categorizado en High Performer, Moderate, At Risk, Critical.

#### 3.2. Learner Directory (Directorio de Estudiantes)
Tabla central de monitoreo.
*   **Columnas Indexadas:** Nombre, Institución, Profesión, Especialidad, Currículo Asignado, Progreso Completo (%), Calificación Post-Test, Status de Certificación, Yield Ranking, Última Actividad y Status de Telesimulación.

#### 3.3. Trazabilidad de Consumo
*   Métrica restrictiva basada en retención de Video. (Trackeable por YouTube API a 90% para validar finalización sin fast-forward fraudulento).
*   Workflow: Not Started -> Started -> In Progress -> Completed -> Certified.

#### 3.4. Telesimulación y Calificación Grupal (Group Grading)
*   **Bloqueos de Acceso:** El educador no puede invitar a un clínico a la telesimulación si el prerequisito (100% teoría y Test > 80%) no está cumplido.
*   **Group Grading Engine:** Una vez terminada la telesimulación, el educador califica al *Equipo* (comunicación, CRM, liderazgo, seguridad). El backend propaga y replica automáticamente dicho score a cada uno de los individuos del grupo, creando un log de auditoría inmutable.

#### 3.5. Exámenes e Intenciones
*   **Treshold Mínimo:** 80%.
*   **Circuit Breaker:** Bloqueo a los 3 intentos fallidos. Requiere revisión de video (Video Review Lock) antes de habilitar un nuevo re-intento, generando una alerta (Learning Alert) al Champion y Educador del caso.

#### 3.6. Motor de Certificaciones
*   Automatización completa: Al confluir 100% Teoría + Test > 80% + Telesimulación validada por el Educador = Disparo asíncrono de generación de Diploma PDF.
*   Blockchain/Hashing: Generación de código único de verificación y registro de auditoría (PDF Certificate ID).

### 4. ESTRUCTURA DE DATOS RECOMENDADA (ESTADOS DE REACT / DB SCHEMA ALIGNMENT)
```typescript
interface ClinicLearner {
  id: string;
  name: string;
  institutionId: string;
  profession: string;
  specialty: string;
  assignedCurriculum: string;
  progressPercentage: number;
  postTestScore: number | null;
  postTestAttempts: number;
  certificationStatus: 'Not Started' | 'In Progress' | 'Eligible' | 'Certified' | 'Expired';
  telesimStatus: 'Blocked' | 'Pending' | 'Completed';
  yieldRanking: 'High Performer' | 'Moderate Performer' | 'At Risk' | 'Critical Follow-Up';
  lastActivity: Date;
}
```

### 5. DIRECTRICES DE IMPLEMENTACIÓN FRONTEND
*   **Design System:** Integración con Tailwind CSS respetando "Clean Minimalism" dictado por la gobernanza de arquitectura.
*   **Componentización:** Separación en sub-bloques lógicos: `<ClinicsDashboard>`, `<LearnerDirectory>`, `<TelesimManager>` y `<EngagementMetrics>`.
*   **Seguridad Frontend:** Ocultamiento condicional de botones CRUD según rol (Ej: "Evaluar Grupo" condicional a Educadores, "Asignar Ruta" a Champions).
*   **Interacciones UX:** Alertas tipo Toast cuando el sistema detecta intentos fallidos de examen; badges colorizados para la identificación rápida del Yield Ranking.
