import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalOperatorsComponent } from './conditional-operators.component';

describe('ConditionalOperatorsComponent', () => {
  let component: ConditionalOperatorsComponent;
  let fixture: ComponentFixture<ConditionalOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionalOperatorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConditionalOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
