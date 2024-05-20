import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

import { MeComponent } from './me.component';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

const mockSessionService = {
  sessionInformation: {
    admin: true,
    id: 1
  },
  logOut: jest.fn()
}
const mockUserService = {
  delete: jest.fn(),
  getById: jest.fn()
}

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete returns true when account has been deleted', () => {

    //jest.spyOn(userService, delete).and.returnValue(mockSessionService)

    mockUserService.delete.mockReturnValueOnce(of("test"));

    //authServiceMock.login.mockImplementationOnce(() => of(sessionInfoMockSuccess)); //TODO: delete?

    component.delete;

    expect(mockUserService.delete).toHaveBeenCalled();
    expect(mockSessionService.logOut).toHaveBeenCalled();
  });
});
