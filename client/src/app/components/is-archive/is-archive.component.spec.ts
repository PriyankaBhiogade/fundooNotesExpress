import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsArchiveComponent } from './is-archive.component';

describe('IsArchiveComponent', () => {
  let component: IsArchiveComponent;
  let fixture: ComponentFixture<IsArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
