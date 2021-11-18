import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewleavesComponent } from './adminviewleaves.component';

describe('AdminviewleavesComponent', () => {
  let component: AdminviewleavesComponent;
  let fixture: ComponentFixture<AdminviewleavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminviewleavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
