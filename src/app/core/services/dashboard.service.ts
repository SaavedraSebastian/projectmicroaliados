import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly STATS_KEY = 'dashboardStats';
  private readonly COURSES_KEY = 'userCourses';
  private readonly ANNOUNCEMENTS_KEY = 'announcements';
  private readonly GROUPS_KEY = 'userGroups';

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    if (!localStorage.getItem(this.STATS_KEY)) {
      const initialStats = {
        salesToday: 1245,
        visitorsToday: 1842,
        conversionRate: 3.2,
        newCustomers: 42,
        weeklySales: [1200, 1900, 1400, 1600, 1800, 1900, 2100]
      };
      localStorage.setItem(this.STATS_KEY, JSON.stringify(initialStats));
    }

    if (!localStorage.getItem(this.COURSES_KEY)) {
      const initialCourses = [
        { id: 1, title: 'Marketing Digital', progress: 45, lessonsCompleted: 4, totalLessons: 10, icon: 'chart-line', color: 'blue' },
        { id: 2, title: 'Finanzas Básicas', progress: 70, lessonsCompleted: 7, totalLessons: 10, icon: 'coins', color: 'green' },
        { id: 3, title: 'Ventas Online', progress: 20, lessonsCompleted: 2, totalLessons: 10, icon: 'store', color: 'purple' }
      ];
      localStorage.setItem(this.COURSES_KEY, JSON.stringify(initialCourses));
    }

    if (!localStorage.getItem(this.ANNOUNCEMENTS_KEY)) {
      const initialAnnouncements = [
        { 
          id: 1, 
          title: 'Actualización de Plataforma', 
          date: 'Hoy, 10:30 AM', 
          description: 'Hemos implementado nuevas funcionalidades en el panel de control. Revisa las mejoras en la sección de cursos.',
          status: 'Nuevo',
          icon: 'bullhorn',
          color: 'blue'
        },
        { 
          id: 2, 
          title: 'Webinar: Estrategias 2024', 
          date: '20 Sept 2023 - 15:00h', 
          description: 'Aprende las mejores técnicas para escalar tu negocio el próximo año con expertos en emprendimiento.',
          status: 'Próximo',
          icon: 'calendar-check',
          color: 'purple'
        }
      ];
      localStorage.setItem(this.ANNOUNCEMENTS_KEY, JSON.stringify(initialAnnouncements));
    }

    if (!localStorage.getItem(this.GROUPS_KEY)) {
      const initialGroups = [
        {
          id: 1,
          name: 'Emprendedores Tech',
          members: 245,
          activity: '2h',
          newMembers: 25,
          icon: 'users',
          gradient: ['purple', 'blue']
        },
        {
          id: 2,
          name: 'Innovación 2023',
          members: 150,
          activity: '5h',
          online: 15,
          icon: 'lightbulb',
          gradient: ['orange', 'yellow']
        }
      ];
      localStorage.setItem(this.GROUPS_KEY, JSON.stringify(initialGroups));
    }
  }

  getStats(): any {
    const stats = localStorage.getItem(this.STATS_KEY);
    return stats ? JSON.parse(stats) : null;
  }

  updateStats(updates: any): void {
    const currentStats = this.getStats();
    const updatedStats = { ...currentStats, ...updates };
    localStorage.setItem(this.STATS_KEY, JSON.stringify(updatedStats));
  }

  getCourses(): any[] {
    const courses = localStorage.getItem(this.COURSES_KEY);
    return courses ? JSON.parse(courses) : [];
  }

  updateCourseProgress(courseId: number, progress: number): void {
    const courses = this.getCourses();
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return { ...course, progress };
      }
      return course;
    });
    localStorage.setItem(this.COURSES_KEY, JSON.stringify(updatedCourses));
  }

  getAnnouncements(): any[] {
    const announcements = localStorage.getItem(this.ANNOUNCEMENTS_KEY);
    return announcements ? JSON.parse(announcements) : [];
  }

  getGroups(): any[] {
    const groups = localStorage.getItem(this.GROUPS_KEY);
    return groups ? JSON.parse(groups) : [];
  }

  generateRandomStats(): void {
    const stats = this.getStats();
    const updatedStats = {
      salesToday: Math.max(800, Math.round(stats.salesToday * (0.9 + Math.random() * 0.2))),
      visitorsToday: Math.max(1200, Math.round(stats.visitorsToday * (0.9 + Math.random() * 0.2))),
      conversionRate: Math.max(2.5, Math.min(4.5, stats.conversionRate * (0.95 + Math.random() * 0.1))),
      newCustomers: Math.max(30, Math.round(stats.newCustomers * (0.8 + Math.random() * 0.4)))
    };
    this.updateStats(updatedStats);
  }
}