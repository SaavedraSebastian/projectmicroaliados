import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { SidebarNegocioComponent } from "../../../shared/components/sidebar-negocio/sidebar-negocio.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asesoria-campus',
  standalone: true,
  imports: [NavbarComponent, SidebarNegocioComponent, CommonModule, FormsModule],
  templateUrl: './asesoria-campus.component.html',
  styleUrls: ['./asesoria-campus.component.css']
})
export class AsesoriaCampusComponent {
  // Datos de las asesorías
  asesorias = {
    title: "Estrategias de Crecimiento Empresarial",
    description: "Aprende a escalar tu negocio con metodologías probadas por expertos",
    progress: 65,
    completedSessions: 4,
    totalSessions: 7,
    currentSession: {
      id: 5,
      title: "Optimización de Procesos",
      module: "Módulo 2: Estrategias Operativas",
      duration: "60 minutos",
      description: `
        <p class="mb-4">En esta sesión trabajaremos en identificar áreas de mejora en tus procesos operativos para aumentar la eficiencia de tu negocio.</p>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 class="font-medium text-blue-800 mb-2">¿Qué lograrás en esta sesión?</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Identificar cuellos de botella en tus operaciones</li>
            <li>Implementar mejores prácticas de eficiencia</li>
            <li>Reducir costos operativos</li>
            <li>Automatizar procesos manuales</li>
          </ul>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h4 class="font-medium text-yellow-800 mb-2">Prepara para la sesión:</h4>
          <p>Trae documentación de tus procesos actuales y métricas de desempeño para analizar juntos.</p>
        </div>
      `,
      resources: [
        { 
          name: "Guía de Optimización de Procesos", 
          type: "pdf", 
          size: "2.1 MB",
          description: "Manual completo con metodologías de mejora continua"
        },
        { 
          name: "Checklist de Evaluación", 
          type: "docx", 
          size: "0.8 MB",
          description: "Plantilla editable para mapear tus procesos actuales"
        },
        { 
          name: "Casos de Éxito", 
          type: "zip", 
          size: "4.5 MB",
          description: "Ejemplos reales de empresas que optimizaron sus operaciones"
        },
        { 
          name: "Herramientas Recomendadas", 
          type: "link", 
          size: "Enlaces",
          description: "Software y recursos para automatización de procesos"
        }
      ],
      advisor: {
        name: "Roberto Mendoza",
        specialty: "Especialista en Eficiencia Operacional",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        bio: "Más de 10 años ayudando a empresas a optimizar sus procesos. Certificado en Lean Six Sigma Black Belt.",
        rating: 4.9,
        sessionsCompleted: 127
      },
      scheduledDate: "15 Nov 2023",
      scheduledTime: "10:00 AM - 11:00 AM",
      meetingLink: "https://meet.google.com/xyz-abc-def"
    }
  };

  // Módulos y sesiones
  modules = [
    {
      id: 1,
      title: "Fundamentos",
      expanded: true,
      sessions: [
        { 
          id: 1, 
          title: "Evaluación Inicial", 
          duration: "45 min", 
          completed: true,
          active: false,
          advisor: "María González"
        },
        { 
          id: 2, 
          title: "Análisis FODA", 
          duration: "60 min", 
          completed: true,
          active: false,
          advisor: "Juan Pérez"
        },
        { 
          id: 3, 
          title: "Definición de Objetivos", 
          duration: "60 min", 
          completed: true,
          active: false,
          advisor: "Luisa Fernández"
        }
      ]
    },
    {
      id: 2,
      title: "Estrategias Operativas",
      expanded: true,
      sessions: [
        { 
          id: 4, 
          title: "Crecimiento Digital", 
          duration: "60 min", 
          completed: true,
          active: false,
          advisor: "Laura Martínez"
        },
        { 
          id: 5, 
          title: "Optimización de Procesos", 
          duration: "60 min", 
          completed: false, 
          active: true,
          advisor: "Roberto Mendoza"
        },
        { 
          id: 6, 
          title: "Estrategias Financieras", 
          duration: "60 min", 
          completed: false,
          active: false,
          advisor: "Ana López"
        }
      ]
    },
    {
      id: 3,
      title: "Implementación",
      expanded: false,
      sessions: [
        { 
          id: 7, 
          title: "Plan de Acción Final", 
          duration: "45 min", 
          completed: false,
          active: false,
          advisor: "Carlos Ruiz"
        }
      ]
    }
  ];

  // Otras asesorías disponibles
  otherAdvisories = [
    { 
      title: "Asesoría Legal", 
      icon: "balance-scale", 
      color: "purple",
      modules: 4,
      hours: 6,
      duration: "6 horas",
      description: "Protege y formaliza tu negocio con asesoría legal especializada",
      rating: 4.8
    },
    { 
      title: "Asesoría Financiera", 
      icon: "chart-pie", 
      color: "green",
      modules: 5,
      hours: 8,
      duration: "8 horas",
      description: "Optimiza tus finanzas y planifica el crecimiento económico",
      rating: 4.9
    },
    { 
      title: "Asesoría en Ventas", 
      icon: "handshake", 
      color: "blue",
      modules: 3,
      hours: 5,
      duration: "5 horas",
      description: "Incrementa tus ventas con estrategias comprobadas",
      rating: 4.7
    }
  ];

  // Lista completa de asesorías para el modal
  allAdvisoriesList = [
    ...this.otherAdvisories,
    { 
      title: "Marketing Digital", 
      icon: "bullhorn", 
      color: "pink",
      modules: 6,
      hours: 10,
      duration: "10 horas",
      description: "Domina las estrategias digitales para promocionar tu negocio",
      rating: 4.8
    },
    { 
      title: "Recursos Humanos", 
      icon: "users", 
      color: "indigo",
      modules: 4,
      hours: 6,
      duration: "6 horas",
      description: "Aprende a gestionar y desarrollar tu equipo de trabajo",
      rating: 4.6
    },
    { 
      title: "Innovación y Producto", 
      icon: "lightbulb", 
      color: "yellow",
      modules: 5,
      hours: 7,
      duration: "7 horas",
      description: "Desarrolla productos y servicios innovadores para tu mercado",
      rating: 4.7
    }
  ];

  // Comentarios y preguntas
  comments = [
    {
      id: 1,
      user: "Andrea Sánchez",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      time: "Hace 3 horas",
      text: "¿Qué herramientas recomiendan para automatizar procesos en una pequeña empresa de servicios?",
      likes: 5,
      isAdvisor: false,
      liked: false,
      replies: [
        {
          id: 101,
          user: "Roberto Mendoza",
          avatar: "https://randomuser.me/api/portraits/men/42.jpg",
          time: "Hace 2 horas",
          text: "Para pequeñas empresas recomiendo empezar con Zapier para automatizaciones básicas entre aplicaciones. Luego, según el presupuesto, podríamos evaluar herramientas más específicas como Process Street o Kissflow.",
          isAdvisor: true
        }
      ]
    },
    {
      id: 2,
      user: "Diego Ramírez",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      time: "Ayer",
      text: "Comparto mi experiencia: implementamos las recomendaciones de la sesión pasada y ya vimos una reducción del 20% en tiempos de producción.",
      likes: 12,
      isAdvisor: false,
      liked: false,
      replies: []
    }
  ];

  // Estados de los modales
  modals = {
    advisory: false,
    share: false,
    resources: false,
    allAdvisories: false,
    schedule: false
  };

  // Datos para el modal de asesoría
  modalAdvisoryData = {
    title: "",
    description: "",
    modules: "",
    duration: "",
    advisor: "",
    rating: 0,
    color: "",
    icon: ""
  };

  // Comentarios
  newComment = "";
  replyingTo: any = null;
  replyContent = "";

  // Video
  videoPlaying = false;
  showVideoControls = false;
  videoProgress = 0;
  videoCurrentTime = 0;
  videoDuration = 3600; // 60 minutos en segundos

  // Notificación
  notification = {
    show: false,
    message: "",
    type: "success" as "success" | "error"
  };

  constructor() {
    // Simular progreso del video
    setInterval(() => {
      if (this.videoPlaying && this.videoCurrentTime < this.videoDuration) {
        this.videoCurrentTime += 1;
        this.videoProgress = (this.videoCurrentTime / this.videoDuration) * 100;
      }
    }, 1000);
  }

  // Métodos
  toggleModule(module: any) {
    module.expanded = !module.expanded;
  }

  selectSession(session: any) {
    if (session.completed || session.active) {
      // Desactivar todas las sesiones
      this.modules.forEach(m => {
        m.sessions.forEach(s => s.active = false);
      });
      
      // Activar la sesión seleccionada
      session.active = true;
      
      // Actualizar la sesión actual
      this.updateCurrentSession(session);
    }
  }

  updateCurrentSession(session: any) {
    this.asesorias.currentSession = {
      ...this.asesorias.currentSession,
      title: session.title,
      module: `Módulo ${this.getModuleForSession(session.id)?.id}: ${this.getModuleForSession(session.id)?.title}`,
      duration: session.duration,
      advisor: {
        name: session.advisor,
        specialty: "Especialista en el área",
        avatar: this.getAdvisorAvatar(session.advisor),
        rating: this.getAdvisorRating(session.advisor),
        bio: "",
        sessionsCompleted: 0
      }
    };
    
    // Reiniciar el video
    this.videoPlaying = false;
    this.videoCurrentTime = 0;
    this.videoProgress = 0;
  }

  getModuleForSession(sessionId: number): any {
    for (const module of this.modules) {
      if (module.sessions.some(s => s.id === sessionId)) {
        return module;
      }
    }
    return null;
  }

  getAdvisorAvatar(advisorName: string): string {
    // Simulación - en una app real esto vendría de una base de datos
    const advisors: {[key: string]: string} = {
      "Roberto Mendoza": "https://randomuser.me/api/portraits/men/42.jpg",
      "María González": "https://randomuser.me/api/portraits/women/44.jpg",
      "Juan Pérez": "https://randomuser.me/api/portraits/men/32.jpg",
      "Luisa Fernández": "https://randomuser.me/api/portraits/women/28.jpg",
      "Laura Martínez": "https://randomuser.me/api/portraits/women/65.jpg",
      "Ana López": "https://randomuser.me/api/portraits/women/33.jpg",
      "Carlos Ruiz": "https://randomuser.me/api/portraits/men/22.jpg"
    };
    return advisors[advisorName] || "https://randomuser.me/api/portraits/men/1.jpg";
  }

  getAdvisorRating(advisorName: string): number {
    // Simulación - en una app real esto vendría de una base de datos
    const ratings: {[key: string]: number} = {
      "Roberto Mendoza": 4.9,
      "María González": 4.8,
      "Juan Pérez": 4.7,
      "Luisa Fernández": 4.8,
      "Laura Martínez": 4.9,
      "Ana López": 4.8,
      "Carlos Ruiz": 4.7
    };
    return ratings[advisorName] || 4.5;
  }

  completeSession() {
    const currentModule = this.modules.find(m => 
      m.sessions.some(s => s.active)
    );
    
    if (currentModule) {
      const currentSession = currentModule.sessions.find(s => s.active);
      if (currentSession) {
        currentSession.completed = true;
        currentSession.active = false;
        this.asesorias.completedSessions++;
        this.asesorias.progress = Math.round((this.asesorias.completedSessions / this.asesorias.totalSessions) * 100);
        
        // Activar siguiente sesión
        const sessionIndex = currentModule.sessions.indexOf(currentSession);
        if (sessionIndex < currentModule.sessions.length - 1) {
          currentModule.sessions[sessionIndex + 1].active = true;
          this.updateCurrentSession(currentModule.sessions[sessionIndex + 1]);
        } else {
          const moduleIndex = this.modules.indexOf(currentModule);
          if (moduleIndex < this.modules.length - 1) {
            this.modules[moduleIndex + 1].sessions[0].active = true;
            this.updateCurrentSession(this.modules[moduleIndex + 1].sessions[0]);
          }
        }
        
        this.showNotification("¡Sesión completada con éxito!", "success");
      }
    }
  }

  toggleVideo() {
    this.videoPlaying = !this.videoPlaying;
    this.showVideoControls = true;
    
    if (!this.videoPlaying) {
      setTimeout(() => {
        this.showVideoControls = false;
      }, 2000);
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  getResourceIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'pdf': 'file-pdf',
      'docx': 'file-word',
      'xlsx': 'file-excel',
      'pptx': 'file-powerpoint',
      'zip': 'file-archive',
      'link': 'link'
    };
    return icons[type] || 'file';
  }

  getResourceColor(type: string): string {
    const colors: {[key: string]: string} = {
      'pdf': 'red',
      'docx': 'blue',
      'xlsx': 'green',
      'pptx': 'orange',
      'zip': 'purple',
      'link': 'indigo'
    };
    return colors[type] || 'gray';
  }

  downloadResource(name: string, type: string) {
    this.showNotification(`Descargando ${name} (${type})`, "success");
    // En una aplicación real, aquí se manejaría la descarga real del recurso
  }

  openAdvisoryModal(title: string) {
    const advisory = [...this.otherAdvisories, ...this.allAdvisoriesList].find(a => a.title === title);
    if (advisory) {
      this.modalAdvisoryData = {
        title: advisory.title,
        description: advisory.description,
        modules: advisory.modules.toString(),
        duration: advisory.duration,
        advisor: "Especialista en " + advisory.title.split(' ')[1],
        rating: advisory.rating,
        color: advisory.color,
        icon: advisory.icon
      };
      this.modals.advisory = true;
    }
  }

  openShareModal() {
    this.modals.share = true;
  }

  openAllAdvisoriesModal() {
    this.modals.allAdvisories = true;
  }

  closeModal(modalName: string) {
    this.modals[modalName as keyof typeof this.modals] = false;
  }

  copyShareLink() {
    navigator.clipboard.writeText("https://miemprendimiento.com/asesorias/estrategias-crecimiento/sesion-4");
    this.showNotification("Enlace copiado al portapapeles", "success");
    this.closeModal('share');
  }

  postComment() {
    if (this.newComment.trim()) {
      this.comments.unshift({
        id: this.comments.length + 1,
        user: "Tú",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        time: "Ahora",
        text: this.newComment,
        likes: 0,
        isAdvisor: false,
        liked: false,
        replies: []
      });
      this.newComment = "";
      this.showNotification("Pregunta publicada con éxito", "success");
    }
  }

  toggleLike(comment: any) {
    if (!comment.liked) {
      comment.likes++;
      comment.liked = true;
    } else {
      comment.likes--;
      comment.liked = false;
    }
  }

  startReply(comment: any) {
    this.replyingTo = comment;
    this.replyContent = `@${comment.user} `;
  }

  cancelReply() {
    this.replyingTo = null;
    this.replyContent = "";
  }

  postReply() {
    if (this.replyingTo && this.replyContent.trim()) {
      if (!this.replyingTo.replies) {
        this.replyingTo.replies = [];
      }
      
      this.replyingTo.replies.push({
        id: this.replyingTo.replies.length + 1,
        user: "Tú",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        time: "Ahora",
        text: this.replyContent,
        isAdvisor: false
      });
      
      this.replyContent = "";
      this.replyingTo = null;
      this.showNotification("Respuesta publicada", "success");
    }
  }

  getTotalComments(): number {
    let total = this.comments.length;
    this.comments.forEach(comment => {
      total += comment.replies?.length || 0;
    });
    return total;
  }

  showNotification(message: string, type: "success" | "error" = "success") {
    this.notification = {
      show: true,
      message,
      type
    };
    
    setTimeout(() => {
      this.notification.show = false;
    }, 5000);
  }
}