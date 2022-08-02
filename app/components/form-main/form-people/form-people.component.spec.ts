import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/services/api.service';
import { PersonValidator } from 'src/app/validators/async-username.validator';

import { FormPeopleComponent } from './form-people.component';

describe('FormPeopleComponent', () => {
  let component: FormPeopleComponent;
  let fixture: ComponentFixture<FormPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPeopleComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [ApiService, PersonValidator, FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
