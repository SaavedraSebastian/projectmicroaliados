import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsesoriaService } from '../core/services/asesoria.service';

@NgModule({
  imports: [CommonModule],
  providers: [AsesoriaService],
})
export class SharedModule {}
