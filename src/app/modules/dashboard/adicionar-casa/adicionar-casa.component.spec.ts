import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarCasaComponent } from './adicionar-casa.component';

describe('AdicionarCasaComponent', () => {
  let component: AdicionarCasaComponent;
  let fixture: ComponentFixture<AdicionarCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarCasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
