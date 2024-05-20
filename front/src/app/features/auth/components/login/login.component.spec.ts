import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

const authServiceMock = {
  login: jest.fn()
}
const sessionServiceMock = {
  logIn: jest.fn()
}
const routerMock = {
  navigate: jest.fn()
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: SessionService,
          useValue: sessionServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
        FormBuilder, 
        HttpClient
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

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
    const sessionInfoMockSuccess: SessionInformation = {
      token: 'test',
      type: 'test',
      id: 1,
      username: 'test',
      firstName: 'test',
      lastName: 'test',
      admin: false
    };

    updateForm('test@test.com','test');

    authServiceMock.login.mockReturnValueOnce(of(sessionInfoMockSuccess));

    component.submit();

    expect(authServiceMock.login).toHaveBeenCalled();
    expect(sessionServiceMock.logIn).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalled();
    expect(component.onError).toBeFalsy();
  });

  it('submit returns false when the user has not been authenticated', () => {
    const error = {
      status: 401,
      message: 'You are not logged in',
    }

    authServiceMock.login.mockReturnValueOnce(throwError(() => error));

    component.submit();

    expect(authServiceMock.login).toHaveBeenCalled();
    expect(component.onError).toBeTruthy();
  });
});
