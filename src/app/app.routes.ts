import { Routes } from '@angular/router';
import { AuthInverseGuard } from './core/guards/auth-inverse.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {
    path: '',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes),
    canActivate: [AuthInverseGuard],
  },
  {
  path: 'dashboard',
  canActivate: [AuthInverseGuard],
  children: [
    {
      path: '',
      loadChildren: () => import('./pages/negocio/empleado.routes').then(m => m.empleadoRoutes),
    },
    {
      path: 'empleado',
      loadChildren: () => import('./pages/negocio/empleado.routes').then(m => m.empleadoRoutes),
    }
  ]
},

{
  path: 'asesorias',
  canActivate: [AuthInverseGuard],
  loadChildren: () => import('./pages/asesoria/asesorias.routes').then(m => m.asesoriasRoutes)  
},
{
  path: 'agendar',
  canActivate: [AuthInverseGuard],
  loadChildren: () => import('./pages/ventas_asesoria/venta-asesoria.routes').then(m => m.ventaAsesoriaRoutes)
},
{
  path: 'email',
  canActivate: [AuthInverseGuard],
  loadChildren: () => import('./pages/mensajeria/mensajeria.routes').then(m => m.emailMarketing)}
];
