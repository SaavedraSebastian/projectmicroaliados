import { Routes } from "@angular/router"
import { MentoresComponent } from "./mentores/mentores.component"
import { AliadosComponent } from "./aliados/aliados.component"

export const networkingRoutes: Routes = [

    {
        path:'mentors/view',component: MentoresComponent
    },
    {
        path: 'networking/view', component: AliadosComponent
    }

]