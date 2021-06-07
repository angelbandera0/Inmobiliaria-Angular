import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCitaCmsComponent } from './detalles-cita-cms.component';

describe('DetallesCitaCmsComponent', () => {
  let component: DetallesCitaCmsComponent;
  let fixture: ComponentFixture<DetallesCitaCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesCitaCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCitaCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
