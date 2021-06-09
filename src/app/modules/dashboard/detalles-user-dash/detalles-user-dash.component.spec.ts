import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesUserDashComponent } from './detalles-user-dash.component';

describe('DetallesUserDashComponent', () => {
  let component: DetallesUserDashComponent;
  let fixture: ComponentFixture<DetallesUserDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesUserDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesUserDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
