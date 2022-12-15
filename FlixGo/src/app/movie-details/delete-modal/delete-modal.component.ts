import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/shared/interfaces/IMovie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() movie: IMovie | null = null;
  @Output() closeModal = new EventEmitter<boolean>();

  constructor(
    private movieService: MovieService,
    private router: Router
    ) { }

  ngOnInit(): void {
    
  }

  deleteHandler() {
    this.movieService.deleteMovie(this.movie?._id || '')
      .subscribe({
        next: () => {
          this.closeModal.emit();
          this.router.navigate(['/movies']);
        },
        error: () => {
          this.router.navigate(['404']);
        }
      })
  }

  closeHandler(e: MouseEvent) {
    const target = e.target as Element;
    const className = target.getAttribute('class');

    if(target.tagName === 'BUTTON') return this.closeModal.emit();
    if(className !== 'modal') return;

    this.closeModal.emit();
  }

}
