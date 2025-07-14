import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesoriasListStoreComponent } from './asesorias-list-store.component';

describe('AsesoriasListStoreComponent', () => {
  let component: AsesoriasListStoreComponent;
  let fixture: ComponentFixture<AsesoriasListStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsesoriasListStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsesoriasListStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
