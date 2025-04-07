import { Component, inject, Input, input } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewsService } from '../../services/reviews.service';
import { Router, RouterLink } from '@angular/router';
import { Review } from '../../models/review';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-avis',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-avis.component.html',
  styleUrl: './add-avis.component.scss'
})
export class AddAvisComponent {
 
  private readonly reviewsService = inject(ReviewsService);
      movies$: Observable<Review[]> = this.reviewsService.getReviews();
    private readonly router = inject(Router);
    
  private readonly usersService = inject(UsersService);
  private readonly moviesService = inject(MoviesService);

  user?: User = undefined;
  movies: Movie[] = [];
  movie?: Movie = undefined;
  ngOnInit(): void {
    const email = localStorage.getItem('user');
    if (email == null) {
      this.router.navigate(['/connection']);
    }

    this.usersService.getUserByEmail(email!).subscribe(user => {
      this.user = user;
    });
      // this.usersService.getUser(this.userId).subscribe(user => this.user = user);
      this.moviesService.getMovies().subscribe(movies => this.movies = movies);
  }
    failTexte: boolean = false;
      
    review: Review = {
          id: undefined,
          user: this.user!,
          movie: this.movie!,
          rate: -1,
          text: '',
          reviewDate: new Date()
    }
  
    addReview(): void {
      if (this.isInputValid()) {
        this.review.user = this.user!;
        this.reviewsService.addReview(this.review).subscribe(
            () => this.router.navigate([`/list-avis/${this.user!.id}`])
        );
      }
   }
    isInputValid(): boolean {
      return this.review.text.length > 0;
    }
}
