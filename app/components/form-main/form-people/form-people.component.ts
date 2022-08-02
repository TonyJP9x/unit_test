import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { People } from 'src/app/models/people.class';
import { ApiService } from 'src/app/services/api.service';
import { PersonValidator } from 'src/app/validators/async-username.validator';
import { EmailDuplicated } from 'src/app/validators/emailDuplicated.validator';

@Component({
  selector: 'app-form-people',
  templateUrl: './form-people.component.html',
  styleUrls: ['./form-people.component.scss'],
})
export class FormPeopleComponent implements OnInit, OnDestroy {
  peopleForm!: FormGroup;
  subscriptions!: Subscription;
  subscriptionsNewPeople!: Subscription;
  subscriptionsPatchPeople!: Subscription;
  newForm: boolean = false;
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private asyncValidator: PersonValidator
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscriptions = this.route.params
      .pipe(
        map((params: Params) => {
          params['UserName'] === undefined
            ? (this.newForm = true)
            : (this.newForm = false);
          params['UserName'] != null
            ? (this.editMode = true)
            : (this.editMode = false);
          return params['UserName'];
        }),
        switchMap((userName: string) =>
          this.apiService.getPeopleByUserName<People>(userName)
        )
      )
      .subscribe((data: People) => {
        this.updateForm(data);
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    if (this.editMode) {
      this.subscriptionsNewPeople.unsubscribe();
    } else {
      this.subscriptionsPatchPeople.unsubscribe();
    }
  }

  removeItemEmail(idx: number) {
    this.emailsArray.removeAt(idx);
  }

  removeItemAddressInfo(idx: number) {
    this.addressArray.removeAt(idx);
  }

  onSavePeople() {
    if (this.newForm) {
      this.subscriptionsNewPeople = this.apiService
        .createPeople<People>(this.peopleForm.value)
        .pipe(map((people) => this.apiService.callNextOnSubject(people)))
        .subscribe({
          next: (data) => console.log(data),
          error: (err: Error) => console.log(err.message),
        });
      this.router.navigate(['form']);
      console.log('CreateForm');
    } else {
      this.subscriptionsPatchPeople = this.apiService
        .patchPeople<People>(
          this.userNameControls?.value,
          this.peopleForm.value
        )
        .pipe(map((people) => this.apiService.callNextOnSubject(people)))
        .subscribe({
          next: (data) => console.log(data),
          error: (err: Error) => console.log(err.message),
        });
      this.router.navigate(['form']);
      console.log('patchForm');
    }
  }

  onCancel() {
    this.peopleForm.reset();
    this.router.navigate(['']);
  }

  // Method
  get userNameControls() {
    return this.peopleForm.get('UserName');
  }
  get firstNameControls() {
    return this.peopleForm.get('FirstName');
  }
  get lastNameControls() {
    return this.peopleForm.get('LastName');
  }
  get emailsArray(): FormArray {
    return this.peopleForm.get('Emails') as FormArray;
  }
  get addressArray(): FormArray {
    return this.peopleForm.get('AddressInfo') as FormArray;
  }

  initForm() {
    this.peopleForm = this.fb.group({
      UserName: [
        '',
        Validators.required,
        this.asyncValidator.validateUserNameFromAPI.bind(this),
      ],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.maxLength(26)]],
      MiddleName: [''],
      Emails: this.fb.array([]),
      AddressInfo: this.fb.array([]),
    });
  }
  // , EmailDuplicated().bind(this)
  updateForm(people: People) {
    if (this.editMode) {
      const { UserName, FirstName, LastName, MiddleName, Emails, AddressInfo } =
        people;

      // push email into this.emailsArray
      if (people.Emails.length > 0) {
        for (let email of Emails) {
          this.emailsArray.push(this.fb.control(email));
        }
      } else {
        alert("this Person don't have Email");
      }

      // push addressItem into this.addressArray
      if (people.AddressInfo.length > 0) {
        for (let addressItem of AddressInfo) {
          const addressInfoItem = this.fb.group({
            Address: [addressItem.Address],
            City: this.fb.group({
              CountryRegion: [addressItem.City.CountryRegion],
              Name: [addressItem.City.Name],
              Region: [addressItem.City.Region],
            }),
          });
          this.addressArray.push(addressInfoItem);
        }
      } else {
        alert("this Person don't have Address Info");
      }

      this.peopleForm.patchValue({
        UserName: UserName,
        FirstName: FirstName,
        LastName: LastName,
        MiddleName: MiddleName,
      });
    } else {
    }
  }

  addEmail() {
    this.emailsArray.push(this.createEmails());
  }

  addAddressInfo() {
    this.addressArray.push(this.createAddressInfo());
  }

  createEmails() {
    return this.fb.control('', [Validators.email]);
  }

  createAddressInfo() {
    return this.fb.group({
      Address: [''],
      City: this.fb.group({
        Name: [''],
        CountryRegion: [''],
        Region: [''],
      }),
    });
  }
}
