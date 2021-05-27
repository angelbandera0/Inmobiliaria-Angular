import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCitasDashComponent } from './listado-citas-dash.component';

describe('ListadoCitasDashComponent', () => {
  let component: ListadoCitasDashComponent;
  let fixture: ComponentFixture<ListadoCitasDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCitasDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCitasDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
