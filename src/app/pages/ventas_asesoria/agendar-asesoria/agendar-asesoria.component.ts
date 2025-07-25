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
import { AsesoriaService } from '../../../core/services/asesoria.service';
import { HttpClientModule } from '@angular/common/http';

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
    ToastModule,
     HttpClientModule
  ],
  templateUrl: './agendar-asesoria.component.html',
  styleUrls: ['./agendar-asesoria.component.css'],
  providers: [MessageService]
})
export class AgendarAsesoriaComponent implements OnInit {
 asesoria!: Asesoria;

  currentStep = 1;
  minDate: Date = new Date();
  loadingHours = false;
  currentMonth: Date = new Date();
  daysInMonth: {date: Date, available: boolean, isSelected: boolean}[] = [];
  isLoading: boolean = false;
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
   occupiedTimeSlots: string[] = [];

  availableTimeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM'
  ];

  unavailableDates: Date[] = [
    new Date(new Date().setDate(new Date().getDate() + 2)),
    new Date(new Date().setDate(new Date().getDate() + 5)),
    new Date(new Date().setDate(new Date().getDate() + 8))
  ];

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
    private messageService: MessageService,
    private asesoriaService: AsesoriaService
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { asesoria: Asesoria };

    if (state?.asesoria) {
      this.asesoria = state.asesoria;
      localStorage.setItem('asesoria', JSON.stringify(this.asesoria));
    } else {
      const saved = localStorage.getItem('asesoria');
      if (saved) {
        this.asesoria = JSON.parse(saved);
      } else {
        console.warn('No se recibió asesoría desde la navegación. Redireccionando...');
        this.router.navigate(['/asesorias/list']);
        return;
      }
    }

    this.generateDaysInMonth();
  }


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
           !!this.formData.empresa &&
           !!this.formData.cargo &&
           !!this.formData.sector &&
           !!this.formData.tamanoEmpresa &&
           this.formData.aceptaTerminos;
  }

  private validateStep2(): boolean {
    return !!this.formData.fecha && 
           !!this.formData.hora && 
           !!this.formData.modalidad;
  }

  getProgressWidth(): string {
    const percentage = (this.currentStep - 1) * 45;
    return `${percentage}%`;
  }

  generateDaysInMonth(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    this.daysInMonth = [];
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const available = this.isDateAvailable(date);
      const isSelected = this.formData.fecha ? 
        date.getDate() === this.formData.fecha.getDate() && 
        date.getMonth() === this.formData.fecha.getMonth() && 
        date.getFullYear() === this.formData.fecha.getFullYear() : false;
      
      this.daysInMonth.push({date, available, isSelected});
    }
  }

  isDateAvailable(date: Date): boolean {
    if (date.getDay() === 0 || date.getDay() === 6) return false;
    
    const today = new Date();
    if (date < today && !this.isSameDay(date, today)) return false;
    
    const isUnavailable = this.unavailableDates.some(unavailable => 
      this.isSameDay(unavailable, date)
    );
    
    return !isUnavailable;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
  }

  getDayClass(day: {date: Date, available: boolean, isSelected: boolean}): string {
    const baseClasses = 'h-10 w-10 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-all relative';
    
    if (day.isSelected) {
      return `${baseClasses} bg-gray-900 text-white`;
    }
    
    if (!day.available) {
      return `${baseClasses} text-gray-400 bg-gray-100 cursor-not-allowed`;
    }
    
    return `${baseClasses} text-gray-700 hover:bg-gray-100`;
  }

  selectDate(day: {date: Date, available: boolean}): void {
    if (!day.available) return;
    
    this.formData.fecha = day.date;
    this.daysInMonth.forEach(d => {
      d.isSelected = d.date.getTime() === day.date.getTime();
    });
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
    this.daysInMonth.forEach(d => d.isSelected = false);
  }

  selectTimeSlot(time: string): void {
    if (this.isTimeSlotDisabled(time)) return;
    this.formData.hora = time;
  }

  getTimeSlotClass(time: string): string {
    const baseClasses = 'py-2 px-2 rounded-lg border transition-all duration-200 text-sm font-medium flex items-center justify-center';
    
    if (this.formData.hora === time) {
      return `${baseClasses} bg-gray-800 text-white border-gray-800`;
    }
    
    if (this.isTimeSlotDisabled(time)) {
      return `${baseClasses} bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed`;
    }
    
    return `${baseClasses} bg-white text-gray-700 border-gray-300 hover:border-gray-400`;
  }

  isTimeSlotDisabled(time: string): boolean {
  if (!this.formData.fecha) return false;

  if (this.occupiedTimeSlots.includes(time)) return true;

  const now = new Date();
  const selectedDate = new Date(this.formData.fecha);
  const [hours, minutes] = this.parseTimeString(time);
  selectedDate.setHours(hours, minutes, 0, 0);

  return selectedDate < now && this.isSameDay(selectedDate, now);
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
  this.occupiedTimeSlots = [];

  if (!this.formData.fecha) {
    this.loadingHours = false;
    return;
  }

  const fecha = new Date(this.formData.fecha);
  const fechaKey = fecha.toISOString().split('T')[0]; // "YYYY-MM-DD"
  const data = JSON.parse(localStorage.getItem('horasOcupadas') || '{}');
  this.occupiedTimeSlots = data[fechaKey] || [];

  this.loadingHours = false;
}


  getModalidadText(value: string): string {
    const mod = this.modalidades.find(m => m.value === value);
    return mod ? mod.label : value;
  }

confirmAppointment(): void {
  if (!this.validateStep1() || !this.validateStep2()) {
    this.showError('Por favor completa todos los campos requeridos');
    return;
  }

  this.isLoading = true; // 🔄 Mostrar spinner

  const appointment = this.buildAppointmentObject();

  // ✅ Guardar asesoría en localStorage
  const asesoriasGuardadas = JSON.parse(localStorage.getItem('asesorias_confirmadas') || '[]');
  asesoriasGuardadas.push(appointment);
  localStorage.setItem('asesorias_confirmadas', JSON.stringify(asesoriasGuardadas));

  this.asesoriaService.agendarAsesoria(appointment).subscribe({
    next: () => {
      this.saveTimeSlotAsOccupied(appointment.fechaCompleta); 
      this.showSuccess();

      this.isLoading = false;

      setTimeout(() => {
        this.router.navigate(['/asesorias/list-total']);
      }, 1500);
    },
    error: (err) => {
      console.error('Error al agendar asesoría', err);
      this.isLoading = false;
      this.showError('Hubo un problema al confirmar tu asesoría. Intenta más tarde.');
    }
  });
}

saveTimeSlotAsOccupied(fechaCompletaISO: string): void {
  const fecha = new Date(fechaCompletaISO);
  const fechaKey = fecha.toISOString().split('T')[0]; // Ej: "2025-07-21"
  const hora = fecha.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const data = JSON.parse(localStorage.getItem('horasOcupadas') || '{}');
  data[fechaKey] = [...(data[fechaKey] || []), hora];

  localStorage.setItem('horasOcupadas', JSON.stringify(data));
}



 private buildAppointmentObject(): any {
  const fechaCompleta = new Date(this.formData.fecha!);
  const [hours, minutes] = this.parseTimeString(this.formData.hora);

  fechaCompleta.setHours(hours, minutes, 0, 0);

  return {
    nombre: this.formData.nombre,
    email: this.formData.email,
    telefono: this.formData.telefono,
    empresa: this.formData.empresa,
    cargo: this.formData.cargo,
    fecha: this.formData.fecha,
    hora: this.formData.hora,
    modalidad: this.formData.modalidad,
    sector: this.formData.sector,
    tamanoEmpresa: this.formData.tamanoEmpresa,
    whatsapp: this.formData.whatsapp,
    nombreAsesoria: this.asesoria.nombreAsesoria,
    categoria: this.asesoria.categoria,
    mentor: this.asesoria.nombre,
    fechaCompleta: fechaCompleta.toISOString(), // Opcional: formato ISO
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