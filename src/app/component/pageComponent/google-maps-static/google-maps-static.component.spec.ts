import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapsStaticComponent } from './google-maps-static.component';

describe('GoogleMapsStaticComponent', () => {
  let component: GoogleMapsStaticComponent;
  let fixture: ComponentFixture<GoogleMapsStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapsStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapsStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
