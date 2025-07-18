import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asesoria } from '../../models/asesoria.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar-detalle-asesoria',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-detalle-asesoria.component.html',
  styleUrls: ['./sidebar-detalle-asesoria.component.css']
})
export class SideBarDetalleAsesoriaComponent {
  @Input() asesoria: Asesoria | null = null;
  isOpen = signal(false);

  open(asesoria: Asesoria) {
    this.asesoria = asesoria;
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
  guardarAsesoria(asesoria: Asesoria) {
  localStorage.setItem('asesoria', JSON.stringify(asesoria));
}


  getColorCategoria(categoria: string): string {
    switch (categoria) {
      case 'Marketing': return 'bg-purple-100 text-purple-600';
      case 'Finanzas': return 'bg-green-100 text-green-600';
      case 'Legal': return 'bg-red-100 text-red-600';
      case 'Tecnología': return 'bg-blue-100 text-blue-600';
      case 'Operaciones': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  getGradientColor(categoria: string): string {
    switch (categoria) {
      case 'Marketing': return 'from-purple-600 to-pink-600';
      case 'Finanzas': return 'from-green-600 to-teal-600';
      case 'Legal': return 'from-red-600 to-orange-600';
      case 'Tecnología': return 'from-blue-600 to-cyan-600';
      case 'Operaciones': return 'from-orange-600 to-amber-600';
      default: return 'from-gray-600 to-gray-700';
    }
  }
}