export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  correo: string;
  password: string;
  departamentoId?: number | null;
}

export interface LoginResponse {
  token: string;
  nombre: string;
  roles: string[];
  primaryRole: string;
  rol: string;
  aprobado: boolean;
}

export interface RegisterResponse {
  id: number;
  nombre: string;
  correo: string;
  aprobado: boolean;
}

export interface DashboardStats {
  total?: number;
  [key: string]: number | undefined;
}

export interface IncidenciaItem {
  id: number;
  titulo: string;
  descripcion: string;
  creadoEn: string;
  estadoNombre?: string;
  prioridadNombre?: string;
  categoriaNombre?: string;
  creadorNombre?: string;
  asignadoNombre?: string;
}

export interface AuthSession {
  token: string;
  nombre: string;
  roles: string[];
  primaryRole: string;
}

export interface PendingRegistration {
  id: number;
  nombre: string;
  correo: string;
  departamentoNombre?: string | null;
  roles: string[];
}

export type AppRole = 'ADMIN' | 'SOPORTE' | 'EMPLEADO';
