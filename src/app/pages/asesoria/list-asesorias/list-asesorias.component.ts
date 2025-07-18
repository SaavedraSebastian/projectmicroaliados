import { Component, signal, ViewChild } from '@angular/core';
import { SidebarNegocioComponent } from "../../../shared/components/sidebar-negocio/sidebar-negocio.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideBarDetalleAsesoriaComponent } from '../../../shared/components/sidebar-detalle-asesoria/sidebar-detalle-asesoria.component';
import { AsesoriaComprada } from '../../../shared/models/asesoria-comprada.model';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-list-asesorias',
  standalone: true,
  imports: [SidebarNegocioComponent, CommonModule, FormsModule, SideBarDetalleAsesoriaComponent, NavbarComponent],
  templateUrl: './list-asesorias.component.html',
  styleUrl: './list-asesorias.component.css'
})
export class ListAsesoriasComponent {
  @ViewChild(SideBarDetalleAsesoriaComponent) sidebarDetalle!: SideBarDetalleAsesoriaComponent;
  
  // Propiedades de estado
  searchQuery = signal('');
  filtroEstado = signal('Todas');
  ordenSeleccionado = signal('Recientes');
  showAdvisoryDetailsModal = signal(false);
  showMaterialsModal = signal(false);
  showScheduleModal = signal(false);
  showNotesModal = signal(false);
  showNewAdvisoryModal = signal(false);
  
  // Asesoría seleccionada
  selectedAdvisory: AsesoriaComprada | null = null;

  asesoriasCompradas = signal<AsesoriaComprada[]>([
    
    {
      id: 1,
      nombre: 'Laura Mendoza',
      especialidad: 'Especialista en modelos de negocio',
      foto: 'https://randomuser.me/api/portraits/women/65.jpg',
      descripcion: 'Te ayudo a validar tu idea de negocio y diseñar un modelo escalable con metodologías probadas.',
      valoracion: 4.9,
      valoraciones: 128,
      nombreAsesoria:'branding',
      modalidades: ['Virtual', 'Documentación'],
      precioHora: 100,
      paqueteDesde: 3,
      ubicacion: 'Remoto',
      categoria: 'Planificación',
      estado: 'Agendada',
      fechaCompra: new Date('2025-07-05'),
      tipoPaquete: 'Validación de Ideas',
      horasContratadas: 4,
      horasUtilizadas: 1,
      precioTotal: 400,
      sesiones: 4,
      beneficios: ['Material exclusivo', 'Mentoría personalizada'],
      duracion: 90,
      paquete: 'Modelo Negocio',
      planId: 'plan-123',
      planNombre: 'Validación de Ideas',
      hitoId: 'hito-1',
      hitoNombre: 'Modelo de Negocio',
      progresoPlan: 25,
      numeroSesion: 1,
      totalSesiones: 4,
      sesionAgendada: {
        fecha: new Date('2025-07-20'),
        horaInicio: '10:00',
        horaFin: '11:30',
        modalidad: 'Virtual',
        plataforma: 'Zoom'
      },
      tags: ['startup', 'modelo-negocio']
    },
    {
      id: 2,
      nombre: 'Carlos Rojas',
      especialidad: 'Abogado corporativo',
      foto: 'https://randomuser.me/api/portraits/men/45.jpg',
      descripcion: 'Te guío en la formalización de tu negocio, trámites legales y cumplimiento tributario en Perú.',
      valoracion: 4.8,
      valoraciones: 96,
      nombreAsesoria:'Conocimiento de Mercado',
      modalidades: ['Virtual', 'Presencial'],
      precioHora: 150,
      paqueteDesde: 2,
      ubicacion: 'Lima, Perú',
      categoria: 'Legal/Tributario',
      estado: 'Completada',
      fechaCompra: new Date('2023-04-10'),
      tipoPaquete: 'Lanzamiento Estratégico',
      horasContratadas: 3,
      horasUtilizadas: 3,
      precioTotal: 450,
      sesiones: 3,
      beneficios: ['Asesoría legal completa', 'Documentos personalizados'],
      duracion: 60,
      paquete: 'Legalización',
      planId: 'plan-456',
      planNombre: 'Lanzamiento Estratégico',
      hitoId: 'hito-2',
      hitoNombre: 'Legalización',
      progresoPlan: 100,
      numeroSesion: 3,
      totalSesiones: 3,
      sesionAgendada: undefined,
      tags: ['legal', 'tributario']
    },
    {
      id: 3,
      nombre: 'Ana Torres',
      especialidad: 'Estratega digital',
      foto: 'https://randomuser.me/api/portraits/women/32.jpg',
      descripcion: 'Desarrollo estrategias de marketing digital personalizadas para hacer crecer tu negocio online.',
      valoracion: 4.9,
      valoraciones: 142,
      nombreAsesoria: 'Estrategias Empresariales',
      modalidades: ['Virtual', 'Plan estratégico'],
      precioHora: 120,
      paqueteDesde: 3,
      ubicacion: 'Remoto',
      categoria: 'Marketing',
      estado: 'Agendada',
      fechaCompra: new Date('2023-06-01'),
      tipoPaquete: 'Crecimiento y Escalamiento',
      horasContratadas: 5,
      horasUtilizadas: 2,
      precioTotal: 600,
      sesiones: 5,
      beneficios: ['Auditoría digital', 'Plan de acción'],
      duracion: 120,
      paquete: 'Estrategia Digital',
      planId: 'plan-789',
      planNombre: 'Crecimiento y Escalamiento',
      hitoId: 'hito-3',
      hitoNombre: 'Estrategia Digital',
      progresoPlan: 40,
      numeroSesion: 2,
      totalSesiones: 5,
      sesionAgendada: {
        fecha: new Date('2023-06-25'),
        horaInicio: '14:00',
        horaFin: '16:00',
        modalidad: 'Virtual',
        plataforma: 'Google Meet'
      },
      tags: ['marketing', 'redes-sociales']
    },
    {
      id: 4,
      nombre: 'Roberto Sánchez',
      especialidad: 'Consultor financiero',
      foto: 'https://randomuser.me/api/portraits/men/68.jpg',
      descripcion: 'Te ayudo a organizar las finanzas de tu negocio, optimizar costos y mejorar tu rentabilidad.',
      valoracion: 4.7,
      nombreAsesoria: 'Financias Comerciales',
      valoraciones: 87,
      modalidades: ['Virtual', 'Plantillas'],
      precioHora: 130,
      paqueteDesde: 2,
      ubicacion: 'Remoto',
      categoria: 'Finanzas',
      estado: 'Cancelada',
      fechaCompra: new Date('2023-03-20'),
      tipoPaquete: 'Lanzamiento Estratégico',
      horasContratadas: 2,
      horasUtilizadas: 1,
      precioTotal: 260,
      sesiones: 2,
      beneficios: ['Análisis financiero', 'Optimización de costos'],
      duracion: 90,
      paquete: 'Estructura Financiera',
      planId: 'plan-456',
      planNombre: 'Lanzamiento Estratégico',
      hitoId: 'hito-4',
      hitoNombre: 'Estructura Financiera',
      progresoPlan: 75,
      numeroSesion: 1,
      totalSesiones: 2,
      sesionAgendada: {
        fecha: new Date('2023-06-25'),
        horaInicio: '14:00',
        horaFin: '16:00',
        modalidad: 'Virtual',
        plataforma: 'Google Meet'
      },
      tags: ['finanzas', 'costos']
    }
  ]);


   estados = signal(['Todas', 'Agendadas', 'Completadas', 'Canceladas']);
  opcionesOrden = signal(['Recientes', 'Antiguas', 'Próximas']);
  asesoriasCompradasFiltradas = signal<AsesoriaComprada[]>([]);

  constructor() {
     this.cargarAsesoriasDesdeLocalStorage();
    this.filtrarAsesoriasCompradas();
  }
  cargarAsesoriasDesdeLocalStorage(): void {
  const asesoriasLocales = JSON.parse(localStorage.getItem('asesorias_confirmadas') || '[]');

  // Asegurarte de que las fechas sean objetos Date
  const asesoriasConvertidas: AsesoriaComprada[] = asesoriasLocales.map((a: any, index: number) => ({
    ...a,
    id: 1000 + index, // Puedes ajustar cómo generas los ID si lo necesitas
    fechaCompra: new Date(a.fechaCompra),
    sesionAgendada: a.sesionAgendada ? {
      ...a.sesionAgendada,
      fecha: new Date(a.sesionAgendada.fecha)
    } : undefined
  }));

  // Combinar asesorías locales con las existentes (puedes reemplazar si prefieres)
  const combinadas = [...this.asesoriasCompradas(), ...asesoriasConvertidas];
  this.asesoriasCompradas.set(asesoriasConvertidas);
}

  openAdvisoryDetails(asesoria: AsesoriaComprada): void {
    this.selectedAdvisory = asesoria;
    this.showAdvisoryDetailsModal.set(true);
  }

  openNewAdvisoryModal(): void {
    this.showNewAdvisoryModal.set(true);
  }

  openMaterialsModal(asesoria: AsesoriaComprada): void {
    this.selectedAdvisory = asesoria;
    this.showMaterialsModal.set(true);
  }

  openScheduleModal(asesoria: AsesoriaComprada): void {
    this.selectedAdvisory = asesoria;
    this.showScheduleModal.set(true);
  }

  openNotesModal(): void {
    this.showNotesModal.set(true);
  }

  joinSession(asesoria: AsesoriaComprada): void {
    console.log('Uniéndose a la sesión de:', asesoria.nombre);
  }

  abrirDetalleAsesoria(asesoria: AsesoriaComprada): void {
    this.sidebarDetalle.open(asesoria);
  }

  filtrarAsesoriasCompradas(): void {
    let resultados = this.asesoriasCompradas();

    if (this.filtroEstado() !== 'Todas') {
      resultados = resultados.filter(a => a.estado === this.filtroEstado().slice(0, -1));
    }

    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      resultados = resultados.filter(a => 
        a.nombre.toLowerCase().includes(query) || 
        a.especialidad.toLowerCase().includes(query) ||
        a.descripcion.toLowerCase().includes(query) ||
        (a.planNombre && a.planNombre.toLowerCase().includes(query)) ||
        (a.hitoNombre && a.hitoNombre.toLowerCase().includes(query))
      );
    }

    resultados = this.ordenarAsesoriasCompradas(resultados);
    this.asesoriasCompradasFiltradas.set(resultados);
  }

  tieneAsesoriasConSesionAgendada(): boolean {
    return this.asesoriasCompradasFiltradas().some(a => a.sesionAgendada !== undefined);
  }

  ordenarAsesoriasCompradas(asesorias: AsesoriaComprada[]): AsesoriaComprada[] {
    switch (this.ordenSeleccionado()) {
      case 'Antiguas':
        return [...asesorias].sort((a, b) => a.fechaCompra.getTime() - b.fechaCompra.getTime());
      case 'Próximas':
        return [...asesorias].sort((a, b) => {
          if (!a.sesionAgendada && !b.sesionAgendada) return 0;
          if (!a.sesionAgendada) return 1;
          if (!b.sesionAgendada) return -1;
          return a.sesionAgendada.fecha.getTime() - b.sesionAgendada.fecha.getTime();
        });
      default: // 'Recientes'
        return [...asesorias].sort((a, b) => b.fechaCompra.getTime() - a.fechaCompra.getTime());
    }
  }

  cambiarFiltroEstado(estado: string): void {
    this.filtroEstado.set(estado);
    this.filtrarAsesoriasCompradas();
  }

  cambiarOrden(orden: string): void {
    this.ordenSeleccionado.set(orden);
    this.filtrarAsesoriasCompradas();
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.filtrarAsesoriasCompradas();
  }

  getColorEstado(estado: string): string {
    switch (estado) {
      case 'Agendada': return 'bg-blue-100 text-blue-800';
      case 'Completada': return 'bg-green-100 text-green-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  formatDuracion(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return horas > 0 ? `${horas}h ${mins}min` : `${mins}min`;
  }

  diasParaSesion(fechaSesion: Date): number {
    const hoy = new Date();
    const diffTime = fechaSesion.getTime() - hoy.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  sesionAgendada(): AsesoriaComprada | null {
    const asesoriasConSesion = this.asesoriasCompradasFiltradas()
      .filter(a => a.estado === 'Agendada' && a.sesionAgendada)
      .sort((a, b) => a.sesionAgendada!.fecha.getTime() - b.sesionAgendada!.fecha.getTime());
    
    return asesoriasConSesion.length > 0 ? asesoriasConSesion[0] : null;
  }

  contarAsesorias(estado: string): number {
    return this.asesoriasCompradasFiltradas()
      .filter(a => a.estado === estado.slice(0, -1)).length;
  }

  // Método para manejar el cierre de modales
  closeModal(modalType: 'details' | 'materials' | 'schedule' | 'notes' | 'newAdvisory'): void {
    switch (modalType) {
      case 'details':
        this.showAdvisoryDetailsModal.set(false);
        break;
      case 'materials':
        this.showMaterialsModal.set(false);
        break;
      case 'schedule':
        this.showScheduleModal.set(false);
        break;
      case 'notes':
        this.showNotesModal.set(false);
        break;
      case 'newAdvisory':
        this.showNewAdvisoryModal.set(false);
        break;
    }
  }
}