import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMiniCartComponent } from './my-mini-cart.component';

describe('MyMiniCartComponent', () => {
  let component: MyMiniCartComponent;
  let fixture: ComponentFixture<MyMiniCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyMiniCartComponent]
    });
    fixture = TestBed.createComponent(MyMiniCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
