import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdderComponent } from './data-adder.component';

describe('DataAdderComponent', () => {
  let component: DataAdderComponent;
  let fixture: ComponentFixture<DataAdderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataAdderComponent]
    });
    fixture = TestBed.createComponent(DataAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
