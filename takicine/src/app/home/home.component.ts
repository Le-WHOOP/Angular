import { Component, inject } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MovieComponent } from './movie/movie.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, MovieComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly moviesService = inject(MovieService);
  movies$: Observable<Movie[]> = this.moviesService.getMovies();
}
