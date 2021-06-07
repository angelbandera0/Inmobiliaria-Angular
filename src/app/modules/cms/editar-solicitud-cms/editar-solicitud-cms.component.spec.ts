import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSolicitudCmsComponent } from './editar-solicitud-cms.component';

describe('EditarSolicitudCmsComponent', () => {
  let component: EditarSolicitudCmsComponent;
  let fixture: ComponentFixture<EditarSolicitudCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarSolicitudCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSolicitudCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
