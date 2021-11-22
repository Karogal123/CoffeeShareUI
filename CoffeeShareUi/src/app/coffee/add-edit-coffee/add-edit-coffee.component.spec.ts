import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCoffeeComponent } from './add-edit-coffee.component';

describe('AddEditCoffeeComponent', () => {
  let component: AddEditCoffeeComponent;
  let fixture: ComponentFixture<AddEditCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCoffeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
