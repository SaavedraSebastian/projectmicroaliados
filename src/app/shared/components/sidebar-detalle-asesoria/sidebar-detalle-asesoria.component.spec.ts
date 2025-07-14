import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDetalleAsesoriaComponent } from './sidebar-detalle-asesoria.component';

describe('SidebarDetalleAsesoriaComponent', () => {
  let component: SidebarDetalleAsesoriaComponent;
  let fixture: ComponentFixture<SidebarDetalleAsesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarDetalleAsesoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarDetalleAsesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
