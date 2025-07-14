import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesoriaCampusComponent } from './asesoria-campus.component';

describe('AsesoriaCampusComponent', () => {
  let component: AsesoriaCampusComponent;
  let fixture: ComponentFixture<AsesoriaCampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsesoriaCampusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsesoriaCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
