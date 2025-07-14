import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  tieneEmpresa: boolean = false;
  registroCompleto: boolean = false;

  datosRegistro: any = {
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    empresa: '',
    rubro: '',
    idea: '',
    contrasena: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const datosGuardados = localStorage.getItem('registroUsuario');
    if (datosGuardados) {
      this.datosRegistro = JSON.parse(datosGuardados);
      this.registroCompleto = true;
      this.tieneEmpresa = this.datosRegistro.empresa ? true : false;
    }
  }

 guardarRegistro() {
  localStorage.setItem('registroUsuario', JSON.stringify(this.datosRegistro));
  this.registroCompleto = true;
  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 1500); 
}

  editarRegistro() {
    this.router.navigate(['/login']);
  }
}
