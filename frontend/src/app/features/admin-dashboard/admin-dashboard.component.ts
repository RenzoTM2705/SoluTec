import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../core/services/auth.service';
import { IncidenciaService } from '../../core/services/incidencia.service';
import { UsuarioService } from '../../core/services/usuario.service'; 
import { ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts'; 
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, BaseChartDirective],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  
  private authService = inject(AuthService);
  private incidenciaService = inject(IncidenciaService);
  private usuarioService = inject(UsuarioService);

  public donutChartLabels: string[] = [];
  
  // CORRECCIÓN VISUAL: Añadimos colores por defecto para que el gráfico se vea profesional
  public donutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { 
      data: [], 
      backgroundColor: ['#f59e0b', '#0ea5e9', '#10b981'], // Naranja, Azul, Verde
      hoverBackgroundColor: ['#d97706', '#0284c7', '#059669']
    }
  ];
  public donutChartOptions: ChartConfiguration<'doughnut'>['options'] = { responsive: true, maintainAspectRatio: false };

  public barChartLabels: string[] = [];
  public barChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [
    { data: [], label: 'Incidencias', backgroundColor: '#3b82f6', borderRadius: 4 }
  ];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = { 
    responsive: true, 
    maintainAspectRatio: false 
  };

  userData: any = null;
  showProfileMenu = false;
  showProfileModal = false;
  vistaActual: 'TICKETS' | 'USUARIOS' = 'TICKETS';
  subVistaUsuarios: 'PENDIENTES' | 'ACTIVOS' = 'PENDIENTES';
  usuarioAEliminar: any = null;
  
  // Datos
  todasIncidencias: any[] = [];
  usuariosPendientes: any[] = [];
  isLoading = true;
  usuariosActivos: any[] = [];

  // Estadísticas
  stats: any = { totalIncidencias: 0, pendientes: 0, enProceso: 0, resueltas: 0 };

  // Gestión de Ticket (Modal)
  ticketSeleccionado: any = null;
  nuevoEstadoTicket: string = '';
  solucionTicket: string = '';
  filtroActual: string = 'TODOS';
  usuarioAEditar: any = null;
  nuevoRolUsuario: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userData = this.authService.getCurrentUser();
    this.cargarDatosGlobales();
    this.cargarEstadisticas();
  }

  cargarDatosGlobales() {
    this.isLoading = true;
    this.incidenciaService.getAll().subscribe({
      next: (datos) => {
        this.todasIncidencias = datos;
        this.isLoading = false;
      },
      error: (err) => { console.error("Error incidencias", err); this.isLoading = false; }
    });

    if (this.userData?.rol === 'ADMIN') {
      this.cargarUsuariosPendientes();
    }
  }

  cargarUsuariosPendientes() {
    this.usuarioService.getTodosLosUsuarios().subscribe({
      next: (todos) => {
        const usuariosValidos = todos.filter(u => !u.nombre.includes('(Inactivo)'));
        this.usuariosPendientes = usuariosValidos.filter(u => !u.aprobado || u.rol?.nombre === 'PENDIENTE');
        this.usuariosActivos = usuariosValidos.filter(u => u.aprobado && u.rol?.nombre !== 'PENDIENTE');
      },
      error: (err) => console.error("Error usuarios", err)
    });
  }


  cambiarVista(vista: 'TICKETS' | 'USUARIOS') {
    this.vistaActual = vista;
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    this.authService.logout();
  }

  abrirModalGestion(ticket: any) {
    this.ticketSeleccionado = ticket;
    this.nuevoEstadoTicket = ticket.estadoNombre;
    this.solucionTicket = ticket.solucion || '';
  }

  abrirPerfilModal() {
    this.showProfileModal = true;
    this.showProfileMenu = false;
  }

  cerrarModal() {
    this.ticketSeleccionado = null;
    this.showProfileModal = false;
  }

  guardarCambiosTicket() {
    if (!this.ticketSeleccionado) return;
    
    this.incidenciaService.actualizarEstado(this.ticketSeleccionado.id, this.nuevoEstadoTicket, this.solucionTicket).subscribe({
      next: () => {
        this.ticketSeleccionado.estadoNombre = this.nuevoEstadoTicket;
        this.ticketSeleccionado.solucion = this.solucionTicket;
        this.cargarEstadisticas(); // Refrescamos el dashboard
        this.cerrarModal();
      },
      error: (err) => alert("Error al actualizar el ticket: " + err.message)
    });
  }

  cambiarSubVista(vista: 'PENDIENTES' | 'ACTIVOS') {
    this.subVistaUsuarios = vista;
  }

  aprobarUsuario(usuarioId: number, rolAsignado: string) {
    this.usuarioService.aprobarUsuario(usuarioId, rolAsignado).subscribe({
      next: () => {
        this.cargarUsuariosPendientes();
      },
      error: (err) => alert("Error al aprobar: " + err.message)
    });
  }

  eliminarUsuario(usuarioId: number, nombre: string) {
    this.usuarioAEliminar = { id: usuarioId, nombre: nombre };
  }

  cancelarEliminacion() {
    this.usuarioAEliminar = null;
  }

  confirmarEliminacion() {
    if (!this.usuarioAEliminar) return;
    
    this.usuarioService.eliminarUsuario(this.usuarioAEliminar.id).subscribe({
      next: () => {
        this.cargarUsuariosPendientes();
        this.usuarioAEliminar = null;
      },
      error: (err) => {
        console.error("Error al eliminar", err);
        this.usuarioAEliminar = null;
      }
    });
  }

  obtenerNombreUsuario(incidencia: any): string {
    if (incidencia.usuario && incidencia.usuario.nombre) return incidencia.usuario.nombre;
    if (incidencia.creador && incidencia.creador.nombre) return incidencia.creador.nombre;
    if (incidencia.usuarioNombre) return incidencia.usuarioNombre;
    if (incidencia.creadorNombre) return incidencia.creadorNombre;
    
    return 'Usuario (ID: ' + (incidencia.usuarioId || incidencia.creadorId || 'N/A') + ')';
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'PENDIENTE': return 'status-pending';
      case 'EN_PROCESO': return 'status-process';
      case 'RESUELTO': return 'status-resolved';
      default: return 'status-default';
    }
  }

  get incidenciasFiltradas() {
    if (this.filtroActual === 'TODOS') return this.todasIncidencias;
    return this.todasIncidencias.filter(i => i.estadoNombre === this.filtroActual);
  }

  aplicarFiltro(estado: string) {
    this.filtroActual = estado;
  }

cargarEstadisticas() {
    this.http.get('http://localhost:8080/api/dashboard/admin-stats').subscribe((data: any) => {
      this.stats = data; 

      // Gráfico de Dona (Estados)
      if (data.incidenciasPorEstado) {
        const estadosPermitidos = ['PENDIENTE', 'EN_PROCESO', 'RESUELTO'];
        const labelsDona = Object.keys(data.incidenciasPorEstado).filter(label => estadosPermitidos.includes(label));
        const valuesDona = labelsDona.map(label => data.incidenciasPorEstado[label]);

        const bgColors = labelsDona.map(label => {
          if (label === 'PENDIENTE') return '#f59e0b';
          if (label === 'EN_PROCESO') return '#0ea5e9';
          if (label === 'RESUELTO') return '#10b981';
          return '#94a3b8'; 
        });

        this.donutChartLabels = labelsDona;
        this.donutChartDatasets = [{ 
          data: valuesDona, label: 'Incidencias', backgroundColor: bgColors, hoverBackgroundColor: bgColors, borderWidth: 0 
        }];
      }

      // NUEVO: Gráfico de Barras (Departamentos)
      if (data.incidenciasPorDepartamento) {
        this.barChartLabels = Object.keys(data.incidenciasPorDepartamento);
        this.barChartDatasets = [{
          data: Object.values(data.incidenciasPorDepartamento) as number[],
          label: 'Total Reportado',
          backgroundColor: '#3b82f6', // Azul corporativo
          borderRadius: 4
        }];
      }
    });
  }

  abrirModalEditarUsuario(usuario: any) {
    this.usuarioAEditar = usuario;
    // Extraemos el rol actual (limpiándolo por si trae el prefijo ROLE_)
    const rolActual = usuario.rol?.nombre || usuario.rol || '';
    this.nuevoRolUsuario = rolActual.replace('ROLE_', '').toUpperCase();
  }
  
  cerrarModalEditarUsuario() {
    this.usuarioAEditar = null;
  }

  guardarCambiosRol() {
    if (!this.usuarioAEditar) return;
    
    // Reutilizamos el método aprobarUsuario, ya que en el backend probablemente
    // sobrescribe el rol del usuario con el nuevo valor enviado.
    this.usuarioService.aprobarUsuario(this.usuarioAEditar.id, this.nuevoRolUsuario).subscribe({
      next: () => {
        this.cargarUsuariosPendientes(); // Recarga la tabla de activos/pendientes
        this.cerrarModalEditarUsuario();
      },
      error: (err) => alert("Error al actualizar el rol: " + err.message)
    });
  }
}