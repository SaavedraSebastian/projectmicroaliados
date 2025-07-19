import { Routes } from "@angular/router"; 
import { DashbordNegocioComponent } from "./dashbord-negocio/dashbord-negocio.component";
import { ReportesComponent } from "./reportes/reportes.component";
import { PerfilUsuarioComponent } from "../../shared/components/perfil-usuario/perfil-usuario.component";







export const empleadoRoutes: Routes = [
    {
        path: 'empleado', component: DashbordNegocioComponent
    },
    {
        path: 'reporte', component: ReportesComponent
    },
    {
        path: 'perfil', component: PerfilUsuarioComponent
    }
  
  
 
]