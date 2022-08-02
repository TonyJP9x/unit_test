import { map, Subscription, switchMap, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { People } from 'src/app/models/people.class';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss'],
})
export class FormDetailsComponent implements OnInit, OnDestroy {
  peopleDetails: People = {
    UserName: '',
    FirstName: '',
    LastName: '',
    MiddleName: '',
    Emails: [],
    AddressInfo: [],
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPersonByUserName();
  }

  ngOnDestroy(): void {}

  onDeletePerson(userName: string) {
    this.apiService
      .deletePeople<People>(userName)
      .pipe(
        map((people: People) => this.apiService.callNextOnSubject(people)),
        tap(() => this.onNavigateForm())
      )
      .subscribe({
        next: (data) => console.log(data),
        error: (err: Error) => console.error(err),
      });
  }

  onNavigateForm() {
    this.router.navigateByUrl('form');
  }

  private getPersonByUserName() {
    this.route.params
      .pipe(
        map((params: Params) => params['UserName']),
        switchMap((userName: string) =>
          this.apiService.getPeopleByUserName<People>(userName)
        )
      )
      .subscribe({
        next: (data: People) => (this.peopleDetails = data),
        error: (err: Error) => console.error(err),
      });
  }
}
