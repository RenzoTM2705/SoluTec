import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // IMPORTANTE para el select/textarea del modal
import { AuthService } from '../../core/services/auth.service';
import { IncidenciaService } from '../../core/services/incidencia.service';
import { UsuarioService } from '../../core/services/usuario.service'; // Nuevo servicio

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  
  private authService = inject(AuthService);
  private incidenciaService = inject(IncidenciaService);
  private usuarioService = inject(UsuarioService);

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
  stats = { total: 0, pendientes: 0, enProceso: 0, resueltas: 0 };

  // Gestión de Ticket (Modal)
  ticketSeleccionado: any = null;
  nuevoEstadoTicket: string = '';
  solucionTicket: string = '';
  filtroActual: string = 'TODOS';

  ngOnInit() {
    this.userData = this.authService.getCurrentUser();
    this.cargarDatosGlobales();
  }

  cargarDatosGlobales() {
    this.isLoading = true;
    this.incidenciaService.getAll().subscribe({
      next: (datos) => {
        this.todasIncidencias = datos;
        this.calcularEstadisticas();
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
        // 1. Filtramos y excluimos a los usuarios inactivos
        const usuariosValidos = todos.filter(u => !u.nombre.includes('(Inactivo)'));
        
        // 2. Distribuimos a los usuarios válidos en las tablas correspondientes
        this.usuariosPendientes = usuariosValidos.filter(u => !u.aprobado || u.rol?.nombre === 'PENDIENTE');
        this.usuariosActivos = usuariosValidos.filter(u => u.aprobado && u.rol?.nombre !== 'PENDIENTE');
      },
      error: (err) => console.error("Error usuarios", err)
    });
  }

  calcularEstadisticas() {
    this.stats.total = this.todasIncidencias.length;
    this.stats.pendientes = this.todasIncidencias.filter(i => i.estadoNombre === 'PENDIENTE').length;
    this.stats.enProceso = this.todasIncidencias.filter(i => i.estadoNombre === 'EN_PROCESO').length;
    this.stats.resueltas = this.todasIncidencias.filter(i => i.estadoNombre === 'RESUELTO').length;
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
        // Actualizamos la tabla localmente para no recargar todo
        this.ticketSeleccionado.estadoNombre = this.nuevoEstadoTicket;
        this.ticketSeleccionado.solucion = this.solucionTicket;
        this.calcularEstadisticas();
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

  // Helper
  obtenerNombreUsuario(incidencia: any): string {
    // Intentamos atrapar todas las combinaciones posibles
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
  
}