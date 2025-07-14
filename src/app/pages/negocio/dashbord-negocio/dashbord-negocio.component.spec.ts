import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordNegocioComponent } from './dashbord-negocio.component';

describe('DashbordNegocioComponent', () => {
  let component: DashbordNegocioComponent;
  let fixture: ComponentFixture<DashbordNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordNegocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
