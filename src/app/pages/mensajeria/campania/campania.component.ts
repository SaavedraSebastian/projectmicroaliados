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
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  editorActive = false;
  currentTemplate = 'summer';
  selectedCampaign = 1;
  uploadedImage: any = null;
  currentImageTarget: 'logo' | 'promo' | null = null;
  campaignName = '';
  currentYear = new Date().getFullYear();
  notification = {
    show: false,
    message: '',
    type: 'info'
  };
  
  // Datos simulados
  campaigns = [
    {
      id: 1,
      title: 'Oferta de Verano',
      status: 'sent',
      date: '15 Sept 2023',
      recipients: 2450,
      openRate: 24.5,
      clickRate: 5.8,
      icon: 'envelope',
      iconColor: 'blue',
      content: {
        logo: 'https://via.placeholder.com/200x50?text=Mi+Marca',
        promo: 'https://via.placeholder.com/600x300?text=Imagen+Promocional',
        title: '¡Descuentos de Verano!',
        greeting: 'Hola [Nombre],',
        mainText: 'Disfruta de nuestras increíbles ofertas de verano con descuentos de hasta el 40% en toda nuestra colección.',
        buttonText: 'Ver Ofertas',
        feature1Title: 'Nueva Colección',
        feature1Text: 'Descubre nuestros nuevos productos exclusivos para esta temporada.',
        feature2Title: 'Envío Gratis',
        feature2Text: 'En compras superiores a $50 con nuestro código VERANO2023.'
      }
    },
    {
      id: 2,
      title: 'Newsletter Septiembre',
      status: 'scheduled',
      date: 'Programada: 25 Sept 2023',
      recipients: 2450,
      icon: 'calendar-day',
      iconColor: 'orange',
      content: {
        logo: 'https://via.placeholder.com/200x50?text=Mi+Marca',
        promo: 'https://via.placeholder.com/600x300?text=Newsletter',
        title: 'Novedades de Septiembre',
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
      id: 3,
      title: 'Nuevos Productos',
      status: 'draft',
      date: 'Últ. modificación: 18 Sept 2023',
      icon: 'pen',
      iconColor: 'purple',
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

  segments = [
    {
      title: 'Clientes Activos',
      contacts: 1245,
      description: 'Últ. compra en 90 días',
      icon: 'users',
      iconColor: 'blue'
    },
    {
      title: 'Abandonaron Carrito',
      contacts: 342,
      description: 'Sin compra en 30 días',
      icon: 'cart-arrow-down',
      iconColor: 'green'
    },
    {
      title: 'Clientes VIP',
      contacts: 185,
      description: 'Compras > $500',
      icon: 'star',
      iconColor: 'purple'
    },
    {
      title: 'Inactivos',
      contacts: 584,
      description: 'Sin apertura en 180 días',
      icon: 'calendar-times',
      iconColor: 'orange'
    }
  ];

  templates = [
    {
      id: 'summer',
      title: 'Verano',
      gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      colors: {primary: '#f6d365', secondary: '#fda085'}
    },
    {
      id: 'newsletter',
      title: 'Newsletter',
      gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      colors: {primary: '#a1c4fd', secondary: '#c2e9fb'}
    },
    {
      id: 'elegant',
      title: 'Elegante',
      gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
      colors: {primary: '#d4fc79', secondary: '#96e6a1'}
    }
  ];

  selectedSecondaryColor: string = '#fda085';
  testEmailAddress: string = '';

  ngOnInit() {
    this.selectCampaign(1);
    this.updateSelectedColor();
  }

  getSelectedCampaign() {
    return this.campaigns.find(c => c.id === this.selectedCampaign);
  }

  updateSelectedColor(): void {
    const selected = this.templates.find(t => t.id === this.currentTemplate);
    this.selectedSecondaryColor = selected ? selected.colors.secondary : '#000000';
  }

  // Notification functions
  showNotification(message: string, type: 'info' | 'success' | 'error' = 'info') {
    this.notification = {
      show: true,
      message,
      type
    };
    
    setTimeout(() => {
      this.notification.show = false;
    }, 3000);
  }

  // Modal functions
  openModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
    }
    
    if (modalId === 'imageUploadModal') {
      this.resetImageUpload();
    }
  }

  // Campaign functions
  selectCampaign(campaignId: number) {
    this.selectedCampaign = campaignId;
    const selectedCampaign = this.campaigns.find(c => c.id === campaignId);
    if (selectedCampaign) {
      this.showNotification(`Campaña "${selectedCampaign.title}" seleccionada`, 'info');
    }
  }

  createNewCampaign() {
    if (!this.campaignName) {
      this.showNotification('Por favor, ingresa un nombre para la campaña', 'error');
      return;
    }

    // Crear nueva campaña
    const newCampaign = {
      id: this.campaigns.length + 1,
      title: this.campaignName,
      status: 'draft',
      date: 'Últ. modificación: ' + new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      icon: 'pen',
      iconColor: 'purple',
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
    this.closeModal('newCampaignModal');
    this.showNotification(`Campaña "${this.campaignName}" creada exitosamente`, 'success');
    this.campaignName = '';
    this.selectCampaign(newCampaign.id);
  }

  selectTemplate(templateId: string) {
    this.currentTemplate = templateId;
    this.updateSelectedColor();
  }

  // Editor functions
  toggleEditor() {
    this.editorActive = !this.editorActive;
    
    if (!this.editorActive) {
      // Guardar cambios cuando se desactiva el editor
      const campaign = this.getSelectedCampaign();
      if (campaign) {
        campaign.content.title = (document.getElementById('emailTitle') as HTMLElement).innerText;
        campaign.content.greeting = (document.getElementById('greetingText') as HTMLElement).innerText;
        campaign.content.mainText = (document.getElementById('mainText') as HTMLElement).innerText;
        campaign.content.buttonText = (document.getElementById('actionButton') as HTMLElement).innerText;
        campaign.content.feature1Title = (document.getElementById('feature1Title') as HTMLElement).innerText;
        campaign.content.feature1Text = (document.getElementById('feature1Text') as HTMLElement).innerText;
        campaign.content.feature2Title = (document.getElementById('feature2Title') as HTMLElement).innerText;
        campaign.content.feature2Text = (document.getElementById('feature2Text') as HTMLElement).innerText;
        
        campaign.date = 'Últ. modificación: ' + new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
      }
      this.showNotification('Cambios guardados correctamente', 'success');
    } else {
      this.showNotification('Modo edición activado. Haz clic en cualquier texto para editarlo.', 'info');
    }
  }

  formatText(format: string) {
    document.execCommand(format, false);
  }

  changeTextColor() {
    const color = prompt('Ingresa un color en formato HEX (ej: #3182ce):', '#3182ce');
    if (color) {
      document.execCommand('foreColor', false, color);
    }
  }

  changeAlignment(align: string) {
    document.execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1), false);
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

  // Image upload functions
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.showNotification('El archivo es demasiado grande (máximo 5MB)', 'error');
      return;
    }

    // Validar tipo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      this.showNotification('Formato de archivo no válido. Usa JPG, PNG o GIF.', 'error');
      return;
    }

    // Leer y previsualizar imagen
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedImage = {
        src: e.target.result,
        name: file.name,
        size: this.formatFileSize(file.size),
        file: file
      };
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
      this.showNotification('Primero debes seleccionar una imagen', 'error');
      return;
    }

    const campaign = this.getSelectedCampaign();
    if (campaign) {
      if (this.currentImageTarget === 'logo') {
        campaign.content.logo = this.uploadedImage.src;
      } else {
        campaign.content.promo = this.uploadedImage.src;
      }
      
      this.closeModal('imageUploadModal');
      this.showNotification(
        this.currentImageTarget === 'logo' 
          ? 'Logo actualizado correctamente' 
          : 'Imagen promocional actualizada correctamente', 
        'success'
      );
    }
  }

  resetImageUpload() {
    this.uploadedImage = null;
    this.currentImageTarget = null;
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  prepareImageUpload(target: 'logo' | 'promo') {
    if (!this.editorActive) return;
    this.currentImageTarget = target;
    this.openModal('imageUploadModal');
  }

  // Misc functions
  sendTestEmail() {
    this.testEmailAddress = prompt('Ingresa tu dirección de email para enviar la prueba:', 'tucorreo@ejemplo.com') || '';
    
    if (this.testEmailAddress) {
      // Simular envío de prueba
      setTimeout(() => {
        this.showNotification(`Correo de prueba enviado a ${this.testEmailAddress}`, 'success');
      }, 1500);
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-600';
      case 'scheduled': return 'bg-blue-100 text-blue-600';
      case 'draft': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  getIconColorClass(color: string): string {
    switch (color) {
      case 'blue': return 'bg-blue-100/50 text-blue-600';
      case 'orange': return 'bg-orange-100/50 text-orange-600';
      case 'purple': return 'bg-purple-100/50 text-purple-600';
      case 'green': return 'bg-green-100/50 text-green-600';
      default: return 'bg-gray-100/50 text-gray-600';
    }
  }

  // Función para simular el envío de la campaña
  sendCampaign() {
    const campaign = this.getSelectedCampaign();
    if (campaign) {
      campaign.status = 'sent';
      campaign.date = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
      campaign.openRate = Math.random() * 10 + 20; // 20-30%
      campaign.clickRate = Math.random() * 3 + 3; // 3-6%
      this.showNotification(`Campaña "${campaign.title}" enviada a ${campaign.recipients} destinatarios`, 'success');
    }
  }

  // Función para programar campaña
  scheduleCampaign() {
    const campaign = this.getSelectedCampaign();
    if (campaign) {
      const date = prompt('Ingresa la fecha de envío (DD/MM/AAAA):', 
                         new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES'));
      
      if (date) {
        campaign.status = 'scheduled';
        campaign.date = 'Programada: ' + date;
        this.showNotification(`Campaña "${campaign.title}" programada para ${date}`, 'success');
      }
    }
  }
}