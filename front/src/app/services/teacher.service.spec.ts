import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { TeacherService } from './teacher.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Teacher } from '../interfaces/teacher.interface';

const pathService: string = 'api/teacher';

const mockId: string = '1';

const mockTeacher: Teacher = {
  id: 1,
  lastName: 'test',
  firstName: 'test',
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockTeachers: Teacher[] = [mockTeacher];

describe('TeacherService', () => {
  let service: TeacherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TeacherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('all should return a response body containing all existing teachers', () => {
    service.all().subscribe((teachers: Teacher[]) => {
      expect(teachers).toEqual([mockTeacher]);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url : pathService
    });

    req.flush({
      mockTeachers
    });
  });

  it('detail should return a response body containing the teacher linked to the id', () => {
    service.detail(mockId).subscribe((teacher: Teacher) => {
      expect(teacher).toEqual(mockTeacher);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url : pathService + `/` + mockId
    });

    req.flush({
      mockTeacher
    });
  });
});
