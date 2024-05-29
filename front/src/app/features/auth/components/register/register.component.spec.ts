import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { invalidUser } from 'src/app/mocks/invalidUser';
import { validUser } from 'src/app/mocks/validUser';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let ngZone: NgZone;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,  
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(userEmail: string, userFirstName: string, userLastName: string, userPassword: string) {
    component.form.controls['email'].setValue(userEmail);
    component.form.controls['firstName'].setValue(userFirstName);
    component.form.controls['lastName'].setValue(userLastName);
    component.form.controls['password'].setValue(userPassword);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form.valid should be true when register form is valid', () => {
    updateForm(validUser.email, validUser.firstName, validUser.lastName, validUser.password);
    expect(component.form.valid).toEqual(true);
  });

  it('form.valid should be false when register form is invalid', () => {
    updateForm(invalidUser.email, invalidUser.firstName, invalidUser.lastName, invalidUser.password);
    expect(component.form.valid).toEqual(false);
  });

  it('submit() should navigate to login page if user is sucessfully registered', () => {
    const routerNavigateSpy = jest.spyOn(router, "navigate");
    jest.spyOn(authService, 'register').mockReturnValue(of(undefined));

    ngZone.run(() => {
      component.submit();
    });

    expect(routerNavigateSpy).toBeCalledWith(['/login']);
    expect(component.onError).toEqual(false);
  });

  it('submit() should change onError to true if there is an error during register', () => {
    const error = {
      status: 400,
      message: 'Error during register',
    }
    
    jest.spyOn(authService, 'register').mockReturnValue(throwError(() => error));

    component.submit();

    expect(component.onError).toEqual(true);
  });
});
