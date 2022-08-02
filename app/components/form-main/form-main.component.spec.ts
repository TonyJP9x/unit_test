import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { FormMainComponent } from './form-main.component';

describe('FormMainComponent', () => {
  let component: FormMainComponent;
  let fixture: ComponentFixture<FormMainComponent>;
  let router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormMainComponent],
      providers: [
        Router,
        {
          provide: Router,
          useValue: router,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Form main component', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to "people" takes you to people', () => {
    const spy = router.navigate as jasmine.Spy;

    component.openFormPeople();

    const url = spy.calls.first().args[0];
    expect(url).toEqual(['people']);
  });
});
