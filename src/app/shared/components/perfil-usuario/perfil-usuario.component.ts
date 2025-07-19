import { Component } from '@angular/core';
import { SidebarNegocioComponent } from "../sidebar-negocio/sidebar-negocio.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [SidebarNegocioComponent, NavbarComponent],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {

}
