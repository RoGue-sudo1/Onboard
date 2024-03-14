import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinationalOperatorsComponent } from './combinational-operators.component';

describe('CombinationalOperatorsComponent', () => {
  let component: CombinationalOperatorsComponent;
  let fixture: ComponentFixture<CombinationalOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinationalOperatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombinationalOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
