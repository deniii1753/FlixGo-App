import { ValidatorFn } from "@angular/forms";

export function isLink(): ValidatorFn {
    return (control) => control.value.startsWith('http://') || control.value.startsWith('https://') || control.value.trim() === '' ? null : {notLink: true};
}