import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HttpService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule,RouterTestingModule]
  }));
 

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
