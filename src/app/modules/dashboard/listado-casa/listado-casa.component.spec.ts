import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCasaComponent } from './listado-casa.component';

describe('ListadoCasaComponent', () => {
  let component: ListadoCasaComponent;
  let fixture: ComponentFixture<ListadoCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
