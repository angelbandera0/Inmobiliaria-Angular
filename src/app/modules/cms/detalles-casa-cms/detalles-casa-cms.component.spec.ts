import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCasaCmsComponent } from './detalles-casa-cms.component';

describe('DetallesCasaCmsComponent', () => {
  let component: DetallesCasaCmsComponent;
  let fixture: ComponentFixture<DetallesCasaCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesCasaCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCasaCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
