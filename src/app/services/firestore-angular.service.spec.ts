import { TestBed, inject } from '@angular/core/testing';

import { FirestoreAngularService } from './firestore-angular.service';

describe('FirestoreAngularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestoreAngularService]
    });
  });

  it('should be created', inject([FirestoreAngularService], (service: FirestoreAngularService) => {
    expect(service).toBeTruthy();
  }));
});
