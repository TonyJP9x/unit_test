import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function EmailDuplicated(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let emailArr = control.value.map((item: { email: string }) => item.email);
    console.log(emailArr);
    
    let isDuplicate = emailArr.some(
      (item: string, index: number) => emailArr.indexOf(item) != index
    );
    return isDuplicate ? { EmailDuplicated: true } : null;
  };
}
