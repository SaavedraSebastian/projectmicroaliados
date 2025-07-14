import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAsesoriasComponent } from './list-asesorias.component';

describe('ListAsesoriasComponent', () => {
  let component: ListAsesoriasComponent;
  let fixture: ComponentFixture<ListAsesoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAsesoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAsesoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
