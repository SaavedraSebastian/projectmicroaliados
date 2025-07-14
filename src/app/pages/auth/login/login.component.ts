import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    const { email, password } = this.loginForm.value;

    const datosGuardados = localStorage.getItem('registroUsuario');
    if (datosGuardados) {
      const usuario = JSON.parse(datosGuardados);

      if (usuario.correo === email && usuario.contrasena === password) {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/dashboard/empleado']);
      } else {
        this.loading = false;
        this.errorMessage = 'Correo o contraseña inválidos';
      }
    } else {
      this.loading = false;
      this.errorMessage = 'No se encontró ninguna cuenta registrada';
    }
  }
}
