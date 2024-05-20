import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

const routerMock = {
  navigate: jest.fn()
}
const sessionServiceMock = {
  $isLogged: jest.fn()
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatToolbarModule
      ],
      providers: [
        {
          provide: Router,
          useValue: routerMock,
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('$isLogged returns true when the user has been authenticated', () => {
    sessionServiceMock.$isLogged.mockReturnValueOnce(of(true));

    component.$isLogged;

    expect(sessionServiceMock.$isLogged).toHaveBeenCalled();
    expect(component.$isLogged).toBeTruthy();
  });

  it('$isLogged returns false when the user has not been authenticated', () => {
    sessionServiceMock.$isLogged.mockReturnValueOnce(of(false));

    component.$isLogged;

    expect(sessionServiceMock.$isLogged).toHaveBeenCalled();
    expect(component.$isLogged).toBeFalsy();
  });
});
