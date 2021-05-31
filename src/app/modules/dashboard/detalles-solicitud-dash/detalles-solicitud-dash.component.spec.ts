import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesSolicitudDashComponent } from './detalles-solicitud-dash.component';

describe('DetallesSolicitudDashComponent', () => {
  let component: DetallesSolicitudDashComponent;
  let fixture: ComponentFixture<DetallesSolicitudDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesSolicitudDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesSolicitudDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
