import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked, OnDestroy,  } from '@angular/core';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

@Component({
  selector: 'app-trailer-container',
  templateUrl: './trailer-container.component.html',
  styleUrls: ['./trailer-container.component.css']
})
export class TrailerContainerComponent implements AfterViewChecked, OnDestroy {
  @Input() trailerLink: string | undefined = undefined;
  @Output() closeTrailerWindow = new EventEmitter<boolean>();
  @ViewChild("scrollTarget") scrollTarget!: ElementRef;

  ngAfterViewChecked(): void {
    console.log(this.scrollTarget);

    disableBodyScroll(this.scrollTarget?.nativeElement);
  }

  ngOnDestroy(): void {
    clearAllBodyScrollLocks();
  }

  closeHandler() {
    this.closeTrailerWindow.emit();
  }
}
