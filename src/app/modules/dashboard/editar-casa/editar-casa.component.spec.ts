import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCasaComponent } from './editar-casa.component';

describe('EditarCasaComponent', () => {
  let component: EditarCasaComponent;
  let fixture: ComponentFixture<EditarCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
