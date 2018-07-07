import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffertPageComponent } from './offert-page.component';

describe('OffertPageComponent', () => {
  let component: OffertPageComponent;
  let fixture: ComponentFixture<OffertPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffertPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
