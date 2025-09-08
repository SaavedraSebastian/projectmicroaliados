import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { SidebarNegocioComponent } from "../../../shared/components/sidebar-negocio/sidebar-negocio.component";

@Component({
  selector: 'app-campania',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, SidebarNegocioComponent],
  templateUrl: './campania.component.html',
  styleUrls: ['./campania.component.css']
})
export class CampaniaComponent implements OnInit {
  // Referencias y estado inicial
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  editorActive = true;
  currentTemplate = 'summer';
  selectedCampaign: string | null = null;
  uploadedImage: any = null;
  currentImageTarget: 'logo' | 'promo' | null = null;
  campaignName = '';
  currentYear = new Date().getFullYear();
  isDragging = false;
  
  // Notificaciones
  notification = {
    show: false,
    type: 'info', // 'info' | 'success' | 'error' | 'warning'
    icon: 'info-circle',
    title: '',
    message: ''
  };

  // Modales
  modals = {
    newCampaignModal: false,
    imageUploadModal: false
  };

  // Tipos de campaña
  campaignTypes = [
    { id: 'regular', name: 'Regular', icon: 'envelope', description: 'Email estándar' },
    { id: 'automation', name: 'Automatización', icon: 'robot', description: 'Serie automatizada' },
    { id: 'abtesting', name: 'A/B Testing', icon: 'code-compare', description: 'Prueba diferentes versiones' }
  ];
  selectedCampaignType = '';
  imageSettings = {
    alignment: 'center',
    size: 'medium'
  };

  // Filtros de campaña
  campaignFilters = [
    { id: 'all', label: 'Todas' },
    { id: 'sent', label: 'Enviadas' },
    { id: 'draft', label: 'Borradores' },
    { id: 'scheduled', label: 'Programadas' }
  ];
  activeFilter = 'all';

  // Configuración del editor
  editorTabs = [
    { id: 'content', label: 'Contenido', icon: 'edit' },
    { id: 'settings', label: 'Configuración', icon: 'cog' },
    { id: 'testing', label: 'Pruebas', icon: 'flask' }
  ];
  activeEditorTab = 'content';

  // Formato de texto
  showColorPicker = false;
  showHighlightPicker = false;
  selectedTextColor = '#000000';
  selectedHighlightColor = '#FFFF00';
  selectedSecondaryColor = '#4F46E5';
  textColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];
  highlightColors = ['#FFFF00', '#FFC0CB', '#90EE90', '#ADD8E6', '#FFA07A', '#FFD700', '#98FB98', '#E6E6FA'];

  // Configuración de campaña
  emailSubject = '';
  senderName = '';
  senderEmail = '';
  replyToEmail = '';
  selectedSegment = '';
  scheduledDate = '';
  timezone = '-05:00';
  showAdvancedSettings = false;
  trackOpens = true;
  trackClicks = true;
  enableUTM = false;
  utmCampaign = '';
  utmMedium = 'email';
  utmSource = 'newsletter';
  utmContent = '';

  // Pruebas A/B
  enableABTesting = false;
  abTestType = 'subject';
  abTestSampleSize = '20';
  abTestDuration = '24';
  abTestMetric = 'open';
  testEmails = '';

  // Estadísticas
  stats = [
    { label: 'Suscriptores', value: '5,248', icon: 'users', iconColor: 'text-blue-600', bgColor: 'bg-blue-100', borderColor: 'border-blue-500', trend: 'up', change: '12%' },
    { label: 'Tasa apertura', value: '22.4%', icon: 'envelope-open', iconColor: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-500', trend: 'up', change: '3%' },
    { label: 'Tasa de clics', value: '3.1%', icon: 'mouse-pointer', iconColor: 'text-purple-600', bgColor: 'bg-purple-100', borderColor: 'border-purple-500', trend: 'down', change: '1.2%' },
    { label: 'Rebotes', value: '1.8%', icon: 'exclamation-triangle', iconColor: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-500', trend: 'down', change: '0.5%' }
  ];

  // Datos simulados
  campaigns = [
    {
      id: '1',
      title: 'Oferta de Verano 2026',
      date: '15 Enero 2026',
      recipients: 2548,
      status: 'sent',
      icon: 'sun',
      iconColor: 'orange',
      openRate: 24.5,
      clickRate: 3.2,
      performance: 78,
      lastModified: '14 Julio 2026, 15:30',
      deliveredRate: 98.5,
      uniqueOpens: 2150,
      openTrend: 'up',
      openChange: 5.2,
      clickTrend: 'down',
      clickChange: 1.1,
      bounceRate: 1.5,
      hardBounces: 12,
      bounceTrend: 'down',
      bounceChange: 0.3,
      totalClicks:'4',
      content: {
        logo: 'https://via.placeholder.com/200x50?text=Mi+Marca',
        promo: 'https://via.placeholder.com/600x300?text=Oferta+Verano',
        title: '¡Descuentos de Verano!',
        greeting: 'Hola [Nombre],',
        mainText: 'Disfruta de nuestras increíbles ofertas de verano con descuentos de hasta el 40%.',
        buttonText: 'Ver Ofertas',
        feature1Title: 'Nueva Colección',
        feature1Text: 'Descubre nuestros nuevos productos exclusivos.',
        feature2Title: 'Envío Gratis',
        feature2Text: 'En compras superiores a $50 con nuestro código VERANO2026.'
      }
    },
    {
      id: '2',
      title: 'Newsletter Mensual',
      date: 'Programada: 25 Jun 2025',
      recipients: 3120,
      status: 'scheduled',
      icon: 'newspaper',
      iconColor: 'blue',
      lastModified: '20 Jun 2025, 10:15',
      content: {
        logo: 'https://via.placeholder.com/200x50?text=Mi+Marca',
        promo: 'https://via.placeholder.com/600x300?text=Newsletter',
        title: 'Novedades de Junio',
        greeting: 'Hola [Nombre],',
        mainText: 'Te traemos las últimas novedades y tendencias para este mes.',
        buttonText: 'Descubrir Más',
        feature1Title: 'Tendencias',
        feature1Text: 'Lo más popular este mes según nuestros clientes.',
        feature2Title: 'Próximos Eventos',
        feature2Text: 'No te pierdas nuestros eventos exclusivos.'
      }
    },
    {
      id: '3',
      title: 'Nuevos Productos',
      date: 'Últ. modificación: 18 Jun 2025',
      status: 'draft',
      icon: 'pen',
      iconColor: 'purple',
      lastModified: '18 Jun 2025, 09:45',
      content: {
        logo: 'https://via.placeholder.com/200x50?text=Mi+Marca',
        promo: 'https://via.placeholder.com/600x300?text=Nuevos+Productos',
        title: '¡Nuevos Productos Disponibles!',
        greeting: 'Hola [Nombre],',
        mainText: 'Hemos añadido nuevos productos a nuestro catálogo que te encantarán.',
        buttonText: 'Ver Productos',
        feature1Title: 'Destacados',
        feature1Text: 'Los productos más innovadores de esta temporada.',
        feature2Title: 'Ofertas Exclusivas',
        feature2Text: 'Descuentos especiales para nuestros suscriptores.'
      }
    }
  ];

  filteredCampaigns = this.campaigns;

  segments = [
    { id: '1', title: 'Clientes frecuentes', contacts: 1245 },
    { id: '2', title: 'Nuevos suscriptores', contacts: 832 },
    { id: '3', title: 'Clientes inactivos', contacts: 567 }
  ];

  templates = [
    { id: 'summer', title: 'Verano', category: 'Marketing', premium: false, gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
    { id: 'newsletter', title: 'Newsletter', category: 'Newsletter', premium: false, gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
    { id: 'elegant', title: 'Elegante', category: 'General', premium: true, gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' }
  ];

  topLinks = [
    { url: 'https://miempresa.com/ofertas', clicks: 342, percentage: 42 },
    { url: 'https://miempresa.com/nuevos-productos', clicks: 215, percentage: 26 },
    { url: 'https://miempresa.com/contacto', clicks: 98, percentage: 12 }
  ];

  devices = [
    { name: 'Móvil', percentage: 58, icon: 'mobile' },
    { name: 'Escritorio', percentage: 32, icon: 'desktop' },
    { name: 'Tablet', percentage: 10, icon: 'tablet' }
  ];

  showQuickActions = false;
  showCampaignActionsDropdown = false;

  ngOnInit() {
    this.filterCampaigns();
    this.updateSelectedColor();
  }

  toggleAdvancedSettings() {
    this.showAdvancedSettings = !this.showAdvancedSettings;
  }
  showNotification(title: string, message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') {
    const icons = {
      info: 'info-circle',
      success: 'check-circle',
      error: 'exclamation-circle',
      warning: 'exclamation-triangle'
    };
    
    
    this.notification = {
      show: true,
      type,
      icon: icons[type],
      title,
      message
    };
    
    setTimeout(() => {
      this.dismissNotification();
    }, 5000);
  }

  dismissNotification() {
    this.notification.show = false;
  }

  createList(type: 'ol' | 'ul'){
    document.execCommand(type === 'ol'? 'insertOrderedList' : 'insertUnorderedList', false, '');
  }

  outdent(){
    document.execCommand('outdent',false,'');
  }
  indent(){
    document.execCommand('indent', false,'');
  }

  openModal(modalId: keyof typeof this.modals) {
    this.modals[modalId] = true;
  }

  closeModal(modalId: keyof typeof this.modals) {
    this.modals[modalId] = false;
    
    if (modalId === 'imageUploadModal') {
      this.resetImageUpload();
    }
  }

  // Funciones de campaña
  getSelectedCampaign() {
    return this.campaigns.find(c => c.id === this.selectedCampaign);
  }

  selectCampaign(campaignId: string) {
    this.selectedCampaign = campaignId;
    const campaign = this.getSelectedCampaign();
    if (campaign) {
      this.showNotification('Campaña seleccionada', `Has seleccionado "${campaign.title}"`, 'info');
    }
  }

  filterCampaigns() {
    if (this.activeFilter === 'all') {
      this.filteredCampaigns = this.campaigns;
    } else {
      this.filteredCampaigns = this.campaigns.filter(c => c.status === this.activeFilter);
    }
  }

  setFilter(filterId: string) {
    this.activeFilter = filterId;
    this.filterCampaigns();
  }

  createNewCampaign() {
    if (!this.campaignName || !this.selectedCampaignType) {
      this.showNotification('Datos incompletos', 'Por favor, completa todos los campos requeridos', 'error');
      return;
    }

    const newCampaign = {
      id: (this.campaigns.length + 1).toString(),
      title: this.campaignName,
      date: 'Borrador',
      recipients: 0,
      status: 'draft',
      icon: this.getCampaignTypeIcon(this.selectedCampaignType),
      iconColor: this.getRandomColor(),
      lastModified: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      content: {
        logo: 'https://via.placeholder.com/200x50?text=Mi+Marca',
        promo: 'https://via.placeholder.com/600x300?text=Nueva+Campaña',
        title: 'Título de la campaña',
        greeting: 'Hola [Nombre],',
        mainText: 'Contenido principal de tu campaña de email marketing.',
        buttonText: 'Acción Principal',
        feature1Title: 'Característica 1',
        feature1Text: 'Descripción de la primera característica.',
        feature2Title: 'Característica 2',
        feature2Text: 'Descripción de la segunda característica.'
      }
    };

    this.campaigns.push(newCampaign);
    this.filterCampaigns();
    this.closeModal('newCampaignModal');
    this.showNotification('Campaña creada', `"${this.campaignName}" ha sido creada exitosamente`, 'success');
    this.campaignName = '';
    this.selectedCampaignType = '';
    this.selectCampaign(newCampaign.id);
  }

  getCampaignTypeIcon(type: string): string {
    const campaignType = this.campaignTypes.find(t => t.id === type);
    return campaignType ? campaignType.icon : 'envelope';
  }

  getRandomColor(): string {
    const colors = ['blue', 'green', 'purple', 'orange', 'red', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  selectCampaignType(type: string) {
    this.selectedCampaignType = type;
  }

  selectTemplate(templateId: string) {
    this.currentTemplate = templateId;
    this.updateSelectedColor();
  }

  updateSelectedColor(): void {
    const selected = this.templates.find(t => t.id === this.currentTemplate);
    if (selected) {
      
      const gradientColors = selected.gradient.match(/#[a-fA-F0-9]{6}/g);
      if (gradientColors && gradientColors.length > 0) {
        this.selectedSecondaryColor = gradientColors[1] || gradientColors[0];
      }
    }
  }


  setActiveEditorTab(tabId: string) {
    this.activeEditorTab = tabId;
  }

  formatText(format: string) {
    document.execCommand(format, false);
  }

  changeAlignment(align: string) {
    document.execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1), false);
  }

  changeTextColor(color: string) {
    this.selectedTextColor = color;
    document.execCommand('foreColor', false, color);
  }

  changeHighlightColor(color: string) {
    this.selectedHighlightColor = color;
    document.execCommand('hiliteColor', false, color);
  }

  clearFormatting() {
    document.execCommand('removeFormat', false);
  }

  insertLink() {
    const url = prompt('Ingresa la URL del enlace:', 'https://ejemplo.com');
    if (url) {
      document.execCommand('createLink', false, url);
    }
  }

  addButton() {
    const buttonText = prompt('Texto del botón:', 'Ver más');
    if (buttonText) {
      const buttonHtml = `<a href="#" style="display: inline-block; background-color: ${this.selectedSecondaryColor}; color: white; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; margin: 15px 0;">${buttonText}</a>`;
      document.execCommand('insertHTML', false, buttonHtml);
    }
  }

  insertDivider() {
    const dividerHtml = `<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">`;
    document.execCommand('insertHTML', false, dividerHtml);
  }

  toggleCodeView() {
    this.showNotification('Funcionalidad', 'Vista HTML no implementada en esta demo', 'info');
  }

  undo() {
    document.execCommand('undo', false);
  }

  redo() {
    document.execCommand('redo', false);
  }

  // Funciones para subir imágenes
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.onFileSelected({ target: { files: event.dataTransfer.files } });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      this.showNotification('Error', 'El archivo es demasiado grande (máximo 10MB)', 'error');
      return;
    }

    // Validar tipo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      this.showNotification('Error', 'Formato de archivo no válido. Usa JPG, PNG, GIF o SVG.', 'error');
      return;
    }

    // Leer y previsualizar imagen
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        this.uploadedImage = {
          src: e.target.result,
          name: file.name,
          size: this.formatFileSize(file.size),
          dimensions: `${img.width}×${img.height}px`,
          file: file
        };
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  }

  applyUploadedImage() {
    if (!this.uploadedImage || !this.currentImageTarget) {
      this.showNotification('Error', 'Primero debes seleccionar una imagen y un destino', 'error');
      return;
    }

    const campaign = this.getSelectedCampaign();
    if (campaign && campaign.content) {
      if (this.currentImageTarget === 'logo') {
        campaign.content.logo = this.uploadedImage.src;
      } else {
        campaign.content.promo = this.uploadedImage.src;
      }
      
      this.closeModal('imageUploadModal');
      this.showNotification(
        'Imagen actualizada',
        this.currentImageTarget === 'logo' 
          ? 'Logo actualizado correctamente' 
          : 'Imagen promocional actualizada correctamente', 
        'success'
      );
    }
  }

  removeUploadedImage() {
    this.uploadedImage = null;
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  resetImageUpload() {
    this.uploadedImage = null;
    this.currentImageTarget = null;
    this.isDragging = false;
    this.removeUploadedImage();
  }

  prepareImageUpload(target: 'logo' | 'promo') {
    this.currentImageTarget = target;
    this.openModal('imageUploadModal');
  }

  // Funciones de acciones
  toggleQuickActions() {
    this.showQuickActions = !this.showQuickActions;
  }

  toggleCampaignActions() {
    this.showCampaignActionsDropdown = !this.showCampaignActionsDropdown;
  }

  showCampaignActions(campaignId: string, event: Event) {
    event.stopPropagation();
    this.selectCampaign(campaignId);
    this.toggleCampaignActions();
  }

  // Funciones de estado
  getStatusClass(status?: string): string {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusLabel(status?: string): string {
    switch (status) {
      case 'sent': return 'Enviada';
      case 'scheduled': return 'Programada';
      case 'draft': return 'Borrador';
      default: return 'Desconocido';
    }
  }

  getIconColorClass(color?: string): string {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'red': return 'bg-red-100 text-red-600';
      case 'pink': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  getPerformanceClass(performance: number): string {
    if (performance > 75) return 'text-green-600';
    if (performance > 50) return 'text-yellow-600';
    return 'text-red-600';
  }

  // Funciones de campaña
  saveDraft() {
    const campaign = this.getSelectedCampaign();
    if (campaign) {
      campaign.lastModified = new Date().toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      this.showNotification('Borrador guardado', 'Los cambios se han guardado correctamente', 'success');
    }
  }

  previewCampaign() {
    this.showNotification('Vista previa', 'Esta funcionalidad abriría una vista previa de la campaña', 'info');
  }

  sendTestEmail() {
    if (!this.testEmails) {
      this.showNotification('Error', 'Por favor ingresa al menos una dirección de email', 'error');
      return;
    }

    const emails = this.testEmails.split(',').map(e => e.trim()).filter(e => e.length > 0);
    this.showNotification(
      'Prueba enviada', 
      `Correo de prueba enviado a ${emails.length} dirección(es): ${emails.join(', ')}`, 
      'success'
    );
  }

  scheduleCampaign() {
    const campaign = this.getSelectedCampaign();
    if (campaign) {
      if (!this.scheduledDate) {
        this.showNotification('Error', 'Por favor selecciona una fecha de envío', 'error');
        return;
      }

      campaign.status = 'scheduled';
      campaign.date = `Programada: ${new Date(this.scheduledDate).toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`;
      
      this.showNotification(
        'Campaña programada', 
        `"${campaign.title}" se enviará el ${campaign.date.replace('Programada: ', '')}`,
        'success'
      );
    }
  }

  sendCampaign() {
    const campaign = this.getSelectedCampaign();
    if (campaign) {
      if (campaign.status === 'sent') {
        this.showNotification('Error', 'Esta campaña ya ha sido enviada', 'error');
        return;
      }

      campaign.status = 'sent';
      campaign.date = new Date().toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      campaign.recipients = Math.floor(Math.random() * 5000) + 1000;
      campaign.openRate = parseFloat((Math.random() * 15 + 15).toFixed(1)); // 15-30%
      campaign.clickRate = parseFloat((Math.random() * 5 + 2).toFixed(1)); // 2-7%
      campaign.performance = Math.floor(Math.random() * 40) + 60; // 60-100%
      campaign.deliveredRate = 98.5;
      campaign.uniqueOpens = Math.floor(campaign.recipients * (campaign.openRate / 100));
      campaign.openTrend = Math.random() > 0.3 ? 'up' : 'down';
      campaign.openChange = parseFloat((Math.random() * 5 + 1).toFixed(1));
      campaign.clickTrend = Math.random() > 0.5 ? 'up' : 'down';
      campaign.clickChange = parseFloat((Math.random() * 3 + 1).toFixed(1));
      campaign.bounceRate = parseFloat((Math.random() * 2).toFixed(1));
      campaign.hardBounces = Math.floor(campaign.recipients * (campaign.bounceRate / 100 * 0.3));
      campaign.bounceTrend = Math.random() > 0.7 ? 'up' : 'down';
      campaign.bounceChange = parseFloat((Math.random() * 1).toFixed(1));
      
      this.showNotification(
        'Campaña enviada', 
        `"${campaign.title}" ha sido enviada a ${campaign.recipients} destinatarios`,
        'success'
      );
    }
  }

  continueCampaign(campaignId: string) {
    this.selectCampaign(campaignId);
    this.showNotification('Continuar edición', 'Puedes continuar editando tu campaña', 'info');
  }

  editScheduledCampaign(campaignId: string) {
    this.selectCampaign(campaignId);
    this.showNotification('Editar programación', 'Puedes modificar la programación de esta campaña', 'info');
  }
}