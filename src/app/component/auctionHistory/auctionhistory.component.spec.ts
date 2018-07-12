import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionhistoryComponent } from './auctionhistory.component';

describe('AuctionhistoryComponent', () => {
  let component: AuctionhistoryComponent;
  let fixture: ComponentFixture<AuctionhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
