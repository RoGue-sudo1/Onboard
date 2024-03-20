import { TestBed } from '@angular/core/testing';

import { GoogleBooksService } from './books.service';

describe('BooksService', () => {
  let service: GoogleBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
