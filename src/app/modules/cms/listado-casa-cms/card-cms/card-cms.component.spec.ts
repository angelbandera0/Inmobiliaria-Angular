import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCmsComponent } from './card-cms.component';

describe('CardCmsComponent', () => {
  let component: CardCmsComponent;
  let fixture: ComponentFixture<CardCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
