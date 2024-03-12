import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpnasionPanelComponent } from './expnasion-panel.component';

describe('ExpnasionPanelComponent', () => {
  let component: ExpnasionPanelComponent;
  let fixture: ComponentFixture<ExpnasionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpnasionPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpnasionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
