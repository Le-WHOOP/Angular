import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChartsComponent } from "./charts/charts.component";
import { MoviesService } from '../services/movies.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, ChartsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  private readonly moviesService = inject(MoviesService);
  private readonly usersService = inject(UsersService);
  ratings: number = 0;
  users: number = 0;
  movies: number = 0;
  satisfaction: number = 0;

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies.length);
    this.usersService.getUsers().subscribe(users => this.users = users.length);

    if (this.ratings !== 0) {
      this.satisfaction = 0 /** TODO */ / this.ratings * 100;
    }
  }
}
