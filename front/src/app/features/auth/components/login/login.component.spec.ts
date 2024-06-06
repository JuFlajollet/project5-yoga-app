
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
  let sessionService: SessionService;
  let httpTestingController: HttpTestingController;
  let ngZone: NgZone;

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
        FormBuilder
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    authService = TestBed.inject(AuthService);
    sessionService = TestBed.inject(SessionService);
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

  it('submit returns true when the user has been authenticated', () => {
    updateForm('test@test.com','test');

    const routerNavigateSpy = jest.spyOn(router, 'navigate');
    const authServiceLoginSpy = jest.spyOn(authService, 'login');
    const sessionServiceLoginSpy = jest.spyOn(sessionService, 'logIn');

    ngZone.run(() => {
      component.submit();
    });

    const reqAuth = httpTestingController.expectOne({
      method: 'POST',
      url : 'api/auth/login'
    });

    reqAuth.flush({
      mockSessionInfoSuccess
    });

    expect(authServiceLoginSpy).toHaveBeenCalledTimes(1);
    expect(sessionServiceLoginSpy).toHaveBeenCalledTimes(1);
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/sessions']);
    expect(component.onError).toEqual(false);
  });

  it('submit should change onError to true when the user has not been authenticated', () => {
    const authServiceLoginSpy = jest.spyOn(authService, 'login');

    component.submit();

    const reqAuth = httpTestingController.expectOne({
      method: 'POST',
      url : 'api/auth/login'
    });

    reqAuth.error(new ProgressEvent('You are not logged in'));

    expect(authServiceLoginSpy).toHaveBeenCalledTimes(1);
    expect(component.onError).toEqual(true);
  });
});
