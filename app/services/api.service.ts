import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { every, map, Observable, Subject, switchMap } from 'rxjs';
import { People } from '../models/people.class';
import { Odata } from '../models/odata.interface';

@Injectable()
export class ApiService {
  private url: string =
    'https://services.odata.org/TripPinRESTierService/(S(pa0y3tmcigqbujfdxtupffnm))';

  people: People[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  peopleSubject: Subject<People> = new Subject<People>();

  constructor(private http: HttpClient) {}

  callNextOnSubject(data: People) {
    this.peopleSubject.next(data);
  }

  getAllPeople<T>(): Observable<T> {
    return this.http.get<T>(`${this.url}/People`, this.httpOptions);
  }

  getPeopleByUserName<T>(userName: string): Observable<T> {
    return this.http.get<T>(
      `${this.url}/People('${userName}')`,
      this.httpOptions
    );
  }

  getPeopleSortByUserName<T>(): Observable<T> {
    return this.http.get<T>(
      `${this.url}/People?$orderby=UserName asc`,
      this.httpOptions
    );
  }

  createPeople<T>(data: T): Observable<T> {
    return this.http.post<T>(`${this.url}/People`, data, this.httpOptions);
  }

  deletePeople<T>(userName: string): Observable<T> {
    return this.http.delete<T>(
      `${this.url}/People('${userName}')`,
      this.httpOptions
    );
  }

  patchPeople<T>(userName: string, data: T): Observable<T> {
    return this.http.patch<T>(
      `${this.url}/People('${userName}')`,
      data,
      this.httpOptions
    );
  }

  // UserName Validator
  validateUserName(username: string): Observable<boolean> {
    return this.getAllPeople<Odata>().pipe(
      map((odata: Odata) => odata.value.map((people) => people.UserName)),
      switchMap((userNameArr: string[]) =>
        userNameArr.map((user: string) => user)
      ),
      every((userName) => userName !== username)
    );
  }
}
