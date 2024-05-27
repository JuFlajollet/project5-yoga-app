
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let ngZone: NgZone;

  const mockSessionService = {
    logIn: jest.fn()
  }

  const mockSessionInfoSuccess: SessionInformation = {
    token: 'test',
    type: 'test',
    id: 1,
    username: 'test',
    firstName: 'test',
    lastName: 'test',
    admin: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule.withRoutes(
          [{ 
            path: '', 
            component: LoginComponent
          },{
            path: '**',   
            redirectTo: ''
          },]
        ),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: SessionService,
          useValue: mockSessionService,
        },
        FormBuilder, 
        HttpClient
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    authService = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy()
    }

    jest.resetAllMocks();
  })

  function updateForm(userEmail: string, userPassword: string) {
    component.form.controls['email'].setValue(userEmail);
    component.form.controls['password'].setValue(userPassword);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit returns true when the user has been authenticated', fakeAsync(() => {
    updateForm('test@test.com','test');

    jest.spyOn(authService, 'login').mockReturnValueOnce(of(mockSessionInfoSuccess));
    jest.spyOn(httpClient, 'post').mockReturnValueOnce(of(mockSessionInfoSuccess));
    const routerNavigateSpy = jest.spyOn(router, 'navigate');

    ngZone.run(() => {
      component.submit();
    });

    tick();

    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(mockSessionService.logIn).toHaveBeenCalledTimes(1);
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/sessions']);
    expect(component.onError).toBeFalsy();
  }));

  it('submit returns false when the user has not been authenticated', () => {
    const error = {
      status: 401,
      message: 'You are not logged in',
    }

    jest.spyOn(authService, 'login').mockReturnValueOnce(throwError(() => error));

    component.submit();

    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(component.onError).toBeTruthy();
  });
});
