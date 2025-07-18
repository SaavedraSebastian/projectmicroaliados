import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { SidebarNegocioComponent } from "../../../shared/components/sidebar-negocio/sidebar-negocio.component";
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { Stats } from '../../../shared/models/stats.model';
import { NgChartsModule } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { SidebarMessageComponent } from '../../../shared/components/sidebar-message/sidebar-message.component';

@Component({
  selector: 'app-dashboard-negocio',
  templateUrl: './dashbord-negocio.component.html',
  styleUrls: ['./dashbord-negocio.component.css'],
  standalone: true,
  imports: [SidebarNegocioComponent, CommonModule, NgChartsModule, SidebarMessageComponent]
})
export class DashbordNegocioComponent implements OnInit, OnDestroy {
  user: any = {
    nombre: '',
    correo: '',
    profileProgress: 0,
    avatar: 'https://app.factiliza.com/assets/images/portrait/small/avatar-s-13.jpg'
  };

  stats: Stats = {
    salesToday: 0,
    visitorsToday: 0,
    conversionRate: 0,
    newCustomers: 0,
    weeklySales: []
  };
  
  courses: any[] = [];
  announcements: any[] = [];
  groups: any[] = [];
  maxSales: number = 0;
  
  private updateSubscription!: Subscription;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        max: 100,
        grid: { display: false },
        ticks: {
          color: '#6B7280',
          callback: (value: number | string) => value + '%'
        },
        title: {
          display: true,
          text: 'Progreso (%)',
          color: '#6B7280',
          font: { weight: 'bold' }
        }
      },
      y: {
        grid: { color: '#E5E7EB' },
        ticks: {
          color: '#6B7280'
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}% completado`
        }
      }
    }
  };

  public vistaActual: 'semanal' | 'total' = 'semanal';

  public rutaData: ChartConfiguration['data'] = {
    labels: ['Ideación', 'Validación', 'Propuesta de Valor', 'Prototipo', 'Lanzamiento'],
    datasets: [{
      data: [100, 75, 50, 25, 0],
      backgroundColor: '#3B82F6',
      hoverBackgroundColor: '#2563EB',
      borderRadius: 6,
      borderSkipped: false
    }]
  };

  public rutaOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        max: 100,
        grid: { display: false },
        ticks: {
          color: '#6B7280',
          callback: (value: number | string) => value + '%'
        },
        title: {
          display: true,
          text: 'Progreso (%)',
          color: '#6B7280',
          font: { weight: 'bold' }
        }
      },
      y: {
        grid: { color: '#E5E7EB' },
        ticks: { color: '#6B7280' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}% completado`
        }
      }
    }
  };

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeUserData();
    this.loadDashboardData();
  }

  handleGroupAction(group: any, actionType: 'join' | 'view'): void {
    const groupName = group.name;

    switch (actionType) {
      case 'join':
        this.joinGroup(group, groupName);
        break;
      case 'view':
        this.viewGroup(group, groupName);
        break;
    }
  }

  private joinGroup(group: any, groupName: string): void {
    const hasNewMembers = typeof group.newMembers === 'number';

    if (hasNewMembers) {
      group.newMembers += 1;
      this.toastr.success(`Te has unido al grupo ${groupName}`, '¡Éxito!');
    } else {
      this.toastr.info(`Has participado en ${groupName}`, 'Participación');
    }
  }

  private viewGroup(group: any, groupName: string): void {
    const message = group.newMembers
      ? `Redirigiendo a ${groupName}...`
      : `Mostrando discusiones de ${groupName}...`;

    this.toastr.info(message, 'Redireccionando');
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  private initializeUserData(): void {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      const defaultUser = {
        nombre: "Sebastian Alonso",
        apellidos: "Saavedra Arroyo",
        correo: "ssaavedraa4@upao.edu.pe",
        empresa: "HUB",
        rubro: "Venta de frutas",
        telefono: "924484100",
        profileProgress: 75,
        avatar: 'https://app.factiliza.com/assets/images/portrait/small/avatar-s-13.jpg'
      };
      
      this.authService.initializeUser(defaultUser);
      this.user = {...defaultUser};
    } else {
      this.user = {
        ...currentUser,
        profileProgress: this.authService.calculateProfileProgress(currentUser)
      };
    }
  }

  private loadDashboardData(): void {
    // Datos iniciales
    this.stats = {
      salesToday: 2450,
      visitorsToday: 1243,
      conversionRate: 3.2,
      newCustomers: 15,
      weeklySales: [1200, 1900, 1400, 2100, 1800, 2500, 2200]
    };
    
    this.courses = [
      { 
        id: 1, 
        title: 'Marketing Digital', 
        icon: 'bullhorn', 
        color: 'purple', 
        progress: 65, 
        lessonsCompleted: 13, 
        totalLessons: 20,
        chartData: this.getCourseChartData(65, 'purple')
      },
      { 
        id: 2, 
        title: 'Ventas Online', 
        icon: 'shopping-cart', 
        color: 'blue', 
        progress: 30, 
        lessonsCompleted: 6, 
        totalLessons: 20,
        chartData: this.getCourseChartData(30, 'blue')
      },
      { 
        id: 3, 
        title: 'Branding Personal', 
        icon: 'palette', 
        color: 'pink', 
        progress: 85, 
        lessonsCompleted: 17, 
        totalLessons: 20,
        chartData: this.getCourseChartData(85, 'pink')
      }
    ];
    
    this.announcements = [
      { 
        id: 1, 
        title: 'Nueva Actualización', 
        icon: 'sync', 
        color: 'blue', 
        status: 'Nuevo', 
        date: 'Hace 2 horas', 
        description: 'Hemos lanzado nuevas funciones para mejorar tu experiencia.' 
      },
      { 
        id: 2, 
        title: 'Mantenimiento Programado', 
        icon: 'tools', 
        color: 'orange', 
        status: 'Importante', 
        date: 'Hace 1 día', 
        description: 'El sistema estará en mantenimiento el próximo viernes a las 2 AM.' 
      }
    ];
    
    this.groups = [
      { 
        id: 1, 
        name: 'Emprendedores Digitales', 
        icon: 'rocket', 
        gradient: ['purple', 'indigo'], 
        members: 1243, 
        activity: 'hace 15 min', 
        online: 32,
        newMembers: 5
      },
      { 
        id: 2, 
        name: 'Marketing Avanzado', 
        icon: 'chart-line', 
        gradient: ['blue', 'cyan'], 
        members: 876, 
        activity: 'hace 1 hora'
      }
    ];
    
    this.maxSales = Math.max(...this.stats.weeklySales);
  }

  private getCourseChartData(progress: number, color: string): any {
    return {
      datasets: [{
        data: [progress, 100 - progress],
        backgroundColor: [this.getColorCode(color), '#E5E7EB'],
        borderWidth: 0
      }]
    };
  }

  private getColorCode(colorName: string): string {
    const colors: {[key: string]: string} = {
      'purple': '#8B5CF6',
      'blue': '#3B82F6',
      'pink': '#EC4899',
      'red': '#EF4444',
      'green': '#10B981',
      'yellow': '#F59E0B',
      'orange': '#F97316'
    };
    return colors[colorName] || '#3B82F6';
  }

  private getRandomChange(base: number, range: number, min: number = 0): number {
    const change = Math.floor(Math.random() * range * 2) - range;
    return Math.max(min, base + change);
  }

  updateCourseProgress(courseId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    if (course && course.progress < 100) {
      course.progress = Math.min(100, course.progress + 10);
      course.lessonsCompleted = Math.min(
        course.totalLessons, 
        Math.ceil(course.progress / 100 * course.totalLessons)
      );
      course.chartData = this.getCourseChartData(course.progress, course.color);
      this.toastr.success(`Progreso actualizado: ${course.title} al ${course.progress}%`, 'Curso Actualizado');
    }
  }
}