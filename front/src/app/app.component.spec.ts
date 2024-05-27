import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SessionService } from './services/session.service';

const sessionServiceMock = {
  $isLogged: jest.fn(),
  logOut: jest.fn()
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ 
            path: '', 
            component: AppComponent
          },
          { path: "**", redirectTo: "" }]
        ),
        HttpClientModule,
        MatToolbarModule
      ],
      providers: [
        {
          provide: SessionService,
          useValue: sessionServiceMock, // uses the mock
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('$isLogged returns true when the user has been authenticated', () => {
    sessionServiceMock.$isLogged.mockReturnValueOnce(of(true));

    component.$isLogged().subscribe((logged: boolean) => {
      expect(sessionServiceMock.$isLogged).toHaveBeenCalled();
      expect(logged).toBeTruthy();
    });
  });

  it('$isLogged returns false when the user has not been authenticated', () => {
    sessionServiceMock.$isLogged.mockReturnValueOnce(of(false));

    component.$isLogged().subscribe((logged: boolean) => {
      expect(sessionServiceMock.$isLogged).toHaveBeenCalled();
      expect(logged).toBeFalsy();
    });
  });

  it('logout should properly redirect user after login out', () => {
    const routerNavigateSpy = jest.spyOn(router, 'navigate');

    component.logout();

    expect(sessionServiceMock.logOut).toBeCalledTimes(1);
    expect(routerNavigateSpy).toBeCalledWith(['']);
  });
});
