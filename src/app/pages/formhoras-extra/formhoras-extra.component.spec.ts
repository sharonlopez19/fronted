import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormhorasExtraComponent } from './formhoras-extra.component';

describe('FormhorasExtraComponent', () => {
  let component: FormhorasExtraComponent;
  let fixture: ComponentFixture<FormhorasExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormhorasExtraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormhorasExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
