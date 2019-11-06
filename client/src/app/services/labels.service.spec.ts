import { TestBed } from '@angular/core/testing';

import { LabelsService } from './labels.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LabelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule,RouterTestingModule]
  }));

  it('should be created', () => {
    const service: LabelsService = TestBed.get(LabelsService);
    expect(service).toBeTruthy();
  });
});
