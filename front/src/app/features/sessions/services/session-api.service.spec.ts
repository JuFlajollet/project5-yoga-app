import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Session } from '../interfaces/session.interface';
import { User } from 'src/app/interfaces/user.interface';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

const pathService: string = 'api/session';

const mockId: string = '1';

const mockUser: User = {
  id: 1,
  email: 'test@test.com',
  lastName: 'test',
  firstName: 'test',
  admin: true,
  password: 'test',
  createdAt: new Date()
};

const mockSession: Session = {
  id: 1,
  name: 'Session',
  description: 'Session description',
  date: new Date(),
  teacher_id: 1,
  users: [mockUser.id]
};

const mockSessions: Session[] = [mockSession];

const mockOkResponse: HttpResponse<any> = new HttpResponse({body: of({}), status: 200 });

describe('SessionsService', () => {
  let service: SessionApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SessionApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('all should return a response body containing all existing sessions', () => {
    service.all().subscribe((sessions: Session[]) => {
      expect(sessions).toEqual([mockSession]);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url : pathService
    });

    req.flush({
      mockSessions
    });
  });

  it('detail should return a response body containing the session linked to the id', () => {
    service.detail(mockId).subscribe((session: Session) => {
      expect(session).toEqual(mockSession);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url : pathService + `/` + mockId
    });

    req.flush({
      mockSession
    });
  });

  it('delete should return a successful response body after the deletion of session linked to the id', () => {
    service.delete(mockId).subscribe((response: HttpResponse<any>) => {
      expect(response.ok).toBe(true);
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url : pathService + `/` + mockId
    });

    req.flush({
      mockOkResponse
    });
  });

  it('create should return a response body containing the session created', () => {
    service.create(mockSession).subscribe((session: Session) => {
      expect(session).toBe(mockSession);
    });

    const req = httpTestingController.expectOne({
      method: 'POST',
      url : pathService
    });

    req.flush({
      mockSession
    });
  });

  it('update should return a response body containing the session updated', () => {
    service.update(mockId, mockSession).subscribe((session: Session) => {
      expect(session).toBe(mockSession);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url : pathService + `/` + mockId
    });

    req.flush({
      mockSession
    });
  });

  it('participate should not throw any error when user participate', () => {
    service.participate(mockId, mockId).subscribe(() => {});

    httpTestingController.expectOne({
      method: 'POST',
      url : pathService + `/` + mockId + `/participate/` + mockId
    });
  });

  it('unParticipate should should not throw any error when user no longer participate', () => {
    service.unParticipate(mockId, mockId).subscribe(() => {});

    httpTestingController.expectOne({
      method: 'DELETE',
      url : pathService + `/` + mockId + `/participate/` + mockId
    });
  });
});
