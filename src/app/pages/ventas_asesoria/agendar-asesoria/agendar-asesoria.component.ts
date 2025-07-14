import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { SidebarNegocioComponent } from "../../../shared/components/sidebar-negocio/sidebar-negocio.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Asesoria } from '../../../shared/models/asesoria.model';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-agendar-asesoria',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarNegocioComponent,
    FormsModule,
    CommonModule,
    CalendarModule,
    DropdownModule,
    ToastModule
  ],
  templateUrl: './agendar-asesoria.component.html',
  styleUrls: ['./agendar-asesoria.component.css'],
  providers: [MessageService]
})
export class AgendarAsesoriaComponent implements OnInit {
  @Input() asesoria!: Asesoria;
  currentStep = 1;
  minDate: Date = new Date();
  loadingHours = false;
  currentMonth: Date = new Date();
  daysInMonth: {date: Date, available: boolean}[] = [];

  formData = {
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    fecha: null as Date | null,
    hora: '',
    detalles: '',
    modalidad: 'Virtual', 
    cargo: '',
    aceptaTerminos: false,
    tamanoEmpresa: '',
    sector: '',
    whatsapp: '',
  };

  // Horarios disponibles
  availableTimeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM'
  ];

  // Fechas no disponibles para agendar (ejemplo con fechas dinámicas)
  unavailableDates: Date[] = [
    new Date(new Date().setDate(new Date().getDate() + 2)), // 2 días después de hoy
    new Date(new Date().setDate(new Date().getDate() + 5)), // 5 días después de hoy
    new Date(new Date().setDate(new Date().getDate() + 8))  // 8 días después de hoy
  ];

  // Modalidades disponibles con íconos
  modalidades = [
    { 
      label: 'Virtual', 
      value: 'Virtual', 
      icon: 'fa-video', 
      description: 'Videollamada por Zoom/Teams con enlace de acceso' 
    },
    { 
      label: 'Presencial', 
      value: 'Presencial', 
      icon: 'fa-map-marker-alt', 
      description: 'No disponible para este servicio' 
    },
    { 
      label: 'Híbrida', 
      value: 'Híbrida', 
      icon: 'fa-blender-phone', 
      description: 'Participa desde nuestras oficinas o de forma remota' 
    }
  ];

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.generateDaysInMonth();
  }

  // Navegación entre pasos con validación
  nextStep(): void {
    if (this.currentStep === 1 && !this.validateStep1()) {
      this.showError('Por favor completa todos los campos obligatorios');
      return;
    }

    if (this.currentStep === 2 && !this.validateStep2()) {
      this.showError('Por favor selecciona fecha, hora y modalidad');
      return;
    }

    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  private validateStep1(): boolean {
    return !!this.formData.nombre && 
           !!this.formData.email && 
           !!this.formData.telefono && 
           !!this.formData.empresa ;
  }

  private validateStep2(): boolean {
    return !!this.formData.fecha && !!this.formData.hora && !!this.formData.modalidad;
  }

  // Barra de progreso
  getProgressWidth(): string {
    const progress = (this.currentStep - 1) * 4;
    return `calc(${progress}% + ${progress > 0 ? 8 : 0}px)`;
  }

  // Manejo de calendario personalizado
  generateDaysInMonth(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    
    // Obtener primer y último día del mes
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    this.daysInMonth = [];
    
    // Generar todos los días del mes
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const available = this.isDateAvailable(date);
      this.daysInMonth.push({date, available});
    }
  }

  isDateAvailable(date: Date): boolean {
    // Verificar si es fin de semana
    if (date.getDay() === 0 || date.getDay() === 6) return false;
    
    // Verificar si está en unavailableDates
    const isUnavailable = this.unavailableDates.some(unavailable => 
      unavailable.getDate() === date.getDate() && 
      unavailable.getMonth() === date.getMonth() && 
      unavailable.getFullYear() === date.getFullYear()
    );
    
    return !isUnavailable;
  }

  getDayClass(day: {date: Date, available: boolean}): string {
    const baseClasses = 'h-10 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-all';
    
    // Si es el día actual
    const today = new Date();
    if (day.date.getDate() === today.getDate() && 
        day.date.getMonth() === today.getMonth() && 
        day.date.getFullYear() === today.getFullYear()) {
      return `${baseClasses} bg-primary-100 border-2 border-primary-500 font-semibold`;
    }
    
    // Si está seleccionado
    if (this.formData.fecha && 
        day.date.getDate() === this.formData.fecha.getDate() && 
        day.date.getMonth() === this.formData.fecha.getMonth() && 
        day.date.getFullYear() === this.formData.fecha.getFullYear()) {
      return `${baseClasses} bg-black text-white font-semibold`;
    }
    
    // Si no está disponible
    if (!day.available) {
      return `${baseClasses} text-gray-400 bg-gray-100 cursor-not-allowed`;
    }
    
    // Día disponible normal
    return `${baseClasses} text-gray-700 hover:bg-primary-50 hover:text-primary-600`;
  }

  selectDate(day: {date: Date, available: boolean}): void {
    if (!day.available) return;
    this.formData.fecha = day.date;
    this.loadAvailableTimeSlots();
  }

  previousMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(), 
      this.currentMonth.getMonth() - 1, 
      1
    );
    this.generateDaysInMonth();
  }

  nextMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(), 
      this.currentMonth.getMonth() + 1, 
      1
    );
    this.generateDaysInMonth();
  }

  clearDateSelection(): void {
    this.formData.fecha = null;
    this.formData.hora = '';
    this.generateDaysInMonth();
  }

  // Manejo de horarios
  selectTimeSlot(time: string): void {
    this.formData.hora = time;
  }

  getTimeSlotClass(time: string): string {
    const baseClasses = 'py-2 px-2 rounded-lg border transition-all duration-200 text-sm font-medium flex items-center justify-center';
    
    if (this.formData.hora === time) {
      return `${baseClasses} bg-black text-white border-primary-600 shadow-md`;
    }
    if (this.isTimeSlotDisabled(time)) {
      return `${baseClasses} bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed`;
    }
    return `${baseClasses} bg-white text-gray-700 border-gray-200 hover:border-primary-400 hover:shadow-sm`;
  }

  isTimeSlotDisabled(time: string): boolean {
    if (!this.formData.fecha) return false;
    
    const now = new Date();
    const selectedDate = new Date(this.formData.fecha);
    const [hours, minutes] = this.parseTimeString(time);
    
    selectedDate.setHours(hours, minutes, 0, 0);
    
    return selectedDate < now;
  }

  private parseTimeString(time: string): [number, number] {
    const [timePart, period] = time.split(' ');
    const [hoursStr, minutesStr] = timePart.split(':');
    
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);
    
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return [hours, minutes];
  }

  loadAvailableTimeSlots(): void {
    this.loadingHours = true;
    this.formData.hora = '';
    
    // Simular carga de API
    setTimeout(() => {
      this.loadingHours = false;
      // Filtrar horarios no disponibles
      this.availableTimeSlots = this.availableTimeSlots.filter(
        time => !this.isTimeSlotDisabled(time)
      );
    }, 800);
  }

  // Métodos para texto e íconos
  getModalidadText(value: string): string {
    const mod = this.modalidades.find(m => m.value === value);
    return mod ? mod.label : value;
  }

  getModalityIcon(value: string): string {
    const mod = this.modalidades.find(m => m.value === value);
    return mod ? mod.icon : 'fa-question';
  }

  // Confirmación final
  confirmAppointment(): void {
    if (!this.validateStep1() || !this.validateStep2()) {
      this.showError('Por favor completa todos los campos requeridos');
      return;
    }

    const appointment = this.buildAppointmentObject();
    
    console.log('Asesoría agendada:', appointment);
    this.showSuccess();
    
    // Redirigir después de 1.5 segundos
    setTimeout(() => {
      this.router.navigate(['/asesorias/list-total']);
    }, 1500);
  }

  private buildAppointmentObject(): any {
    const fechaCompleta = new Date(this.formData.fecha!);
    const [hours, minutes] = this.parseTimeString(this.formData.hora);
    
    fechaCompleta.setHours(hours, minutes, 0, 0);

    return {
      asesoriaId: this.asesoria.categoria,
      asesorId: this.asesoria.nombre,
      ...this.formData,
      fechaCompleta
    };
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 5000
    });
  }

  private showSuccess(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Asesoría agendada correctamente',
      life: 5000
    });
  }
}