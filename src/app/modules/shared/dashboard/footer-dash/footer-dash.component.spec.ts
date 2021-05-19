import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDashComponent } from './footer-dash.component';

describe('FooterDashComponent', () => {
  let component: FooterDashComponent;
  let fixture: ComponentFixture<FooterDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
