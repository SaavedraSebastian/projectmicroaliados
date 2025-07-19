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
    { path: '/dashboard/empleado', icon: 'home', title: 'Inicio' },
    { path: '/dashboard/perfil', icon: 'user', title: 'Perfil' },
    { path: '/asesorias/list', icon: 'boxes', title: 'Catálogo de Asesorías' },
    { path: '/asesorias/campus/reunirse', icon: 'graduation-cap', title: 'Reunirse', badge: 3, badgeColor: 'red' },
    { path: '/asesorias/list-total', icon: 'chalkboard-teacher', title: 'Mi Aula Virtual' },
    { path: '/email/comunication', icon: 'envelope', title: 'Email Marketing' },
    { path: '/validacion', icon: 'check-circle', title: 'Descubre' },
    { path: '/dashboard/reporte', icon: 'chart-pie', title: 'Reportes' },
    { path: '/email/campaigns', icon: 'bullhorn', title: 'Campañas', badge: 1, badgeColor: 'yellow' },
    { path: '/configuracion', icon: 'cog', title: 'Configuración' }
    
  ];

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