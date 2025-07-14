import { Component, signal } from '@angular/core';
import { Message } from '../../models/message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-message.component.html',
  styleUrls: ['./sidebar-message.component.css']
})
export class SidebarMessageComponent {
  messages = signal<Message[]>([
    {
      id: 1,
      name: 'Ana Torres',
      avatar: 'https://i.pravatar.cc/40?img=1',
      status: 'online',
      lastMessage: '¿Podemos revisar el presupuesto del proyecto?',
      time: '10:45 AM',
      unread: 2,
      hasAttachment: false,
      isRead: false,
      isActive: false,
      isNew: false
    },
    {
      id: 2,
      name: 'Equipo de Soporte',
      avatar: 'https://i.pravatar.cc/40?img=2',
      status: 'offline',
      lastMessage: 'Solución al problema de acceso...',
      time: 'Ayer',
      unread: 0,
      hasAttachment: false,
      isRead: true,
      isActive: false,
      isNew: false
    },
    {
      id: 3,
      name: 'Carlos Mendoza',
      avatar: 'https://i.pravatar.cc/40?img=3',
      status: 'online',
      lastMessage: 'Adjunto los documentos solicitados...',
      time: '15 Sept',
      unread: 0,
      hasAttachment: true,
      isRead: true,
      isActive: false,
      isNew: false
    },
    {
      id: 4,
      name: 'María Fernández',
      avatar: 'https://i.pravatar.cc/40?img=5',
      status: 'online',
      lastMessage: '¡Hola! ¿Estás disponible para una llamada?',
      time: 'Ahora',
      unread: 1,
      hasAttachment: false,
      isRead: false,
      isActive: false,
      isNew: true
    },
    {
      id: 5,
      name: 'Juan Pérez',
      avatar: 'https://i.pravatar.cc/40?img=6',
      status: 'typing',
      lastMessage: '',
      time: 'Escribiendo...',
      unread: 0,
      hasAttachment: false,
      isRead: true,
      isActive: false,
      isNew: false
    }
  ]);

  activeMessageId: number | null = null;

  setActiveMessage(id: number): void {
    this.activeMessageId = id;
    this.messages.update(messages => 
      messages.map(msg => ({
        ...msg,
        isActive: msg.id === id
      }))
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'offline': return 'bg-gray-300';
      case 'typing': return 'bg-green-400';
      default: return 'bg-gray-300';
    }
  }

  getBorderColor(index: number): string {
    const message = this.messages()[index];
    if (message.isActive) return 'border-blue-500 dark:border-blue-500';
    if (message.isNew) return 'border-blue-100 dark:border-blue-500/30';
    return 'border-gray-100 hover:border-gray-200 dark:border-gray-600 dark:hover:border-gray-500';
  }

  getBackgroundColor(message: Message): string {
    if (message.isActive) return 'bg-blue-50 dark:bg-blue-900/20';
    if (message.isNew) return 'bg-blue-50 dark:bg-blue-900/20';
    return 'bg-white dark:bg-gray-700';
  }
}