import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesUserComponent } from './detalles-user.component';

describe('DetallesUserComponent', () => {
  let component: DetallesUserComponent;
  let fixture: ComponentFixture<DetallesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
