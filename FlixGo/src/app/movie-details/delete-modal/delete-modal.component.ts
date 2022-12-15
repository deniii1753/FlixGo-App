import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMovie } from 'src/app/shared/interfaces/IMovie';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() movie: IMovie | null = null;
  @Output() closeModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    
  }

  deleteHandler() {
    console.log('DELETE');
    
  }

  closeHandler(e: MouseEvent) {
    const target = e.target as Element;
    const className = target.getAttribute('class');

    if(target.tagName === 'BUTTON') return this.closeModal.emit();
    if(className !== 'modal') return;

    this.closeModal.emit();
  }

}
