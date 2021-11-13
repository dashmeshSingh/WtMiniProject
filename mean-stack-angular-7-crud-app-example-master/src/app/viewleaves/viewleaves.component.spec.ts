import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewleavesComponent } from './viewleaves.component';

describe('ViewleavesComponent', () => {
  let component: ViewleavesComponent;
  let fixture: ComponentFixture<ViewleavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewleavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
