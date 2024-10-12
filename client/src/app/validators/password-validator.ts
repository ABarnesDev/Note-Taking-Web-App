import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function PasswordValidator(): ValidatorFn {

  return (control:AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    // Password must contain at least 8 characters, including an uppercase, lowercase, special character (&#64;$!%*?&), and digit without spaces.
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);

    return !isValid ? {password: isValid} : null;
  }
}
