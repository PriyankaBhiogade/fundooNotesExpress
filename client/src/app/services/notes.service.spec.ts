import { TestBed } from '@angular/core/testing';

import { NotesService } from './notes.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule,RouterTestingModule]
  }));

  it('should be created', () => {
    const service: NotesService = TestBed.get(NotesService);
    expect(service).toBeTruthy();
  });
});
