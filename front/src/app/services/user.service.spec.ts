import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../interfaces/user.interface';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const pathService: string = 'api/user';

const mockId: string = '1';

const mockUser: User = {
  id: 1,
  email: 'test@test.com',
  lastName: 'test',
  firstName: 'test',
  admin: true,
  password: 'test',
  createdAt: new Date()
}

const mockEmptyResponse: HttpResponse<any> = new HttpResponse({body: of({}), status: 200 });

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getById should return a response body containing the user linked to the id', () => {
    service.getById('1').subscribe((user: User) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url : pathService + `/` + mockId
    });

    req.flush({
      mockUser
    });

    expect(service).toBeTruthy();
  });

  it('delete should return a response body after the deletion of user linked to the id', () => {
    service.delete('1').subscribe(() => {
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url : pathService + `/` + mockId
    });

    req.flush({
      mockEmptyResponse
    });

    expect(service).toBeTruthy();
  });
});
