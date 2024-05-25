import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummeryComponent } from './order-summery.component';

describe('OrderSummeryComponent', () => {
  let component: OrderSummeryComponent;
  let fixture: ComponentFixture<OrderSummeryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSummeryComponent]
    });
    fixture = TestBed.createComponent(OrderSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
