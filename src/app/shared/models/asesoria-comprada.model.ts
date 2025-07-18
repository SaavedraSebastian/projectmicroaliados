import { Asesoria } from "./asesoria.model";

export interface AsesoriaComprada extends Asesoria {
  estado: 'Agendada' | 'Completada' | 'Cancelada';
  fechaCompra: Date;
  tipoPaquete: string;
  horasContratadas: number;
  horasUtilizadas: number;
  precioTotal: number;
  sesiones: number;
  beneficios: string[];
  duracion: number;
  paquete: string;
  banner?: string;
  sesionAgendada?: {
    fecha: Date;
    horaInicio: string;
    horaFin: string;
    modalidad: string;
    plataforma?: string; 
  };
  categoria: string; 
  valoraciones: number; 
  modalidades: string[]; 
  planId: string;
  planNombre: string;
  hitoId: string;
  hitoNombre: string;
  progresoPlan: number;
  numeroSesion: number;
  totalSesiones: number;
  tags: string[];
  nombreAsesoria: string;
}