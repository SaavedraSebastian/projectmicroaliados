import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMessageComponent } from './sidebar-message.component';

describe('SidebarMessageComponent', () => {
  let component: SidebarMessageComponent;
  let fixture: ComponentFixture<SidebarMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
