import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { IncidenciaService } from '../../core/services/incidencia.service';
import { NotificacionService } from '../../core/services/notificacion.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit {
  
  private authService = inject(AuthService);
  private incidenciaService = inject(IncidenciaService);
  private notificacionService = inject(NotificacionService);

  incidencias: any[] = [];
  notificaciones: any[] = [];
  notificacionesNoLeidas = 0; 

  
  isLoading = true;
  vistaActual: 'ACTIVOS' | 'CERRADOS' = 'ACTIVOS';

  // Controladores de los menús desplegables
  showNotifications = false;
  showProfileMenu = false;
  userData: any = null;

  // Datos del usuario logueado
  currentUser: any = null;
  ticketSeleccionado: any = null;
  showProfileModal = false;

  cambiarVista(vista: 'ACTIVOS' | 'CERRADOS') {
    this.vistaActual = vista;
  }

  get incidenciasFiltradas() {
    if (this.vistaActual === 'ACTIVOS') {
      return this.incidencias.filter(i => i.estadoNombre !== 'RESUELTO' && i.estadoNombre !== 'CERRADO');
    } else {
      return this.incidencias.filter(i => i.estadoNombre === 'RESUELTO' || i.estadoNombre === 'CERRADO');
    }
  }
  
  ngOnInit() {
    // Obtenemos los datos desde el LocalStorage a través del servicio
    this.currentUser = this.authService.getCurrentUser();
    this.cargarDatos();
  }

  cargarDatos() {
    this.isLoading = true;
    
    // Cargar Incidencias
    this.incidenciaService.getAll().subscribe({
      next: (datos) => {
        this.incidencias = datos;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar tickets:", err);
        this.isLoading = false;
      }
    });

    // Cargar Notificaciones Reales
    this.notificacionService.getMisNotificaciones().subscribe({
      next: (notifs) => {
        this.notificaciones = notifs;
        this.notificacionesNoLeidas = notifs.filter(n => !n.leida).length;
      },
      error: (err) => console.error("Error al cargar notificaciones:", err)
    });
  }

  toggleNotificaciones() {
    this.showNotifications = !this.showNotifications;
    
    if (this.showNotifications) {
      // 1. Al abrir la campana, cerramos el menú del perfil si estuviera abierto
      this.showProfileMenu = false;
      
      // 2. Identificamos cuáles están en estado 0 (false)
      const noLeidas = this.notificaciones.filter(n => !n.leida);
      
      if (noLeidas.length > 0) {
        // 3. Se actualiza el contador de notificaciones no leídas a 0
        this.notificacionesNoLeidas = 0;
        
        // 4. Mandamos la orden al backend para que pasen a estado 1 (true)
        noLeidas.forEach(notif => {
          this.notificacionService.marcarComoLeida(notif.id).subscribe({
            next: () => {
              // 5. Se actualiza localmente el estado de la notificación a leída
              notif.leida = true;
            }
          });
        });
      }
    } else {
      // Si se cierra la campana, filtramos las notificaciones para mostrar solo las no leídas
      this.notificaciones = this.notificaciones.filter(n => !n.leida);
    }
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
    if (this.showProfileMenu) this.showNotifications = false;
  }

  logout() {
    this.authService.logout();
  }

  abrirDetalleTicket(ticket: any) {
    this.ticketSeleccionado = ticket;
  }

  cerrarModales() {
    this.ticketSeleccionado = null;
    this.showProfileModal = false;
  }

  abrirPerfilModal() {
    this.showProfileModal = true;
    this.showProfileMenu = false;
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'PENDIENTE': return 'status-pending';
      case 'EN_PROCESO': return 'status-process';
      case 'RESUELTO': return 'status-resolved';
      default: return 'status-default';
    }
  }

}
