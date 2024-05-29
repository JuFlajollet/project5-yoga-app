import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals'; 
import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { of } from 'rxjs';
import { Session } from '../../interfaces/session.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeacherService } from 'src/app/services/teacher.service';
import { SessionApiService } from '../../services/session-api.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let router: Router;
  let ngZone: NgZone;
  let sessionApiService: SessionApiService;

  const mockSessionWithUser: Session = {
    id: 1,
    name: 'test session',
    description: 'a test session',
    date: new Date(),
    teacher_id: 1,
    users: [1]
  }

  const mockSessionWithoutUser: Session = {
    id: 1,
    name: 'test session',
    description: 'a test session',
    date: new Date(),
    teacher_id: 1,
    users: []
  }

  const mockTeacher: Teacher = {
    id: 1,
    lastName: 'teacher',
    firstName: 'teacher',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  }

  const mockMatSnackBar = {
    open: jest.fn().mockReturnValue({})
  }

  const mockTeacherService = {
    detail: jest.fn().mockReturnValue(of(mockTeacher))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{ 
            path: '', 
            component: DetailComponent
          },{
            path: '**',   
            redirectTo: ''
          },]
        ),
        HttpClientModule,
        MatSnackBarModule,
        MatCardModule,
        MatIconModule,
        ReactiveFormsModule
      ],
      declarations: [DetailComponent], 
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: TeacherService, useValue: mockTeacherService },
        { provide: MatSnackBar, useValue: mockMatSnackBar}
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DetailComponent);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    sessionApiService = TestBed.inject(SessionApiService );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should fetch session without user and update component properties accordingly', () => {
    const exitPageSpy = jest.spyOn(component as any, 'fetchSession');
    jest.spyOn(sessionApiService, 'detail').mockReturnValue(of(mockSessionWithoutUser));

    component.ngOnInit();

    expect(exitPageSpy).toBeCalledTimes(1);
    expect(component.session).toEqual(mockSessionWithoutUser);
    expect(component.isParticipate).toEqual(false);
    expect(component.teacher).toEqual(mockTeacher);
  });

  it('ngOnInit() should fetch session with user and update component properties accordingly', () => {
    const exitPageSpy = jest.spyOn(component as any, 'fetchSession');
    jest.spyOn(sessionApiService, 'detail').mockReturnValue(of(mockSessionWithUser));

    component.ngOnInit();

    expect(exitPageSpy).toBeCalledTimes(1);
    expect(component.session).toEqual(mockSessionWithUser);
    expect(component.isParticipate).toEqual(true);
    expect(component.teacher).toEqual(mockTeacher);
  });

  it('back should call window.history.back', () => {
    const windowHistoryBackSpy = jest.spyOn(window.history, 'back');

    component.back();

    expect(windowHistoryBackSpy).toBeCalledTimes(1);
  });

  it('delete() should open snackbar and navigate to sessions after deleting session', () => {
    const routerNavigateSpy = jest.spyOn(router, 'navigate');
    jest.spyOn(sessionApiService, 'delete').mockReturnValue(of({}));

    ngZone.run(() => {
      component.delete();
    });

    expect(sessionApiService.delete).toHaveBeenCalledTimes(1)
    expect(mockMatSnackBar.open).toHaveBeenCalledTimes(1);
    expect(routerNavigateSpy).toHaveBeenCalledWith(['sessions']);
  });
});

