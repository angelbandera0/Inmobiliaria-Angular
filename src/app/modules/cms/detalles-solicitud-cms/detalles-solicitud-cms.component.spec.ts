import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesSolicitudCmsComponent } from './detalles-solicitud-cms.component';

describe('DetallesSolicitudCmsComponent', () => {
  let component: DetallesSolicitudCmsComponent;
  let fixture: ComponentFixture<DetallesSolicitudCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesSolicitudCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesSolicitudCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
