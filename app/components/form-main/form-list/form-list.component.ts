import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription, tap } from 'rxjs';
import { Odata } from 'src/app/models/odata.interface';
import { People } from 'src/app/models/people.class';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent implements OnInit, OnDestroy {
  people: People[] = [];
  subscriptionsPeopleSubject!: Subscription;
  subscriptionsPeople!: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPeopleSortByUserName();

    this.subscriptionsPeopleSubject = this.apiService.peopleSubject
      .pipe(
        map((people: People) => this.people.push(people)),
        tap(() => this.getPeopleSortByUserName())
      )
      .subscribe({
        next: (data: number) => console.log(data),
        error: (err: Error) => console.error(err),
      });
  }

  private getPeopleSortByUserName() {
    this.subscriptionsPeople = this.apiService
      .getPeopleSortByUserName<Odata>()
      .subscribe({
        next: (data: Odata) => (this.people = data.value),
        error: (err: Error) => console.error(err),
      });
  }

  ngOnDestroy() {
    // this.subscriptionsPeopleSubject.unsubscribe();
    // this.subscriptionsPeople.unsubscribe();
  }
}
