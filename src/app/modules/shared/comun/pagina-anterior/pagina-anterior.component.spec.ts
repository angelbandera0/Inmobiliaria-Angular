import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAnteriorComponent } from './pagina-anterior.component';

describe('PaginaAnteriorComponent', () => {
  let component: PaginaAnteriorComponent;
  let fixture: ComponentFixture<PaginaAnteriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaAnteriorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaAnteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
