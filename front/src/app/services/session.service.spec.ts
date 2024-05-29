import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface';
import { observable } from 'rxjs';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('$isLogged() should return an observable of isLoggedSubject', () => {
    service.$isLogged().subscribe((isLogged: boolean) => {
      expect(isLogged).toEqual(false);
    })
  });

  it('logIn should change isLogged to True and update SessionInformation with user', () => {
    const sessionInfoMockSuccess: SessionInformation = {
      token: 'test',
      type: 'test',
      id: 1,
      username: 'test',
      firstName: 'test',
      lastName: 'test',
      admin: false
    };

    service.logIn(sessionInfoMockSuccess);

    expect(service.sessionInformation).toBe(sessionInfoMockSuccess);
    expect(service.isLogged).toEqual(true);
  });

  it('logOut should change isLogged to False and update SessionInformation with undefined', () => {
    service.logOut();

    expect(service.sessionInformation).toBe(undefined);
    expect(service.isLogged).toEqual(false);
  });
});
