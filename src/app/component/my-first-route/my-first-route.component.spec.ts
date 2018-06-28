import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstRouteComponent } from './my-first-route.component';

describe('MyFirstRouteComponent', () => {
  let component: MyFirstRouteComponent;
  let fixture: ComponentFixture<MyFirstRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFirstRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFirstRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
