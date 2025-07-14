import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private readonly USER_KEY = 'currentUser';

  constructor() {
    this.loadUser();
  }

  private loadUser(): void {
    const userData = localStorage.getItem(this.USER_KEY);
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  initializeUser(userData: any): void {
    const user: User = {
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      correo: userData.correo,
      empresa: userData.empresa,
      rubro: userData.rubro,
      telefono: userData.telefono,
      profileProgress: this.calculateProfileProgress(userData)
    };

    this.currentUser = user;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  updateProfile(updates: Partial<User>): void {
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updates };
      this.currentUser.profileProgress = this.calculateProfileProgress(this.currentUser);
      localStorage.setItem(this.USER_KEY, JSON.stringify(this.currentUser));
    }
  }

  // ✅ Ahora acepta un argumento de tipo User
  calculateProfileProgress(user: Partial<User>): number {
    let completedFields = 0;
    const requiredFields: (keyof User)[] = ['nombre', 'apellidos', 'correo', 'empresa', 'rubro', 'telefono'];

    requiredFields.forEach(field => {
      if (user[field] && user[field]!.toString().trim() !== '') {
        completedFields++;
      }
    });

    return Math.round((completedFields / requiredFields.length) * 100);
  }
}
