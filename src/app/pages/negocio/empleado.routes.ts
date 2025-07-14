import { Routes } from "@angular/router"; 
import { DashbordNegocioComponent } from "./dashbord-negocio/dashbord-negocio.component";
import { ReportesComponent } from "./reportes/reportes.component";




export const empleadoRoutes: Routes = [
    {
        path: 'empleado', component: DashbordNegocioComponent
    },
    {
        path: 'reporte', component: ReportesComponent
    }
 
]