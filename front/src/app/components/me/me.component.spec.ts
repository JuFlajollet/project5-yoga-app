import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

import { MeComponent } from './me.component';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgZone } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let router: Router;
  let ngZone: NgZone;
  let userService: UserService;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    },
    logOut: jest.fn()
  }
  const mockMatSnackBar = {
    open: jest.fn().mockReturnValue({})
  }
  const mockUser: User = {
    id: 1,
    email: 'test@test.com',
    lastName: 'test',
    firstName: 'test',
    admin: true,
    password: 'test',
    createdAt: new Date()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        RouterTestingModule.withRoutes(
          [{ 
            path: '', 
            component: MeComponent
          },
          { path: "**", redirectTo: "" }]
        ),
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    userService = TestBed.inject(UserService);

    fixture.detectChanges();
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy()
    }

    jest.resetAllMocks();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user on initialization', () => {
    jest.spyOn(userService, 'getById').mockReturnValueOnce(of(mockUser));

    component.ngOnInit();

    expect(userService.getById).toBeCalledTimes(1);
    expect(component.user).toEqual(mockUser);
  });

  it('back should call window.history.back', () => {
    const windowHistoryBackSpy = jest.spyOn(window.history, 'back');

    component.back();

    expect(windowHistoryBackSpy).toBeCalledTimes(1);
  });

  it('delete should logout when account has been deleted',  fakeAsync(() => {
    jest.spyOn(userService, 'delete').mockReturnValueOnce(of({}));
    
    const logoutSpy = jest.spyOn(mockSessionService, 'logOut');
    const routerNavigateSpy = jest.spyOn(router, 'navigate');

    ngZone.run(() => {
      component.delete();
    });

    tick();

    expect(userService.delete).toBeCalledTimes(1);
    expect(mockMatSnackBar.open).toBeCalledTimes(1);
    expect(logoutSpy).toBeCalledTimes(1);
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/']);

    flush();
  }));
});
