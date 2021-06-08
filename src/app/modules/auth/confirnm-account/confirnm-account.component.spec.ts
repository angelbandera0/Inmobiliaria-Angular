import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirnmAccountComponent } from './confirnm-account.component';

describe('ConfirnmAccountComponent', () => {
  let component: ConfirnmAccountComponent;
  let fixture: ComponentFixture<ConfirnmAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirnmAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirnmAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
