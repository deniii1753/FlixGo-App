import { ValidatorFn } from "@angular/forms";

export function isYoutubeLink(): ValidatorFn {
    return (control) => control.value.startsWith('https://www.youtube.com') || control.value.startsWith('www.youtube.com') || control.value.startsWith('https://youtube.com') || control.value.trim() === '' ? null : { notYTLink: true };
}