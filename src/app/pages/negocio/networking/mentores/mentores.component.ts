import { Component } from '@angular/core';
import { SidebarNegocioComponent } from "../../../../shared/components/sidebar-negocio/sidebar-negocio.component";
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-mentores',
  standalone: true,
  imports: [SidebarNegocioComponent, NavbarComponent],
  templateUrl: './mentores.component.html',
  styleUrl: './mentores.component.css'
})
export class MentoresComponent {

}
