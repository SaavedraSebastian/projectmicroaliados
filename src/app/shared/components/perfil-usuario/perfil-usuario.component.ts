import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarNegocioComponent } from "../sidebar-negocio/sidebar-negocio.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarNegocioComponent, NavbarComponent],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  showEditModal = false;
  profileImage = 'assets/images/default-profile.jpg';
  coverImage = 'assets/images/default-cover.jpg';

  // Datos de registro del usuario
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

  // Perfil profesional complementario
  userProfile = {
    title: '',
    location: '',
    about: '',
    interests: [] as string[],
    skills: [] as string[],
    experiences: [] as any[],
    education: {
      institution: '',
      degree: '',
      period: '',
      description: ''
    },
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: ''
    }
  };

  // Formulario de edición
  editForm = {
    // Datos personales
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    
    // Datos profesionales
    empresa: '',
    rubro: '',
    title: '',
    location: '',
    about: '',
    interests: '',
    skills: '',
    
    // Educación
    educationInstitution: '',
    educationDegree: '',
    educationPeriod: '',
    educationDescription: '',
    
    // Redes sociales
    facebook: '',
    twitter: '',
    linkedin: ''
  };

  constructor() { }

  ngOnInit(): void {
    this.loadUserData();
  }

  // Carga los datos combinados del registro y perfil
  loadUserData(): void {
    // Cargar datos de registro desde localStorage
    const savedRegistro = localStorage.getItem('userRegisterData');
    if (savedRegistro) {
      this.datosRegistro = JSON.parse(savedRegistro);
    }

    // Cargar datos de perfil profesional desde localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.userProfile = JSON.parse(savedProfile);
    }

    // Cargar imágenes
    const savedProfileImage = localStorage.getItem('profileImage');
    const savedCoverImage = localStorage.getItem('coverImage');
    
    if (savedProfileImage) this.profileImage = savedProfileImage;
    if (savedCoverImage) this.coverImage = savedCoverImage;
  }

  openEditModal(): void {
    this.editForm = {
      nombre: this.datosRegistro.nombre,
      apellidos: this.datosRegistro.apellidos,
      correo: this.datosRegistro.correo,
      telefono: this.datosRegistro.telefono,
      empresa: this.datosRegistro.empresa,
      rubro: this.datosRegistro.rubro,
      title: this.userProfile.title,
      location: this.userProfile.location,
      about: this.userProfile.about,
      interests: this.userProfile.interests.join(', '),
      skills: this.userProfile.skills.join(', '),
      educationInstitution: this.userProfile.education.institution,
      educationDegree: this.userProfile.education.degree,
      educationPeriod: this.userProfile.education.period,
      educationDescription: this.userProfile.education.description,
      facebook: this.userProfile.socialLinks.facebook,
      twitter: this.userProfile.socialLinks.twitter,
      linkedin: this.userProfile.socialLinks.linkedin
    };
    this.showEditModal = true;
  }

  saveProfile(): void {

    this.datosRegistro = {
      ...this.datosRegistro,
      nombre: this.editForm.nombre,
      apellidos: this.editForm.apellidos,
      correo: this.editForm.correo,
      telefono: this.editForm.telefono,
      empresa: this.editForm.empresa,
      rubro: this.editForm.rubro
    };


    this.userProfile = {
      title: this.editForm.title,
      location: this.editForm.location,
      about: this.editForm.about,
      interests: this.editForm.interests.split(',').map(item => item.trim()).filter(item => item),
      skills: this.editForm.skills.split(',').map(item => item.trim()).filter(item => item),
      experiences: this.userProfile.experiences, 
      education: {
        institution: this.editForm.educationInstitution,
        degree: this.editForm.educationDegree,
        period: this.editForm.educationPeriod,
        description: this.editForm.educationDescription
      },
      socialLinks: {
        facebook: this.editForm.facebook,
        twitter: this.editForm.twitter,
        linkedin: this.editForm.linkedin
      }
    };

    localStorage.setItem('userRegisterData', JSON.stringify(this.datosRegistro));
    localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    
    this.showEditModal = false;
  }

  onFileSelected(event: Event, type: 'profile' | 'cover'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          if (type === 'profile') {
            this.profileImage = e.target.result as string;
            localStorage.setItem('profileImage', this.profileImage);
          } else {
            this.coverImage = e.target.result as string;
            localStorage.setItem('coverImage', this.coverImage);
          }
        }
      };

      reader.readAsDataURL(file);
    }
  }
  getSocialUsername(url: string): string {
    if (!url) return '';
    
    try {
      const parts = url.split('/');
      return parts[parts.length - 1] || '';
    } catch {
      return '';
    }
  }

  get profileCompletion(): number {
    let completedFields = 0;
    const totalFields = 12; 
    
    if (this.datosRegistro.nombre) completedFields++;
    if (this.datosRegistro.apellidos) completedFields++;
    if (this.datosRegistro.correo) completedFields++;
    if (this.datosRegistro.telefono) completedFields++;
    if (this.datosRegistro.empresa) completedFields++;
    if (this.datosRegistro.rubro) completedFields++;
    if (this.userProfile.title) completedFields++;
    if (this.userProfile.about) completedFields++;
    if (this.userProfile.skills.length > 0) completedFields++;
 
    if (this.userProfile.education.institution) completedFields++;
    if (this.userProfile.education.degree) completedFields++;

    if (this.profileImage !== 'assets/images/default-profile.jpg') completedFields++;
    
    return Math.round((completedFields / totalFields) * 100);
  }


  connectSocial(platform: 'facebook' | 'twitter' | 'linkedin'): void {
    const url = prompt(`Ingresa tu URL de ${platform}`);
    if (url) {
      this.userProfile.socialLinks[platform] = url;
      this.saveProfile();
    }
  }
}