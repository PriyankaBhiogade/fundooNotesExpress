import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLabeldialogboxComponent } from './edit-labeldialogbox.component';

describe('EditLabeldialogboxComponent', () => {
  let component: EditLabeldialogboxComponent;
  let fixture: ComponentFixture<EditLabeldialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLabeldialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLabeldialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
