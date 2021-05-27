import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSolicitudesDashComponent } from './listado-solicitudes-dash.component';

describe('ListadoSolicitudesDashComponent', () => {
  let component: ListadoSolicitudesDashComponent;
  let fixture: ComponentFixture<ListadoSolicitudesDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoSolicitudesDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoSolicitudesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
