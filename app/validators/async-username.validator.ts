import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
@Injectable()
export class PersonValidator {
  constructor(private apiService: ApiService) {}

  validateUserNameFromAPI(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.apiService.validateUserName(control.value).pipe(
      map((isValid) => {
        if (isValid) {
          return null;
        }
        return {
          UserNameDuplicated: true,
        };
      })
    );
  }
}
