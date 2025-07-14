import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarAsesoriaComponent } from './agendar-asesoria.component';

describe('AgendarAsesoriaComponent', () => {
  let component: AgendarAsesoriaComponent;
  let fixture: ComponentFixture<AgendarAsesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarAsesoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarAsesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
