import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNegocioComponent } from './sidebar-negocio.component';

describe('SidebarNegocioComponent', () => {
  let component: SidebarNegocioComponent;
  let fixture: ComponentFixture<SidebarNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNegocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
