import { Routes } from '@angular/router';
import { ListAsesoriasComponent } from './list-asesorias/list-asesorias.component';
import { AsesoriasListStoreComponent } from './asesorias-list-store/asesorias-list-store.component';
import { AsesoriaCampusComponent } from './asesoria-campus/asesoria-campus.component';

export const asesoriasRoutes: Routes = [
    {
        path: 'list-total', component: ListAsesoriasComponent
    },
    {
        path: 'list', component: AsesoriasListStoreComponent
    },
    {
        path: 'campus/reunirse', component: AsesoriaCampusComponent
    }
    
]