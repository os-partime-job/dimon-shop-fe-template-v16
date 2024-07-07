import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaInfoComponent } from './gia-info.component';

describe('GiaInfoComponent', () => {
  let component: GiaInfoComponent;
  let fixture: ComponentFixture<GiaInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GiaInfoComponent]
    });
    fixture = TestBed.createComponent(GiaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
