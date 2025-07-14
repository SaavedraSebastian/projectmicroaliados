import { Component, signal,ViewChild } from '@angular/core';
import { SidebarNegocioComponent } from "../../../shared/components/sidebar-negocio/sidebar-negocio.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asesoria } from '../../../shared/models/asesoria.model';
import { SideBarDetalleAsesoriaComponent } from '../../../shared/components/sidebar-detalle-asesoria/sidebar-detalle-asesoria.component';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";


@Component({
  selector: 'app-list-asesorias',
  standalone: true,
  imports: [SidebarNegocioComponent, CommonModule, FormsModule, SideBarDetalleAsesoriaComponent, NavbarComponent],
  templateUrl: './asesorias-list-store.component.html',
  styleUrl: './asesorias-list-store.component.css'
})
   
export class AsesoriasListStoreComponent {
  @ViewChild(SideBarDetalleAsesoriaComponent) sidebarDetalle!: SideBarDetalleAsesoriaComponent;
  searchQuery = signal('');
  categoriaSeleccionada = signal('Todas');
  ordenSeleccionado = signal('Recomendados');

  asesorias = signal<Asesoria[]>([
    {
      id: 1,
      nombre: 'Laura Mendoza',
      especialidad: 'Especialista en modelos de negocio',
      foto: 'https://randomuser.me/api/portraits/women/65.jpg',
      descripcion: 'Te ayudo a validar tu idea de negocio y diseñar un modelo escalable con metodologías probadas.',
      valoracion: 4.9,
      valoraciones: 128,
      modalidades: ['Virtual', 'Documentación'],
      precioHora: 120,
      paqueteDesde: 300,
      ubicacion: 'Remoto',
      categoria: 'Planificación'
    },
    {
      id: 2,
      nombre: 'Carlos Rojas',
      especialidad: 'Abogado corporativo',
      foto: 'https://randomuser.me/api/portraits/men/45.jpg',
      descripcion: 'Te guío en la formalización de tu negocio, trámites legales y cumplimiento tributario en Perú.',
      valoracion: 4.8,
      valoraciones: 96,
      modalidades: ['Virtual', 'Presencial'],
      precioHora: 150,
      paqueteDesde: 400,
      ubicacion: 'Lima, Perú',
      categoria: 'Legal/Tributario'
    },
    {
      id: 3,
      nombre: 'Ana Torres',
      especialidad: 'Estratega digital',
      foto: 'https://randomuser.me/api/portraits/women/32.jpg',
      descripcion: 'Desarrollo estrategias de marketing digital personalizadas para hacer crecer tu negocio online.',
      valoracion: 4.9,
      valoraciones: 142,
      modalidades: ['Virtual', 'Plan estratégico'],
      precioHora: 110,
      paqueteDesde: 350,
      ubicacion: 'Remoto',
      categoria: 'Marketing'
    },
    {
      id: 4,
      nombre: 'Roberto Sánchez',
      especialidad: 'Consultor financiero',
      foto: 'https://randomuser.me/api/portraits/men/68.jpg',
      descripcion: 'Te ayudo a organizar las finanzas de tu negocio, optimizar costos y mejorar tu rentabilidad.',
      valoracion: 4.7,
      valoraciones: 87,
      modalidades: ['Virtual', 'Plantillas'],
      precioHora: 130,
      paqueteDesde: 380,
      ubicacion: 'Remoto',
      categoria: 'Finanzas'
    },
    {
      id: 5,
      nombre: 'María Fernández',
      especialidad: 'Especialista en marca personal',
      foto: 'https://randomuser.me/api/portraits/women/55.jpg',
      descripcion: 'Te ayudo a construir una marca poderosa que destaque en tu industria y conecte con tu audiencia.',
      valoracion: 4.9,
      valoraciones: 115,
      modalidades: ['Virtual', 'Diseño de identidad'],
      precioHora: 140,
      paqueteDesde: 450,
      ubicacion: 'Remoto',
      categoria: 'Branding'
    },
    {
      id: 6,
      nombre: 'Diego Castro',
      especialidad: 'Estratega en redes sociales',
      foto: 'https://randomuser.me/api/portraits/men/33.jpg',
      descripcion: 'Optimizo tu presencia en redes sociales con estrategias que generan engagement y conversiones.',
      valoracion: 4.8,
      valoraciones: 103,
      modalidades: ['Virtual', 'Auditoría'],
      precioHora: 100,
      paqueteDesde: 320,
      ubicacion: 'Remoto',
      categoria: 'Redes Sociales'
    },
     {
    id: 7,
    nombre: 'Claudia Rivas',
    especialidad: 'Coach en planificación estratégica',
    foto: 'https://randomuser.me/api/portraits/women/52.jpg',
    descripcion: 'Te ayudo a construir un plan de negocio sólido con objetivos claros y medibles.',
    valoracion: 4.9,
    valoraciones: 87,
    modalidades: ['Virtual', 'Sesiones 1:1'],
    precioHora: 120,
    paqueteDesde: 350,
    ubicacion: 'Remoto',
    categoria: 'Planificación'
  },
  {
    id: 8,
    nombre: 'Luis Fernández',
    especialidad: 'Consultor legal y tributario',
    foto: 'https://randomuser.me/api/portraits/men/45.jpg',
    descripcion: 'Formaliza tu emprendimiento cumpliendo con todos los requisitos legales y tributarios.',
    valoracion: 4.7,
    valoraciones: 72,
    modalidades: ['Virtual', 'Auditoría'],
    precioHora: 150,
    paqueteDesde: 400,
    ubicacion: 'Remoto',
    categoria: 'Legal/Tributario'
  },
  {
    id: 9,
    nombre: 'Patricia Mendoza',
    especialidad: 'Experta en finanzas personales y empresariales',
    foto: 'https://randomuser.me/api/portraits/women/30.jpg',
    descripcion: 'Gestiona tus finanzas, controla gastos y planifica la sostenibilidad de tu negocio.',
    valoracion: 4.8,
    valoraciones: 95,
    modalidades: ['Virtual'],
    precioHora: 110,
    paqueteDesde: 300,
    ubicacion: 'Remoto',
    categoria: 'Finanzas'
  },
  {
    id: 10,
    nombre: 'Jorge Méndez',
    especialidad: 'Especialista en automatización y no-code',
    foto: 'https://randomuser.me/api/portraits/men/27.jpg',
    descripcion: 'Automatiza tareas repetitivas y optimiza flujos con herramientas no-code como Zapier y Airtable.',
    valoracion: 4.6,
    valoraciones: 61,
    modalidades: ['Virtual', 'Taller grupal'],
    precioHora: 90,
    paqueteDesde: 280,
    ubicacion: 'Remoto',
    categoria: 'Automatización'
  },
  {
    id: 11,
    nombre: 'Karina Soto',
    especialidad: 'Mentora de ventas digitales',
    foto: 'https://randomuser.me/api/portraits/women/66.jpg',
    descripcion: 'Potencia tus ventas con estrategias modernas y herramientas de cierre en línea.',
    valoracion: 4.9,
    valoraciones: 118,
    modalidades: ['Virtual', '1:1', 'Auditoría'],
    precioHora: 130,
    paqueteDesde: 390,
    ubicacion: 'Remoto',
    categoria: 'Ventas'
  },
  {
    id: 12,
    nombre: 'Ricardo Salazar',
    especialidad: 'Facilitador en liderazgo emprendedor',
    foto: 'https://randomuser.me/api/portraits/men/61.jpg',
    descripcion: 'Fortalece tu liderazgo, toma decisiones efectivas y lidera con propósito.',
    valoracion: 4.7,
    valoraciones: 77,
    modalidades: ['Virtual', 'Taller grupal'],
    precioHora: 100,
    paqueteDesde: 310,
    ubicacion: 'Remoto',
    categoria: 'Liderazgo'
  },
  {
    id: 13,
    nombre: 'Valeria Huamán',
    especialidad: 'Coach en productividad y gestión del tiempo',
    foto: 'https://randomuser.me/api/portraits/women/12.jpg',
    descripcion: 'Aprende a organizar tu día y cumplir metas sin agotarte, usando técnicas efectivas.',
    valoracion: 4.8,
    valoraciones: 84,
    modalidades: ['Virtual'],
    precioHora: 95,
    paqueteDesde: 290,
    ubicacion: 'Remoto',
    categoria: 'Gestión del Tiempo'
  },
  {
    id: 14,
    nombre: 'Santiago León',
    especialidad: 'Mentor en mindset emprendedor',
    foto: 'https://randomuser.me/api/portraits/men/19.jpg',
    descripcion: 'Rompe bloqueos mentales, fortalece tu mentalidad y alcanza tu máximo potencial como emprendedor.',
    valoracion: 4.9,
    valoraciones: 99,
    modalidades: ['Virtual', '1:1'],
    precioHora: 105,
    paqueteDesde: 300,
    ubicacion: 'Remoto',
    categoria: 'Mindset Emprendedor'
  }
  ]);

  categorias = signal([
    'Todas',
    'Planificación',
    'Legal/Tributario',
    'Marketing',
    'Finanzas',
    'Branding',
    'Redes Sociales',
     'Ventas',
    'Automatización',
    'Tecnología',
    'Mindset Emprendedor',
    'Liderazgo',
    'Gestión del Tiempo'
  ]);

  opcionesOrden = signal([
    'Recomendados',
    'Especialistas mejor valorados',
    'Precio: bajo a alto',
    'Precio: alto a bajo'
  ]);

  asesoriasFiltradas = signal<Asesoria[]>([]);


  constructor() {

    this.filtrarAsesorias();
  }


  abrirDetalleAsesoria(asesoria: Asesoria): void {
    this.sidebarDetalle.open(asesoria);
  }
  filtrarAsesorias(): void {
    let resultados = this.asesorias();

    // Filtrar por categoría
    if (this.categoriaSeleccionada() !== 'Todas') {
      resultados = resultados.filter(a => a.categoria === this.categoriaSeleccionada());
    }

    // Filtrar por búsqueda
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      resultados = resultados.filter(a => 
        a.nombre.toLowerCase().includes(query) || 
        a.especialidad.toLowerCase().includes(query) ||
        a.descripcion.toLowerCase().includes(query)
      );
    }

    // Ordenar resultados
    resultados = this.ordenarAsesorias(resultados);

    this.asesoriasFiltradas.set(resultados);
  }

  ordenarAsesorias(asesorias: Asesoria[]): Asesoria[] {
    switch (this.ordenSeleccionado()) {
      case 'Especialistas mejor valorados':
        return [...asesorias].sort((a, b) => b.valoracion - a.valoracion);
      case 'Precio: bajo a alto':
        return [...asesorias].sort((a, b) => a.precioHora - b.precioHora);
      case 'Precio: alto a bajo':
        return [...asesorias].sort((a, b) => b.precioHora - a.precioHora);
      default: // 'Recomendados'
        return [...asesorias].sort((a, b) => b.valoracion * b.valoraciones - a.valoracion * a.valoraciones);
    }
  }

  cambiarCategoria(categoria: string): void {
    this.categoriaSeleccionada.set(categoria);
    this.filtrarAsesorias();
  }

  cambiarOrden(orden: string): void {
    this.ordenSeleccionado.set(orden);
    this.filtrarAsesorias();
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.filtrarAsesorias();
  }

  getColorCategoria(categoria: string): string {
    switch (categoria) {
      case 'Planificación': return 'bg-blue-100 text-blue-600';
      case 'Legal/Tributario': return 'bg-red-100 text-red-600';
      case 'Marketing': return 'bg-purple-100 text-purple-600';
      case 'Finanzas': return 'bg-green-100 text-green-600';
      case 'Branding': return 'bg-indigo-100 text-indigo-600';
      case 'Redes Sociales': return 'bg-teal-100 text-teal-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  getGradientColor(categoria: string): string {
    switch (categoria) {
      case 'Planificación': return 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700';
      case 'Legal/Tributario': return 'from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700';
      case 'Marketing': return 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700';
      case 'Finanzas': return 'from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700';
      case 'Branding': return 'from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700';
      case 'Redes Sociales': return 'from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700';
      default: return 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800';
    }
  }
}
