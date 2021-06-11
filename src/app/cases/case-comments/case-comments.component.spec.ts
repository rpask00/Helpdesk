import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCommentsComponent } from './case-comments.component';

describe('CaseCommentsComponent', () => {
  let component: CaseCommentsComponent;
  let fixture: ComponentFixture<CaseCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
