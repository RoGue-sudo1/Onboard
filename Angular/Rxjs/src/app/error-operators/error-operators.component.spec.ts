import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorOperatorsComponent } from './error-operators.component';

describe('ErrorOperatorsComponent', () => {
  let component: ErrorOperatorsComponent;
  let fixture: ComponentFixture<ErrorOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorOperatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
