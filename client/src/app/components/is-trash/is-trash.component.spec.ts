import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsTrashComponent } from './is-trash.component';

describe('IsTrashComponent', () => {
  let component: IsTrashComponent;
  let fixture: ComponentFixture<IsTrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsTrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
