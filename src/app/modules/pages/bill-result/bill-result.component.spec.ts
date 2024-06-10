import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillResultComponent } from './bill-result.component';

describe('BillResultComponent', () => {
  let component: BillResultComponent;
  let fixture: ComponentFixture<BillResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillResultComponent]
    });
    fixture = TestBed.createComponent(BillResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
