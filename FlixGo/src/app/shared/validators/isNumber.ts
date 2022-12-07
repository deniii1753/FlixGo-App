import { ValidatorFn } from "@angular/forms";

export function isNumber(): ValidatorFn {
    return (control) => isNaN(Number(control.value)) ? {isNaN: true} : null;
}