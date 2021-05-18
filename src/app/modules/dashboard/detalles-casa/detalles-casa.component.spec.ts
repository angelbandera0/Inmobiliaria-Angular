import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCasaComponent } from './detalles-casa.component';

describe('DetallesCasaComponent', () => {
  let component: DetallesCasaComponent;
  let fixture: ComponentFixture<DetallesCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesCasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
