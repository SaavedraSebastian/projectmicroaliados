import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarNegocioComponent } from "../../../shared/components/sidebar-negocio/sidebar-negocio.component";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { StripHtmlPipe } from '../../../core/pipes/strip-html.pipe';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Attachment } from '../../../shared/models/attachment.model';
import { Email } from '../../../shared/models/email.model';
import { Contact } from '../../../shared/models/contact.model';
import { EmailTemplate } from '../../../shared/models/email-template.model';
import { ContactList } from '../../../shared/models/contact-list.model';
import { Campaign } from '../../../shared/models/campaign.model';
import { EmailTemplateOption } from '../../../shared/models/email-template-options.model';
import { InboxEmail } from '../../../shared/models/inbox-email.model';
import { SentEmail } from '../../../shared/models/send-email.model';

@Component({
  selector: 'app-email-marketing',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarNegocioComponent, NavbarComponent, StripHtmlPipe, TruncatePipe],
  templateUrl: './email-marketing.component.html',
  styleUrls: ['./email-marketing.component.css'],
  animations: [
    trigger('toastAnimation', [
      state('void', style({ transform: 'translateY(20px)', opacity: 0 })),
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition(':enter', [
        animate('200ms ease-out')
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class EmailMarketingComponent implements OnInit {
  @ViewChild('replyText') replyTextArea!: ElementRef;
  @ViewChild('composeBody') composeBodyArea!: ElementRef;

  // Application states
  currentView: 'inbox' | 'sent' | 'compose' | 'reports' | 'templates' | 'contacts' = 'inbox';
  currentFolder: 'inbox' | 'sent' = 'inbox';
  currentFilter: 'all' | 'read' | 'unread' | 'attachments' = 'all';
  searchTerm: string = '';
  contactSearchTerm: string = '';
  selectedContactList: string = 'all';
  
  // Pagination
  currentContactPage: number = 1;
  contactsPerPage: number = 10;
  public Math = Math;
  
  // Counters
  unreadCount: number = 3;
  sentCount: number = 1;
  contactsCount: number = 2400;
  newSubscribers7d: number = 42;
  unsubscribed7d: number = 8;
  
  // UI states
  showContactModal: boolean = false;
  editingContact: boolean = false;
  showEmailActions: boolean = false;
  
  // Toast notification
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'success';
  toastTimeout: any;
  
  // Email data
  emails = {
    inbox: [
      {
        id: 1,
        from: 'Ana Torres',
        email: 'ana.torres@empresa.com',
        subject: 'Propuesta de colaboración',
        body: `<p class="mb-4">Hola Carlos,</p>
        <p class="mb-4">Espero que estés teniendo una buena semana. Me pongo en contacto contigo para proponerte una colaboración entre nuestras empresas.</p>
        <p class="mb-4">Tras analizar tu negocio, creemos que hay una excelente oportunidad para crear una alianza estratégica que podría beneficiar a ambas partes. En concreto, nos gustaría:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Co-desarrollar un webinar para emprendedores</li>
          <li>Crear contenido conjunto para nuestras audiencias</li>
          <li>Ofrecer un descuento cruzado a nuestros clientes</li>
        </ul>
        <p class="mb-4">He adjuntado una propuesta detallada con los beneficios y alcance de la colaboración. Me encantaría conocer tu opinión y, si te parece bien, coordinar una breve llamada la próxima semana.</p>
        <p class="mb-4">Quedo atenta a tus comentarios.</p>
        <p class="mb-4">Saludos cordiales,</p>
        <p class="font-semibold">Ana Torres</p>
        <p class="text-sm text-gray-600">Directora de Alianzas Estratégicas</p>
        <p class="text-sm text-gray-600">Innovación Digital S.A.</p>`,
        date: '15 Sept 2023 10:45 AM',
        read: false,
        attachments: [
          { name: 'Propuesta-Colaboración.pdf', type: 'pdf', size: '2.4 MB' }
        ],
        icon: 'user',
        color: 'bg-blue-100',
        preview: 'Propuesta de colaboración estratégica entre nuestras empresas...'
      },
      {
        id: 2,
        from: 'Equipo de Marketing',
        email: 'marketing@empresa.com',
        subject: 'Resultados campaña Q3',
        body: `<p class="mb-4">Hola equipo,</p>
        <p class="mb-4">Adjunto los resultados de la última campaña de marketing del tercer trimestre. Estamos muy contentos con los resultados obtenidos.</p>
        <p class="mb-4">Destacamos:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Un incremento del 35% en leads cualificados</li>
          <li>Mejora del 22% en la tasa de conversión</li>
          <li>ROI de 4.8x, superando nuestras expectativas</li>
        </ul>
        <p class="mb-4">Estos resultados demuestran la efectividad de nuestra estrategia multicanal. Agradezco a todo el equipo por su esfuerzo.</p>
        <p class="mb-4">Saludos,</p>
        <p class="font-semibold">Equipo de Marketing</p>`,
        date: '14 Sept 2023 09:15 AM',
        read: true,
        attachments: [],
        icon: 'users',
        color: 'bg-green-100',
        preview: 'Resultados destacados de la campaña del tercer trimestre...'
      },
      {
        id: 3,
        from: 'Soporte MailConnect',
        email: 'soporte@mailconnect.com',
        subject: 'Nuevas funcionalidades disponibles',
        body: `<p class="mb-4">Estimado usuario,</p>
        <p class="mb-4">Nos complace informarte que hemos lanzado nuevas funcionalidades en nuestra plataforma que te ayudarán a optimizar tus campañas de email marketing:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Segmentación avanzada de audiencias</li>
          <li>Plantillas responsive mejoradas</li>
          <li>Integración con redes sociales</li>
          <li>Análisis predictivo de campañas</li>
        </ul>
        <p class="mb-4">Puedes acceder a estas nuevas funcionalidades desde tu panel de control. Hemos preparado una guía rápida para que comiences a utilizarlas.</p>
        <p class="mb-4">Si tienes alguna pregunta, no dudes en contactar con nuestro equipo de soporte.</p>
        <p class="mb-4">Atentamente,</p>
        <p class="font-semibold">Equipo de MailConnect</p>`,
        date: '12 Sept 2023 03:30 PM',
        read: false,
        attachments: [
          { name: 'Novedades-MC.pdf', type: 'pdf', size: '1.8 MB' },
          { name: 'Guia-Rapida.pdf', type: 'pdf', size: '3.2 MB' }
        ],
        icon: 'bullhorn',
        color: 'bg-yellow-100',
        preview: 'Nuevas funcionalidades disponibles en la plataforma...'
      }
    ] as InboxEmail[],
    sent: [
      {
        id: 1,
        to: 'ventas@proveedor.com',
        subject: 'Solicitud de cotización',
        body: `<p class="mb-4">Estimados,</p>
        <p class="mb-4">Estoy interesado en adquirir sus servicios para mi emprendimiento y me gustaría recibir una cotización detallada.</p>
        <p class="mb-4">Necesito los siguientes servicios:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Servicio de logística para envíos nacionales</li>
          <li>Almacenamiento de productos</li>
          <li>Gestión de inventario</li>
        </ul>
        <p class="mb-4">Por favor, incluyan en su cotización:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Precios por servicio</li>
          <li>Tiempos de entrega estimados</li>
          <li>Políticas de devolución</li>
        </ul>
        <p class="mb-4">Agradecería puedan enviarme esta información antes del viernes.</p>
        <p class="mb-4">Saludos cordiales,</p>
        <p class="font-semibold">Carlos Mendoza</p>
        <p class="text-sm text-gray-600">Emprendedor Digital</p>`,
        date: '10 Sept 2023 11:20 AM',
        attachments: [
          { name: 'Requisitos.pdf', type: 'pdf', size: '1.5 MB' }
        ],
        preview: 'Solicitud de cotización para servicios de logística...'
      }
    ] as SentEmail[],
    drafts: [] as Email[],
    templates: {
      promotional: {
        subject: '¡Oferta especial para ti!',
        body: `Estimado cliente,\n\nTenemos una oferta especial que no puedes dejar pasar. Por tiempo limitado, disfruta de un 20% de descuento en todos nuestros productos.\n\nEsta promoción es válida hasta el 30 de septiembre. Aprovecha ahora y mejora tu negocio con nuestras soluciones.\n\nVisita nuestro sitio web y usa el código: OFERTA20\n\nSaludos,\nEquipo de Ventas`
      },
      newsletter: {
        subject: 'Novedades de septiembre',
        body: `¡Hola!\n\nTe traemos las últimas novedades de este mes en nuestro boletín informativo.\n\nNuevos productos\nHemos lanzado 3 nuevas soluciones diseñadas para optimizar tu negocio. Conócelas en nuestra tienda online.\n\nPróximos eventos\nNo te pierdas nuestro webinar gratuito "Estrategias de marketing digital 2024" el próximo martes 26 de septiembre.\n\nConsejo del mes\nOptimiza tus campañas de email marketing segmentando tu audiencia. Esto puede aumentar tus tasas de apertura hasta un 35%.\n\nSaludos,\nEquipo de Contenidos`
      },
      welcome: {
        subject: '¡Bienvenido a nuestra comunidad!',
        body: `¡Hola y bienvenido!\n\nNos alegra tenerte como parte de nuestra comunidad de emprendedores. Estamos aquí para ayudarte a hacer crecer tu negocio.\n\nComo nuevo miembro, queremos ofrecerte:\n\n- Un 15% de descuento en tu primera compra (usa código: BIENVENIDO15)\n- Acceso a nuestra biblioteca de recursos gratuitos\n- Invitación exclusiva a nuestro próximo evento online\n\nSi tienes alguna pregunta, no dudes en responder a este correo. Nuestro equipo de soporte estará encantado de ayudarte.\n\nSaludos,\nEquipo de Bienvenida`
      }
    }
  };
  
  filters = [
    { key: 'all', label: 'Todos' },
    { key: 'read', label: 'Leídos' },
    { key: 'unread', label: 'No leídos' },
    { key: 'attachments', label: 'Con adjuntos' }
  ];

  emailStats = [
    { label: 'Tasa de apertura', value: '24.5%', trend: 'up', change: '+2.4%', icon: 'fa-envelope-open', bgColor: 'bg-blue-100' },
    { label: 'Tasa de clics', value: '8.2%', trend: 'down', change: '-0.8%', icon: 'fa-mouse-pointer', bgColor: 'bg-indigo-100' },
    { label: 'Rebotes', value: '1.3%', trend: 'down', change: '-0.2%', icon: 'fa-exclamation-triangle', bgColor: 'bg-green-100' },
    { label: 'Suscriptores', value: this.contactsCount.toLocaleString(), trend: 'up', change: '+12', icon: 'fa-users', bgColor: 'bg-yellow-100' }
  ];

  topCampaigns: Campaign[] = [
    { id: 1, title: 'Campaña Primavera', openRate: 45, clicks: 150, date: '15 May 2025', recipients: 1200, clickRate: 12.5, conversionRate: 8.2 },
    { id: 2, title: 'Promoción Verano', openRate: 52, clicks: 300, date: '10 Jun 2025', recipients: 1500, clickRate: 20.0, conversionRate: 12.3 },
    { id: 3, title: 'Newsletter Agosto', openRate: 35, clicks: 100, date: '01 Aug 2025', recipients: 2000, clickRate: 5.0, conversionRate: 3.5 }
  ];

  recentCampaigns = [
    { name: 'Otoño 2023', subject: 'Nueva colección de productos', date: 'Hace 3 días', openRate: 42, clickRate: 15, icon: 'fa-bullhorn', bgColor: 'bg-purple-100' },
    { name: 'Webinar Sept', subject: 'Invitación exclusiva a webinar', date: 'Hace 1 semana', openRate: 38, clickRate: 22, icon: 'fa-chalkboard-teacher', bgColor: 'bg-blue-100' },
    { name: 'Promo Back2School', subject: 'Descuentos para el regreso a clases', date: 'Hace 2 semanas', openRate: 51, clickRate: 18, icon: 'fa-tag', bgColor: 'bg-green-100' }
  ];

  contactLists: ContactList[] = [
    { id: 'newsletter', name: 'Newsletter', count: 1200 },
    { id: 'clients', name: 'Clientes', count: 850 },
    { id: 'prospects', name: 'Prospectos', count: 350 },
    { id: 'partners', name: 'Socios', count: 120 },
    { id: 'employees', name: 'Empleados', count: 85 }
  ];

  filteredContacts: Contact[] = [
    {
      name: 'Ana Torres',
      email: 'ana.torres@empresa.com',
      company: 'Innovación Digital S.A.',
      phone: '+34 600 123 456',
      lists: ['newsletter', 'clients'],
      status: 'active'
    },
    {
      name: 'Carlos Mendoza',
      email: 'carlos@mimail.com',
      company: 'Emprendedor Digital',
      phone: '+34 699 987 654',
      lists: ['newsletter', 'prospects'],
      status: 'active'
    },
    {
      name: 'María González',
      email: 'maria.gonzalez@otraempresa.com',
      company: 'Marketing Solutions',
      phone: '+34 622 555 123',
      lists: ['clients', 'partners'],
      status: 'active'
    },
    {
      name: 'Juan Pérez',
      email: 'juan.perez@gmail.com',
      lists: ['newsletter'],
      status: 'pending'
    },
    {
      name: 'Laura Fernández',
      email: 'lfernandez@consultoria.com',
      company: 'Consultoría Estratégica',
      phone: '+34 677 111 222',
      lists: ['clients', 'partners', 'newsletter'],
      status: 'active'
    },
    {
      name: 'Roberto Sánchez',
      email: 'roberto.sanchez@empresa.es',
      lists: ['prospects'],
      status: 'unsubscribed'
    }
  ];

  savedTemplates: EmailTemplate[] = [
    {
      id: 1,
      name: 'Promoción Verano',
      title: 'Lanzamiento Promoción Verano',
      description:'Plantilla para campañas de marketing en temporada de verano.',
      category: 'marketing',
      icon: 'sun',
      bgColor: '#FFEB3B',
      updatedAt: new Date('2025-06-15')
    },
    {
      id: 2,
      name: 'Newsletter Mensual',
      title: 'Resumen Mensual de Noticias',
      description: 'Plantilla usada para enviar actualizaciones mensuales a los suscriptores.',
      category: 'newsletter',
      icon: 'mail',
      bgColor: '#4CAF50',
      updatedAt: new Date('2025-07-01')
    },
    {
      id: 3,
      name: 'Confirmación Compra',
      title: 'Confirmación de Pedido',
      description: 'Correo automático que confirma la compra realizada por el cliente.',
      category: 'transactional',
      icon: 'check-circle',
      bgColor: '#2196F3',
      updatedAt: new Date('2025-05-20')
    },
    {
      id: 4,
      name: 'Recordatorio Pago',
      title: 'Aviso de Pago Pendiente',
      description: 'Recordatorio amigable para que el cliente realice un pago pendiente.',
      category: 'transactional',
      icon: 'alert-circle',
      bgColor: '#FFC107',
      updatedAt: new Date('2025-07-10')
    },
    {
      id: 5,
      name: 'Oferta Black Friday',
      title: 'Descuentos Black Friday',
      description: 'Promoción especial con descuentos exclusivos por Black Friday.',
      category: 'marketing',
      icon: 'tag',
      bgColor: '#F44336',
      updatedAt: new Date('2025-06-30')
    }
  ];

  emailTemplates: EmailTemplateOption[] = [
    {
      key: 'promotional',
      title: 'Promocional',
      description: 'Para ofertas y promociones',
      icon: 'fa-bullhorn text-blue-600',
      bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50'
    },
    {
      key: 'newsletter',
      title: 'Newsletter',
      description: 'Actualizaciones regulares',
      icon: 'fa-newspaper text-green-600',
      bgColor: 'bg-gradient-to-r from-green-50 to-teal-50'
    },
    {
      key: 'welcome',
      title: 'Bienvenida',
      description: 'Para nuevos suscriptores',
      icon: 'fa-user-check text-yellow-600',
      bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50'
    }
  ];

  newEmail = {
    to: '',
    subject: '',
    body: ''
  };

  newContact = {
    name: '',
    email: '',
    lists: [] as string[],
    status: 'active' as 'active' | 'pending' | 'unsubscribed'
  };

  replyToAll: boolean = false;
  selectedEmail: Email | null = null;
  filteredEmails: Email[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filterEmails();
    this.updateCounts();
  }

  // Main methods
  updateCounts(): void {
    this.unreadCount = this.emails.inbox.filter(email => !email.read).length;
    this.sentCount = this.emails.sent.length;
    this.contactsCount = this.filteredContacts.length;
  }

  changeTab(tab: 'inbox' | 'sent' | 'compose' | 'reports' | 'templates' | 'contacts'): void {
    this.currentView = tab;
    
    if (tab === 'inbox' || tab === 'sent') {
      this.currentFolder = tab;
      this.filterEmails();
      
      if (this.filteredEmails.length > 0) {
        this.selectEmail(this.filteredEmails[0]);
      } else {
        this.selectedEmail = null;
      }
    } else if (tab === 'compose') {
      this.selectedEmail = null;
      this.resetNewEmail();
    }
  }

  filterEmails(): void {
    let emails = [...this.emails[this.currentFolder]];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();

      emails = emails.filter(email => {
        const subjectMatch = email.subject.toLowerCase().includes(term);
        const bodyMatch = email.body.toLowerCase().includes(term);
        const previewMatch = email.preview?.toLowerCase().includes(term) ?? false;

        // Handle both inbox and sent emails
        const senderOrRecipientMatch =
  this.currentFolder === 'inbox'
    ? email.from?.toLowerCase().includes(term) === true ||
      email.email?.toLowerCase().includes(term) === true
    : email.to?.toLowerCase().includes(term) === true;

        return subjectMatch || bodyMatch || previewMatch || senderOrRecipientMatch;
      });
    }

    // Only apply read/unread filters to inbox
    if (this.currentFolder === 'inbox') {
      switch (this.currentFilter) {
        case 'read':
          emails = emails.filter(email => 'read' in email && email.read === true);
          break;
        case 'unread':
          emails = emails.filter(email => 'read' in email && email.read === false);
          break;
        case 'attachments':
          emails = emails.filter(email => email.attachments?.length > 0);
          break;
      }
    } else {
      // For sent folder, only apply attachments filter
      if (this.currentFilter === 'attachments') {
        emails = emails.filter(email => email.attachments?.length > 0);
      }
    }

    this.filteredEmails = emails as Email[];
  }

  applyFilter(filter: string): void {
    if (filter === 'all' || filter === 'read' || filter === 'unread' || filter === 'attachments') {
      this.currentFilter = filter;
      this.filterEmails();
    }
  }

  selectEmail(email: Email): void {
    this.selectedEmail = { ...email };
    
    if (this.currentFolder === 'inbox' && 'read' in email && !email.read) {
      const index = this.emails.inbox.findIndex(e => e.id === email.id);
      if (index !== -1) {
        this.emails.inbox[index].read = true;
        this.updateCounts();
        this.filterEmails();
      }
    }
  }

  // Email management methods
  sendComposedEmail(): void {
    if (!this.newEmail.to || !this.newEmail.subject || !this.newEmail.body) {
      this.showNotification('Por favor, completa todos los campos', 'error');
      return;
    }
    
    if (!this.validateEmail(this.newEmail.to)) {
      this.showNotification('Por favor, introduce una dirección de correo válida', 'error');
      return;
    }
    
    const newEmail: SentEmail = {
      id: this.emails.sent.length + 1,
      to: this.newEmail.to,
      subject: this.newEmail.subject,
      body: this.newEmail.body.replace(/\n/g, '<br>'),
      date: new Date().toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      attachments: [],
      preview: this.newEmail.body.substring(0, 70) + '...',
      type: 'sent'
    };
    
    this.emails.sent.unshift(newEmail);
    this.sentCount = this.emails.sent.length;
    
    this.showNotification('¡Correo enviado con éxito!', 'success');
    
    setTimeout(() => {
      this.changeTab('sent');
      this.selectEmail(newEmail);
    }, 500);
  }

  replyEmail(): void {
    this.replyToAll = false;
    this.focusReply();
  }

  sendReply(replyText: string): void {
    if (!replyText) {
      this.showNotification('Por favor, escribe tu respuesta', 'error');
      return;
    }
    
    if (!this.selectedEmail) return;

    const recipients = this.replyToAll 
      ? ('email' in this.selectedEmail ? this.selectedEmail.email : this.selectedEmail.to) || 'desconocido@correo.com' + ', equipo@empresa.com'
      : ('email' in this.selectedEmail ? this.selectedEmail.email : this.selectedEmail.to) || 'desconocido@correo.com';
    
    const newEmail: SentEmail = {
      id: this.emails.sent.length + 1,
      to: recipients,
      subject: 'Re: ' + this.selectedEmail.subject,
      body: `<p class="mb-4">${replyText.replace(/\n/g, '<br>')}</p>
             <div class="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
               <p>--- Mensaje original ---</p>
               <p><strong>De:</strong> ${this.currentFolder === 'inbox' ? 'from' in this.selectedEmail ? this.selectedEmail.from : '' : 'Tú'}</p>
               <p><strong>Fecha:</strong> ${this.selectedEmail.date}</p>
               <p><strong>Asunto:</strong> ${this.selectedEmail.subject}</p>
               <p>${this.selectedEmail.body.substring(0, 100)}...</p>
             </div>`,
      date: new Date().toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      attachments: [],
      preview: replyText.substring(0, 70) + '...',
      type: 'sent'
    };
    
    this.emails.sent.unshift(newEmail);
    this.sentCount = this.emails.sent.length;
    
    this.showNotification('¡Respuesta enviada!', 'success');
    this.replyToAll = false;
    
    setTimeout(() => {
      this.changeTab('sent');
      this.selectEmail(newEmail);
    }, 500);
  }

  replyAll(): void {
    this.replyToAll = true;
    this.focusReply();
    this.showNotification('Preparando respuesta para todos...', 'info');
  }

  forwardEmail(): void {
    if (!this.selectedEmail) return;

    this.changeTab('compose');
    this.newEmail = {
      to: '',
      subject: `Fw: ${this.selectedEmail.subject}`,
      body: `---------- Mensaje reenviado ----------\nDe: ${this.currentFolder === 'inbox' ? 'from' in this.selectedEmail ? this.selectedEmail.from : '' : 'Yo'}\nFecha: ${this.selectedEmail.date}\nAsunto: ${this.selectedEmail.subject}\n\n${this.selectedEmail.body.replace(/<[^>]*>/g, '')}`
    };
    this.showNotification('Preparando reenvío...', 'info');
  }

  deleteEmail(): void {
    if (!this.selectedEmail) return;

    const index = this.emails[this.currentFolder].findIndex(e => e.id === this.selectedEmail?.id);
    if (index !== -1) {
      this.emails[this.currentFolder].splice(index, 1);
      this.showNotification('Correo eliminado', 'success');
      
      if (this.currentFolder === 'inbox') {
        this.updateCounts();
      } else {
        this.sentCount = this.emails.sent.length;
      }
      
      this.filterEmails();
      
      if (this.filteredEmails.length > 0) {
        this.selectEmail(this.filteredEmails[Math.min(index, this.filteredEmails.length - 1)]);
      } else {
        this.selectedEmail = null;
      }
    }
  }

  downloadAttachment(attachment: Attachment): void {
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,' + btoa('Contenido simulado del archivo ' + attachment.name);
    link.download = attachment.name;
    link.click();
    this.showNotification(`Descargando ${attachment.name}...`, 'info');
  }

  applyTemplate(type: 'promotional' | 'newsletter' | 'welcome'): void {
    const template = this.emails.templates[type];
    this.newEmail.subject = template.subject;
    this.newEmail.body = template.body;
    this.showNotification(`Plantilla "${type}" aplicada`, 'success');
  }

  formatText(format: 'bold' | 'italic' | 'link'): void {
    const textarea = this.composeBodyArea?.nativeElement || this.replyTextArea?.nativeElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let newText = '';
    
    switch(format) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `_${selectedText}_`;
        break;
      case 'link':
        newText = `[${selectedText}](url)`;
        break;
    }
    
    textarea.value = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
    
    setTimeout(() => {
      textarea.selectionStart = start;
      textarea.selectionEnd = start + newText.length;
      textarea.focus();
    }, 0);
    
    this.showNotification(`Formato ${format} aplicado`, 'info');
  }

  saveDraft(): void {
    if (this.newEmail.subject || this.newEmail.body) {
      this.showNotification('Correo guardado en borradores', 'success');
      this.changeTab('inbox');
    } else {
      this.showNotification('No hay contenido para guardar', 'error');
    }
  }

  resetNewEmail(): void {
    this.newEmail = {
      to: '',
      subject: '',
      body: ''
    };
  }

  // Contact methods
  filterContacts(): void {
    // Implementación de filtrado
    this.showNotification('Filtrando contactos...', 'info');
  }

  createNewContact(): void {
    this.editingContact = false;
    this.newContact = { name: '', email: '', lists: [], status: 'active' };
    this.showContactModal = true;
  }

  editContact(contact: Contact): void {
    this.editingContact = true;
    this.newContact = { ...contact };
    this.showContactModal = true;
  }

  saveContact(): void {
    if (!this.newContact.name || !this.newContact.email) {
      this.showNotification('Nombre y email son requeridos', 'error');
      return;
    }

    if (this.editingContact) {
      const index = this.filteredContacts.findIndex(c => c.email === this.newContact.email);
      if (index !== -1) {
        this.filteredContacts[index] = { ...this.newContact };
      }
    } else {
      this.filteredContacts.push({ ...this.newContact });
    }

    this.contactsCount = this.filteredContacts.length;
    this.showContactModal = false;
    this.showNotification(
      `Contacto ${this.editingContact ? 'actualizado' : 'guardado'} correctamente`,
      'success'
    );
  }

  cancelContact(): void {
    this.showContactModal = false;
    this.showNotification('Operación cancelada', 'info');
  }

  deleteContact(contact: Contact): void {
    const index = this.filteredContacts.findIndex(c => c.email === contact.email);
    if (index !== -1) {
      this.filteredContacts.splice(index, 1);
      this.contactsCount = this.filteredContacts.length;
      this.showNotification('Contacto eliminado', 'success');
    }
  }

  exportContacts(): void {
    this.showNotification('Exportando lista de contactos...', 'info');
  }

  // Template methods
  createNewTemplate(): void {
    this.showNotification('Creando nueva plantilla...', 'info');
  }

  useTemplate(template: EmailTemplate): void {
    this.changeTab('compose');
    this.showNotification(`Usando plantilla "${template.name}"`, 'success');
  }

  editTemplate(template: EmailTemplate): void {
    this.showNotification(`Editando plantilla "${template.name}"`, 'info');
  }

  // Pagination methods
  getContactPages(): number[] {
    const totalPages = Math.ceil(this.filteredContacts.length / this.contactsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  prevContactPage(): void {
    if (this.currentContactPage > 1) {
      this.currentContactPage--;
    }
  }

  nextContactPage(): void {
    if (this.currentContactPage * this.contactsPerPage < this.filteredContacts.length) {
      this.currentContactPage++;
    }
  }

  goToContactPage(page: number): void {
    this.currentContactPage = page;
  }

  // Helper methods
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  hideToast(): void {
    this.showToast = false;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }

  focusReply(): void {
    setTimeout(() => {
      if (this.replyTextArea) {
        this.replyTextArea.nativeElement.focus();
      }
    }, 0);
  }

  toggleEmailActions(): void {
    this.showEmailActions = !this.showEmailActions;
  }

  discardReply(): void {
    if (this.replyTextArea) {
      this.replyTextArea.nativeElement.value = '';
    }
    this.showNotification('Respuesta descartada', 'info');
  }

  discardCompose(): void {
    this.resetNewEmail();
    this.showNotification('Correo descartado', 'info');
  }

  navigateTo(section: string): void {
    switch(section) {
      case 'inbox':
        this.changeTab('inbox');
        break;
      case 'sent':
        this.changeTab('sent');
        break;
      case 'compose':
        this.changeTab('compose');
        break;
      case 'templates':
        this.changeTab('templates');
        break;
      case 'contacts':
        this.changeTab('contacts');
        break;
      case 'analytics':
        this.changeTab('reports');
        break;
      case 'settings':
        this.showNotification('Accediendo a configuración...', 'info');
        break;
      case 'help':
        this.showNotification('Accediendo a ayuda...', 'info');
        break;
    }
  }
}