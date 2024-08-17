import { Validators, ValidatorFn } from '@angular/forms';

export class Validation {
  static required(message: string = 'Campo requerido.'): Validator {
    return { type: 'required', message, validator: Validators.required };
  }

  static minLength(minLength: number): Validator {
    return { type: 'minlength', message: `Se requiere al menos ${minLength} caracteres.`, validator: Validators.minLength(minLength) };
  }

  static email(message: string = 'Formato de correo inválido.'): Validator {
    return { type: 'email', message, validator: Validators.email };
  }

  static minNumber(minNumber: number): Validator {
    return { type: 'min', message: `${minNumber} es el valor mínimo permitido.`, validator: Validators.min(minNumber) };
  }

  static maxNumber(maxNumber: number): Validator {
    return { type: 'max', message: `${maxNumber} es el valor máximo permitido.`, validator: Validators.max(maxNumber) };
  }

  static pattern(pattern: string, message: string): Validator {
    return { type: 'pattern', message: `Formato inválido, ${message}`, validator: Validators.pattern(pattern) };
  }

}

export interface Validator {
  type: string;
  message: string;
  validator: ValidatorFn;
}
