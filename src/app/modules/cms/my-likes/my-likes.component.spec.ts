import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLikesComponent } from './my-likes.component';

describe('MyLikesComponent', () => {
  let component: MyLikesComponent;
  let fixture: ComponentFixture<MyLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLikesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
