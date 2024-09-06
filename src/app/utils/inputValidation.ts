import { AbstractControl, ValidatorFn } from '@angular/forms';

// Regular expression for the password validation
const passwordPattern = /^(?=[A-Za-z])(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,10}$/;

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && !passwordPattern.test(control.value)) {
      return { 'passwordInvalid': true };
    }
    return null;
  };
}