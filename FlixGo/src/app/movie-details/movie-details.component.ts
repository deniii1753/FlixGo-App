import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from '../shared/interfaces/IMovie';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  public movie: IMovie | null = null;
  public isTrailerOpened: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params?.['id'];

    this.movieService.getMovie(id)
      .subscribe({
        next: (data) => {
          data.trailer = this.getParsedYoutubeLink(data.trailer);
          this.movie = data;          
        },
        error: () => this.router.navigate(['404'])
      })
  }

  openTrailerHandler() {
    this.isTrailerOpened = true;
  }

  getParsedYoutubeLink(link: string) {
    const tokens = link.split('?');

    const videoId = tokens.find(x => x.startsWith('v='))?.split('v=').pop() || '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

}
