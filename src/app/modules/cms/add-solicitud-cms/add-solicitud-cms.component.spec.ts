import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolicitudCmsComponent } from './add-solicitud-cms.component';

describe('AddSolicitudCmsComponent', () => {
  let component: AddSolicitudCmsComponent;
  let fixture: ComponentFixture<AddSolicitudCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSolicitudCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSolicitudCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
