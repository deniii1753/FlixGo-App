import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url: string) {
    const checkedURL = this.domSanitizer.sanitize(SecurityContext.URL, url.toString());
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 