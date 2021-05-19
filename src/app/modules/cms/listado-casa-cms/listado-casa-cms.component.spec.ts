import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCasaCmsComponent } from './listado-casa-cms.component';

describe('ListadoCasaCmsComponent', () => {
  let component: ListadoCasaCmsComponent;
  let fixture: ComponentFixture<ListadoCasaCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCasaCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCasaCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
