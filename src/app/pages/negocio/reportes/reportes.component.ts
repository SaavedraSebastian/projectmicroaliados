import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { SidebarNegocioComponent } from "../../../shared/components/sidebar-negocio/sidebar-negocio.component";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, forkJoin, of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SortByPipe } from '../../../core/pipes/sort-by.pipe';
import { User } from '../../../shared/models/user.model';

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

// Interfaces (se mantienen igual)
interface UserData {
  name: string;
  plan: string;
  initials: string;
}

interface BusinessData {
  name: string;
  industry: string;
  startDate: Date;
  status: string;
  nextGoal: string;
}

interface CourseStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  completedPercentage: number;
  inProgressPercentage: number;
  notStartedPercentage: number;
}

interface Milestone {
  id: number;
  name: string;
  status: 'completed' | 'in-progress' | 'not-started';
  completionDate?: Date;
  progress: number;
  type: string;
  details: string;
  goal: string;
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  startDate: string;
  endDate: string;
  duration: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'scheduled';
  type: string;
}

interface Training {
  id: number;
  title: string;
  date: string;
  duration: string;
  confirmed?: boolean;
  type: string;
  time: string;
}

interface Speaker {
  id: number;
  name: string;
  expertise: string;
  rating: number;
  color: string;
  initials: string;
  specialty: string;
}

interface Activity {
  id: number;
  title: string;
  date: string;
  type: string;
  confirmed?: boolean;
  time: string;
}

interface ChartData {
  labels: string[];
  coursesData: number[];
  consultationsData: number[];
  usersData: number[];
}

interface UsersChartData {
  labels: string[];
  activeUsers: number[];
  newUsers: number[];
}

interface FilteredData {
  courses: Course[];
  milestones: Milestone[];
  activities: Activity[];
}

// Servicios mock (se mantienen igual)
class MockAuthService {
  getCurrentUser(): User {
    return { 
      nombre: 'Usuario',
      apellidos: 'Ejemplo',
      correo: 'usuario@ejemplo.com',
      empresa: 'Empresa Ficticia SAC',
      rubro: 'Emprendedor',
      telefono: '999999999',
      fullName: 'Usuario Ejemplo',
      profileProgress: 75,
      plan: 'Plan Premium'
    };
  }

  logout() {
    console.log('Logged out');
  }
}

class MockExportService {
  exportToExcel(data: any, filename: string) {
    console.log(`Exporting to Excel: ${filename}`, data);
  }
}

class MockModalService {
  showError(message: string) {
    console.error(message);
  }

  showSuccess(message: string) {
    console.log(message);
  }

  openActivityDetails(activity: Activity) {
    console.log('Activity details:', activity);
  }

  openSpeakerDetails(speaker: Speaker) {
    console.log('Speaker details:', speaker);
  }

  openMilestoneDetails(milestone: Milestone) {
    console.log('Milestone details:', milestone);
  }
}

class MockReportesService {
  getBusinessData(): Observable<BusinessData> {
    return of({
      name: 'Mi Negocio Ejemplo',
      industry: 'Tecnología',
      startDate: new Date(2025, 1, 15),
      status: 'Activo',
      nextGoal: 'Expandir a nuevos mercados'
    });
  }

  getCourseStatistics(): Observable<CourseStats> {
    return of({
      total: 12,
      completed: 5,
      inProgress: 4,
      notStarted: 3,
      completedPercentage: 42,
      inProgressPercentage: 33,
      notStartedPercentage: 25
    });
  }

  getMilestones(): Observable<Milestone[]> {
    return of([
      {
        id: 1,
        name: 'Lanzamiento inicial',
        status: 'completed',
        completionDate: new Date(2025, 4, 15),
        progress: 100,
        type: 'Producto',
        details: 'Primera versión del producto',
        goal: 'Lanzar MVP'
      },
      {
        id: 2,
        name: 'Primeros 100 clientes',
        status: 'completed',
        completionDate: new Date(2025, 7, 20),
        progress: 100,
        type: 'Ventas',
        details: 'Alcanzar primeros 100 clientes pagos',
        goal: 'Validar mercado'
      },
      {
        id: 3,
        name: 'Expansión a nueva región',
        status: 'in-progress',
        progress: 65,
        type: 'Crecimiento',
        details: 'Expandir operaciones a región norte',
        goal: 'Cobertura nacional'
      },
      {
        id: 4,
        name: 'Segunda ronda de inversión',
        status: 'not-started',
        progress: 0,
        type: 'Financiamiento',
        details: 'Buscar inversionistas para crecimiento',
        goal: 'USD 500k'
      }
    ]);
  }

  getCourses(): Observable<Course[]> {
    return of([
      {
        id: 1,
        title: 'Marketing Digital Básico',
        instructor: 'Ana López',
        startDate: '2025-01-10',
        endDate: '2025-02-15',
        duration: '5 semanas',
        progress: 100,
        status: 'completed',
        type: 'marketing'
      },
      {
        id: 2,
        title: 'Finanzas para Emprendedores',
        instructor: 'Carlos Méndez',
        startDate: '2025-03-01',
        endDate: '2025-04-10',
        duration: '6 semanas',
        progress: 100,
        status: 'completed',
        type: 'finanzas'
      },
      {
        id: 3,
        title: 'Diseño UX/UI',
        instructor: 'María González',
        startDate: '2025-05-15',
        endDate: '2025-07-20',
        duration: '9 semanas',
        progress: 75,
        status: 'in-progress',
        type: 'diseño'
      }
    ]);
  }

  getRecentTrainings(): Observable<Training[]> {
    return of([
      {
        id: 1,
        title: 'Taller de Ventas Online',
        date: '2025-06-15',
        time: '3:00 PM',
        duration: '3 horas',
        confirmed: true,
        type: 'capacitacion'
      },
      {
        id: 2,
        title: 'Seminario de Tributación',
        date: '2025-07-20',
        time: '10:00 AM',
        duration: '2 horas',
        confirmed: false,
        type: 'seminario'
      }
    ]);
  }

  getFeaturedSpeakers(): Observable<Speaker[]> {
    return of([
      {
        id: 1,
        name: 'Roberto Sánchez',
        expertise: 'Marketing Digital',
        rating: 4.8,
        color: 'purple',
        initials: 'RS',
        specialty: 'Estrategias Digitales'
      },
      {
        id: 2,
        name: 'Sofía Castro',
        expertise: 'Finanzas Corporativas',
        rating: 4.9,
        color: 'blue',
        initials: 'SC',
        specialty: 'Gestión Financiera'
      }
    ]);
  }

  getUpcomingActivities(): Observable<Activity[]> {
    return of([
      {
        id: 1,
        title: 'Reunión con inversionistas',
        date: '2025-09-05',
        time: '9:00 AM',
        type: 'reunión',
        confirmed: true
      },
      {
        id: 2,
        title: 'Taller de Productividad',
        date: '2025-09-15',
        time: '2:00 PM',
        type: 'capacitación',
        confirmed: false
      }
    ]);
  }

  getCombinedChartData(startDate: string, endDate: string, range: string): Observable<ChartData> {
    let labels: string[];
    let coursesData: number[];
    let consultationsData: number[];
    let usersData: number[];

    if (range === 'monthly') {
      labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
      coursesData = [3, 5, 7, 6, 8, 10];
      consultationsData = [2, 4, 5, 7, 6, 8];
      usersData = [5, 8, 10, 12, 15, 18];
    } else if (range === 'quarterly') {
      labels = ['Q1', 'Q2', 'Q3', 'Q4'];
      coursesData = [15, 20, 18, 25];
      consultationsData = [10, 15, 12, 18];
      usersData = [20, 30, 35, 45];
    } else {
      labels = ['2022', '2023', '2024', '2025'];
      coursesData = [40, 60, 75, 90];
      consultationsData = [30, 45, 60, 70];
      usersData = [50, 80, 120, 150];
    }

    return of({ labels, coursesData, consultationsData, usersData });
  }

  getUsersChartData(range: string): Observable<UsersChartData> {
    let labels: string[];
    let activeUsers: number[];
    let newUsers: number[];

    if (range === '3months') {
      labels = ['Mes 1', 'Mes 2', 'Mes 3'];
      activeUsers = [15, 20, 25];
      newUsers = [5, 8, 10];
    } else if (range === '6months') {
      labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
      activeUsers = [10, 15, 18, 20, 22, 25];
      newUsers = [3, 5, 6, 7, 8, 9];
    } else {
      labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      activeUsers = [10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 40];
      newUsers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15];
    }

    return of({ labels, activeUsers, newUsers });
  }

  applyFilter(filter: string, startDate: string, endDate: string): Observable<FilteredData> {
    return forkJoin({
      courses: this.getCourses(),
      milestones: this.getMilestones(),
      activities: this.getUpcomingActivities()
    });
  }

  getCoursesByType(type: string): Observable<Course[]> {
    if (type === 'all') {
      return this.getCourses();
    }
    
    return this.getCourses().pipe(
      map(courses => courses.filter(course => course.type === type))
    );
  }

  confirmAttendance(trainingId: number): Observable<{success: boolean}> {
    return of({ success: true });
  }
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [SidebarNegocioComponent, NavbarComponent, CommonModule, FormsModule, SortByPipe],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [
    MockReportesService,
    MockModalService, 
    MockAuthService,
    MockExportService,
    SortByPipe
  ]
})
export class ReportesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('combinedChart') combinedChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('usersChart') usersChartRef!: ElementRef<HTMLCanvasElement>;

  // Datos y propiedades del componente (se mantienen igual)
  userData: UserData = { name: '', plan: '', initials: '' };
  businessData: BusinessData = { name: '', industry: '', startDate: new Date(), status: '', nextGoal: '' };
  userStats = { totalUsers: 0, newUsers: 0, growthPercentage: 0, retentionPercentage: 0, activeUsers: 0, activePercentage: 0 };
  courseStats: CourseStats = { total: 0, completed: 0, inProgress: 0, notStarted: 0, completedPercentage: 0, inProgressPercentage: 0, notStartedPercentage: 0 };
  progressSummary = { coursesCompleted: 0, completedCourses: 0, totalCourses: 0, consultationsCompleted: 0, completedConsultations: 0, totalConsultations: 0, activeSessions: 0, activeSessionTypes: [] as string[] };
  milestones: Milestone[] = [];
  coursesData: Course[] = [];
  recentTrainings: Training[] = [];
  featuredSpeakers: Speaker[] = [];
  upcomingActivities: Activity[] = [];
  nextTraining?: Training;
  selectedFilter = 'month';
  selectedContentType = 'all';
  chartTimeRange = 'quarterly';
  userChartTimeRange = '6months';
  dateRange = { start: '', end: '' };
  sortColumn = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  showUserDropdown = false;
  currentYear = new Date().getFullYear();
  reportGeneratedDate = new Date();
  isLoading = true;
  private combinedChart?: Chart;
  private usersChart?: Chart;
  private dataSubscriptions: Subscription[] = [];

  constructor(
    private reportesService: MockReportesService,
    private modalService: MockModalService,
    private router: Router,
    private authService: MockAuthService,
    private exportService: MockExportService,
    private sortPipe: SortByPipe
  ) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    this.dateRange = {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0]
    };
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCharts();
      this.loadInitialData();
    }, 0);
  }

  ngOnDestroy(): void {
    this.cleanupSubscriptions();
    this.destroyCharts();
  }

  private loadUserData(): void {
    const user = this.authService.getCurrentUser();
    this.userData = {
      name: user.fullName || 'Usuario Ejemplo',
      plan: user.plan || 'Plan Premium',
      initials: this.getInitials(user.fullName || 'UE')
    };
  }

  private getInitials(name: string): string {
    return name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  }

  private loadInitialData(): void {
    this.isLoading = true;

    const loadData$ = forkJoin({
      businessData: this.reportesService.getBusinessData(),
      courseStats: this.reportesService.getCourseStatistics(),
      milestones: this.reportesService.getMilestones(),
      courses: this.reportesService.getCourses(),
      trainings: this.reportesService.getRecentTrainings(),
      speakers: this.reportesService.getFeaturedSpeakers(),
      activities: this.reportesService.getUpcomingActivities(),
      chartData: this.reportesService.getCombinedChartData(this.dateRange.start, this.dateRange.end, this.chartTimeRange),
      usersData: this.reportesService.getUsersChartData(this.userChartTimeRange)
    });

    const dataSubscription = loadData$.subscribe({
      next: (data) => {
        this.businessData = data.businessData;
        this.courseStats = data.courseStats;
        this.progressSummary = {
          coursesCompleted: data.courseStats.completedPercentage,
          completedCourses: data.courseStats.completed,
          totalCourses: data.courseStats.total,
          consultationsCompleted: 75,
          completedConsultations: 15,
          totalConsultations: 20,
          activeSessions: 2,
          activeSessionTypes: ['Curso', 'Asesoria']
        };
        this.milestones = data.milestones;
        this.coursesData = data.courses;
        this.recentTrainings = data.trainings;
        this.featuredSpeakers = data.speakers;
        this.upcomingActivities = data.activities;
        this.nextTraining = data.trainings[0];

        this.updateCombinedChart(data.chartData);
        this.updateUsersChart(data.usersData);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
        this.modalService.showError('Error al cargar los datos. Por favor, intente nuevamente.');
      }
    });

    this.dataSubscriptions.push(dataSubscription);
  }

  private initCharts(): void {
    // Verificar que los elementos del DOM existen
    if (!this.combinedChartRef?.nativeElement || !this.usersChartRef?.nativeElement) {
      console.error('No se encontraron los elementos del gráfico');
      return;
    }

    // Gráfico combinado con opciones mejoradas
    const combinedCtx = this.combinedChartRef.nativeElement.getContext('2d');
    if (combinedCtx) {
      this.combinedChart = new Chart(combinedCtx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Cursos Completados',
              data: [],
              backgroundColor: 'rgba(124, 58, 237, 0.7)',
              borderColor: 'rgba(124, 58, 237, 1)',
              borderWidth: 1,
              borderRadius: 4
            },
            {
              label: 'Asesorías Realizadas',
              data: [],
              backgroundColor: 'rgba(16, 185, 129, 0.7)',
              borderColor: 'rgba(16, 185, 129, 1)',
              borderWidth: 1,
              borderRadius: 4
            },
            {
              label: 'Usuarios Activos',
              data: [],
              type: 'line',
              borderColor: 'rgba(59, 130, 246, 1)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(59, 130, 246, 1)',
              pointRadius: 4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                padding: 20
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              },
              grid: {
                   display: false
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }

    // Gráfico de usuarios con opciones mejoradas
    const usersCtx = this.usersChartRef.nativeElement.getContext('2d');
    if (usersCtx) {
      this.usersChart = new Chart(usersCtx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Usuarios Activos',
              data: [],
              borderColor: 'rgba(236, 72, 153, 1)',
              backgroundColor: 'rgba(236, 72, 153, 0.1)',
              borderWidth: 2,
              tension: 0.3,
              pointBackgroundColor: 'rgba(236, 72, 153, 1)',
              pointRadius: 4,
              fill: true
            },
            {
              label: 'Nuevos Usuarios',
              data: [],
              borderColor: 'rgba(16, 185, 129, 1)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderWidth: 2,
              tension: 0.3,
              pointBackgroundColor: 'rgba(16, 185, 129, 1)',
              pointRadius: 4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                padding: 20
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              },
              grid: {
                display: false
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
  }

  private updateCombinedChart(data: ChartData): void {
    if (!this.combinedChart) {
      console.error('El gráfico combinado no está inicializado');
      return;
    }

    this.combinedChart.data.labels = data.labels;
    this.combinedChart.data.datasets[0].data = data.coursesData;
    this.combinedChart.data.datasets[1].data = data.consultationsData;
    this.combinedChart.data.datasets[2].data = data.usersData;
    this.combinedChart.update();
  }

  private updateUsersChart(data: UsersChartData): void {
    if (!this.usersChart) {
      console.error('El gráfico de usuarios no está inicializado');
      return;
    }

    this.usersChart.data.labels = data.labels;
    this.usersChart.data.datasets[0].data = data.activeUsers;
    this.usersChart.data.datasets[1].data = data.newUsers;
    this.usersChart.update();

    // Actualizar estadísticas de usuarios
    const lastActive = data.activeUsers[data.activeUsers.length - 1] || 0;
    const lastNew = data.newUsers[data.newUsers.length - 1] || 0;
    const total = data.activeUsers.reduce((sum, v) => sum + v, 0);
    const growth = total > 0 ? (lastNew / total) * 100 : 0;
    const retention = total > 0 ? (lastActive / total) * 100 : 0;

    this.userStats = {
      totalUsers: total,
      newUsers: lastNew,
      growthPercentage: +growth.toFixed(1),
      retentionPercentage: +retention.toFixed(1),
      activeUsers: lastActive,
      activePercentage: +((lastActive / total) * 100).toFixed(1)
    };
  }

  private cleanupSubscriptions(): void {
    this.dataSubscriptions.forEach(sub => sub.unsubscribe());
    this.dataSubscriptions = [];
  }

  private destroyCharts(): void {
    if (this.combinedChart) {
      this.combinedChart.destroy();
      this.combinedChart = undefined;
    }
    if (this.usersChart) {
      this.usersChart.destroy();
      this.usersChart = undefined;
    }
  }

  // Métodos públicos (se mantienen igual)
  toggleUserDropdown(): void {
    this.showUserDropdown = !this.showUserDropdown;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  applyFilter(): void {
    this.isLoading = true;
    const filterSub = this.reportesService.applyFilter(
      this.selectedFilter,
      this.dateRange.start,
      this.dateRange.end
    ).subscribe({
      next: (filteredData) => {
        this.coursesData = filteredData.courses;
        this.milestones = filteredData.milestones;
        this.upcomingActivities = filteredData.activities;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error applying filter:', err);
        this.isLoading = false;
        this.modalService.showError('Error al aplicar el filtro.');
      }
    });

    this.dataSubscriptions.push(filterSub);
  }

  exportReport(): void {
    const reportData = {
      businessData: this.businessData,
      courseStats: this.courseStats,
      milestones: this.milestones,
      courses: this.coursesData,
      activities: this.upcomingActivities
    };

    this.exportService.exportToExcel(
      reportData, 
      `reporte_emprendimiento_${new Date().toISOString().split('T')[0]}`
    );
  }

  dateRangeChanged(): void {
    if (new Date(this.dateRange.start) > new Date(this.dateRange.end)) {
      this.modalService.showError('La fecha de inicio no puede ser mayor a la fecha final');
      return;
    }
    this.applyFilter();
  }

  contentTypeChanged(): void {
    this.isLoading = true;
    const contentSub = this.reportesService.getCoursesByType(
      this.selectedContentType
    ).subscribe({
      next: (courses) => {
        this.coursesData = courses;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error filtering by content type:', err);
        this.isLoading = false;
      }
    });

    this.dataSubscriptions.push(contentSub);
  }

  refreshData(): void {
    this.loadInitialData();
  }

  changeChartTimeRange(range: string): void {
    this.chartTimeRange = range;
    this.reportesService.getCombinedChartData(
      this.dateRange.start, 
      this.dateRange.end,
      this.chartTimeRange
    ).subscribe(data => {
      this.updateCombinedChart(data);
    });
  }

  updateUserChart(): void {
    this.reportesService.getUsersChartData(
      this.userChartTimeRange
    ).subscribe(data => {
      this.updateUsersChart(data);
    });
  }

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.coursesData = this.sortPipe.transform([...this.coursesData], this.sortColumn, this.sortDirection);
  }

  getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'completed': 'Completado',
      'in-progress': 'En Progreso',
      'scheduled': 'Programado'
    };
    return statusMap[status] || '';
  }

  viewActivityDetails(activity: Activity): void {
    this.modalService.openActivityDetails(activity);
  }

  openTrainingDetails(training: Training): void {
    this.router.navigate(['/capacitaciones', training.id]);
  }

  openSpeakerDetails(speaker: Speaker): void {
    this.modalService.openSpeakerDetails(speaker);
  }

  openMilestoneDetails(milestone: Milestone): void {
    this.modalService.openMilestoneDetails(milestone);
  }

  confirmAttendance(training: Training): void {
    const confirmSub = this.reportesService.confirmAttendance(training.id)
      .subscribe({
        next: () => {
          this.modalService.showSuccess('Asistencia confirmada con éxito');
          const activity = this.upcomingActivities.find(a => a.id === training.id);
          if (activity) {
            activity.confirmed = true;
          }
        },
        error: (err) => {
          console.error('Error confirming attendance:', err);
          this.modalService.showError('Error al confirmar asistencia');
        }
      });

    this.dataSubscriptions.push(confirmSub);
  }
}