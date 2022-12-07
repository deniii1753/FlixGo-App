import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trailer-container',
  templateUrl: './trailer-container.component.html',
  styleUrls: ['./trailer-container.component.css']
})
export class TrailerContainerComponent implements OnInit {

  @Input() trailerLink: string | undefined = undefined;
  @Output() closeTrailerWindow = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeHandler() {
    this.closeTrailerWindow.emit();
  }
}
