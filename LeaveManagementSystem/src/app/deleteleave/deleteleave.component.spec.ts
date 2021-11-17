import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteleaveComponent } from './deleteleave.component';

describe('DeleteleaveComponent', () => {
  let component: DeleteleaveComponent;
  let fixture: ComponentFixture<DeleteleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
