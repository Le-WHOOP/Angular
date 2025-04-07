import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChartsComponent } from "./charts/charts.component";
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, ChartsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  private readonly moviesService = inject(MovieService);
  private readonly usersService = inject(UserService);
  private readonly reviewsService = inject(ReviewService);
  ratings: number = 0;
  users: number = 0;
  movies: number = 0;
  satisfaction: number = 0;

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies.length);
    this.usersService.getUsers().subscribe(users => this.users = users.length);
    this.reviewsService.getReviews().subscribe(reviews => {
      this.ratings = reviews.length;
      if (this.ratings !== 0) {
        this.satisfaction = reviews.reduce((acc, review) => acc + review.rate, 0);
        this.satisfaction = Math.round((this.satisfaction / 5) / this.ratings * 100);
      }
    });
  }
}
