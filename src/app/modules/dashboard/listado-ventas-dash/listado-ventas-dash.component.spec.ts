import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoVentasDashComponent } from './listado-ventas-dash.component';

describe('ListadoVentasDashComponent', () => {
  let component: ListadoVentasDashComponent;
  let fixture: ComponentFixture<ListadoVentasDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoVentasDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoVentasDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
