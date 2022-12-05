import { ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
    const regex = /^[A-Za-z0-9\.]{6,}@gmail\.(bg|com)$/
    return (control) => {
        return regex.test(control.value) ? null : { emailValidator: true }
    };
}