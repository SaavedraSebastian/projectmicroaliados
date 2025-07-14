export interface User {
  nombre: string;
  apellidos: string;
  correo: string;
  empresa: string;
  rubro: string;
  telefono: string;
  profileProgress: number;
  fullName?:string;
  plan?:string;
}