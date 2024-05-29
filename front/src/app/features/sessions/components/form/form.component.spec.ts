import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { NgZone } from '@angular/core';
import { Session } from '../../interfaces/session.interface';
import { of } from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let router: Router;
  let ngZone: NgZone;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  const mockSession: Session = {
    id: 1,
    name: 'test session',
    description: 'a test session',
    date: new Date(),
    teacher_id: 1,
    users: []
  }

  const mockSessionApiService = {
    detail: jest.fn().mockReturnValue(of(mockSession)),
    create: jest.fn().mockReturnValue(of(mockSession)),
    update: jest.fn().mockReturnValue(of(mockSession))
  } 

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule.withRoutes(
          [{ 
            path: '', 
            component: FormComponent
          },{
            path: '**',   
            redirectTo: ''
          },]
        ),
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule, 
        MatSnackBarModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: SessionApiService, useValue: mockSessionApiService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {paramMap: convertToParamMap({id: 1})},
          }
        }
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should redirect to route sessions if user is not admin', () => {
    mockSessionService.sessionInformation.admin = false;

    const routerNavigateSpy = jest.spyOn(router,"navigate");

    ngZone.run(() => {
      component.ngOnInit();
    });

    expect(routerNavigateSpy).toBeCalledWith(['/sessions']);
  });

  it('ngOnInit() should init empty form if user is admin and if url doesnt include update', () => {
    mockSessionService.sessionInformation.admin = true;
    jest.spyOn(router, 'url', 'get').mockReturnValueOnce('');

    component.ngOnInit();

    expect(component.onUpdate).toEqual(false);
    expect(component.sessionForm).toBeTruthy();
    expect(component.sessionForm?.valid).toEqual(false);
  });

  it('ngOnInit() should init valid form with session if user is admin and if url include update', () => {
    mockSessionService.sessionInformation.admin = true;
    jest.spyOn(router, 'url', 'get').mockReturnValueOnce('update');

    component.ngOnInit();

    expect(component.onUpdate).toEqual(true);
    expect(mockSessionApiService.detail).toBeCalledTimes(1);
    expect(component.sessionForm).toBeTruthy();
    expect(component.sessionForm?.valid).toEqual(true);
  });

  it('submit() should create session and exit page if onUpdate is false', () => {
    const routerNavigateSpy = jest.spyOn(router, 'navigate');
    const exitPageSpy = jest.spyOn(component as any, 'exitPage');

    ngZone.run(() => {
      component.submit();
    });

    expect(mockSessionApiService.create).toBeCalledTimes(1);
    expect(routerNavigateSpy).toBeCalledWith(['sessions']);
    expect(exitPageSpy).toBeCalledTimes(1);
  });

  it('submit() should update session and exit page if onUpdate is true', () => {
    component.onUpdate = true;
    const routerNavigateSpy = jest.spyOn(router, 'navigate');
    const exitPageSpy = jest.spyOn(component as any, 'exitPage');
    
    ngZone.run(() => {
      component.submit();
    });

    expect(mockSessionApiService.update).toBeCalledTimes(1);
    expect(routerNavigateSpy).toBeCalledWith(['sessions']);
    expect(exitPageSpy).toBeCalledTimes(1);
  });
});
