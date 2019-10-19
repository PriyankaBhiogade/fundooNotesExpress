import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoteDialogboxComponent } from './create-note-dialogbox.component';

describe('CreateNoteDialogboxComponent', () => {
  let component: CreateNoteDialogboxComponent;
  let fixture: ComponentFixture<CreateNoteDialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNoteDialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoteDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
