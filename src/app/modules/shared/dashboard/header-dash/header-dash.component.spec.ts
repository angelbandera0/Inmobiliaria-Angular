import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDashComponent } from './header-dash.component';

describe('HeaderDashComponent', () => {
  let component: HeaderDashComponent;
  let fixture: ComponentFixture<HeaderDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
