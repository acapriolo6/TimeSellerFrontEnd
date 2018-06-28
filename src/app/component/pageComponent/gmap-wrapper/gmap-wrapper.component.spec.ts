import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GMapWrapperComponent } from './gmap-wrapper.component';

describe('GMapWrapperComponent', () => {
  let component: GMapWrapperComponent;
  let fixture: ComponentFixture<GMapWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GMapWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GMapWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
