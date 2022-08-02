import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormDetailsComponent } from './form-details.component';
import { ApiService } from 'src/app/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { People } from 'src/app/models/people.class';
import { of, throwError } from 'rxjs';

const userName: string = 'Long';
const userResponse: People = {
  UserName: '',
  FirstName: '',
  LastName: '',
  MiddleName: '',
  Emails: [],
  AddressInfo: [],
};
// Message error
const errorResponse = new Error('error message with status 404');

describe('FormDetailsComponent', () => {
  let component: FormDetailsComponent;
  let fixture: ComponentFixture<FormDetailsComponent>;
  let router: Router;
  let apiService: ApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [ApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(FormDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create Details Component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to form', () => {
    //Arrange
    const spy = spyOn(router, 'navigateByUrl');

    // Act
    component.onNavigateForm();

    // Assert
    const url = spy.calls.first().args[0];
    expect(url).toBe('form');
  });

  it('should return next data from apiService deletePeople', () => {
    // Arrange
    spyOn(console, 'log').and.callThrough();

    spyOn(apiService, 'deletePeople').and.returnValue(of(userResponse));

    // Act
    component.onDeletePerson(userName);

    // Assert
    expect(console.log).toHaveBeenCalled();
  });

  it('should return error from apiService deletePeople', () => {
    // Arrange

    spyOn(console, 'error').and.callThrough();

    spyOn(apiService, 'deletePeople').and.returnValue(
      throwError(() => errorResponse)
    );

    // Act
    component.onDeletePerson(userName);

    // Assert
    expect(console.error).toHaveBeenCalledWith(errorResponse);
  });

  it('should return next data from apiService getPeopleByUserName', () => {
    // Arrange
    spyOn(apiService, 'getPeopleByUserName').and.returnValue(of(userResponse));

    // Act
    component.ngOnInit();

    // Assert
    expect(component.peopleDetails).toEqual(userResponse);
  });

  it('should return error from apiService getPeopleByUserName', () => {
    // Arrange
    spyOn(console, 'error').and.callThrough();
    spyOn(apiService, 'getPeopleByUserName').and.returnValue(
      throwError(() => errorResponse)
    );

    // Act
    component.ngOnInit();

    // Assert
    expect(console.error).toHaveBeenCalledWith(errorResponse);
  });
});
