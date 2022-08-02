import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { Odata } from 'src/app/models/odata.interface';
import { People } from 'src/app/models/people.class';
import { ApiService } from 'src/app/services/api.service';

import { FormListComponent } from './form-list.component';

// Mock data
const num: number = 167;
const peopleObjectResponse: People = {
  UserName: '',
  FirstName: '',
  LastName: '',
  MiddleName: '',
  Emails: [],
  AddressInfo: [],
};
const peopleSubject = new Subject<People>();

const peopleResponse: People[] = [];
const odataResponse: Odata = { '@odata.context': '', value: peopleResponse };

const errorResponse = new Error('error message with status 404');

describe('FormListComponent', () => {
  let component: FormListComponent;
  let fixture: ComponentFixture<FormListComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  const spy = jasmine.createSpyObj(
    'ApiService',
    ['callNextOnSubject', 'getPeopleSortByUserName'],
    {
      peopleSubject: new Subject<People>(),
    }
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormListComponent],
      imports: [HttpClientModule],
      providers: [{ provide: ApiService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FormListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return error apiService getPeopleSortByUserName', () => {
    // Arrange
    spyOn(console, 'error').and.callThrough();
    apiService.getPeopleSortByUserName.and.returnValue(
      throwError(() => errorResponse)
    );
    // Act
    component.ngOnInit();

    // Assert
    expect(console.error).toHaveBeenCalledWith(errorResponse);
  });

  it('should return next data apiService peopleSubject', () => {
    // Arrange
    spyOn(console, 'log').and.callThrough();

    // Act
    apiService.getPeopleSortByUserName.and.returnValue(of(odataResponse));

    component.ngOnInit();

    apiService.peopleSubject.next(peopleObjectResponse);
    // Assert
    expect(console.log).toHaveBeenCalled();
  });

  it('should return error apiService peopleSubject', () => {
    // Arrange
    spyOn(console, 'error').and.callThrough();

    // Act
    apiService.getPeopleSortByUserName.and.returnValue(of(odataResponse));
    component.ngOnInit();
    apiService.peopleSubject.error(odataResponse);
    // Assert
    expect(console.error).toHaveBeenCalled();
  });
});
