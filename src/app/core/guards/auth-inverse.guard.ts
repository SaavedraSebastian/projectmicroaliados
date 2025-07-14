import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInverseGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // lógica
    return true;
  }
}
