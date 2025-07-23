import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-negocio',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar-negocio.component.html',
  styleUrls: ['./sidebar-negocio.component.css']
})
export class SidebarNegocioComponent {
  sidebarOpen = false;

  constructor(private router: Router) {}

 menuItems = [
  { path: '/dashboard/empleado', icon: 'th', title: 'Dashboard' },
  { path: '/dashboard/perfil', icon: 'user', title: 'Mi Perfil' },
  { path: '/asesorias/list', icon: 'lightbulb', title: 'Asesorías' },
  { path: '/asesorias/campus/reunirse', icon: 'graduation-cap', title: 'Sesiones en Vivo', badge: 3, badgeColor: 'red' },
  { path: '/asesorias/list-total', icon: 'chalkboard-teacher', title: 'Mi Aula Virtual' },
  { divider: true },
  { path: '/mentors/view', icon: 'user-tie', title: 'Mentores' },
  { path: '/networking/view', icon: 'users', title: 'Red de Aliados' },
  { path: '/email/comunication', icon: 'envelope', title: 'Email Marketing' },
  { path: '/email/campaigns', icon: 'bullhorn', title: 'Campañas', badge: 1, badgeColor: 'yellow' },
  { divider: true },
  { path: '/calendario', icon: 'calendar', title: 'Calendario' },
  { path: '/dashboard/reporte', icon: 'chart-line', title: 'Progreso y Resultados' },
  { path: '/herramientas', icon: 'toolbox', title: 'Herramientas Útiles' },
  { path: '/plantillas', icon: 'file-alt', title: 'Plantillas y Guías' },
  { divider: true },
  { path: '/configuracion', icon: 'cog', title: 'Configuración' },
  { path: '/soporte', icon: 'life-ring', title: 'Soporte' }
]


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}