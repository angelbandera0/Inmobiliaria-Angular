import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListadoComponent } from './card-listado.component';

describe('CardListadoComponent', () => {
  let component: CardListadoComponent;
  let fixture: ComponentFixture<CardListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
