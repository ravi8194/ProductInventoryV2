import { AbstractControl } from '@angular/forms';
export class ValidationService {
  static required(control) {
    if (
      control.value === undefined ||
      control.value === null ||
      (typeof control.value === 'string' && control.value.trim() === '')
    ) {
      return { required: true };
    }
    return null;
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    const reg = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]{2,}(?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
    if (typeof control.value !== 'undefined' && reg.test(control.value)) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }
}
