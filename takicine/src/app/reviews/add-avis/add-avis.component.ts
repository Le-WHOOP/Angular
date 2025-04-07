import { Component, inject, Input, input } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewService } from '../../services/review.service';
import { Router, RouterLink } from '@angular/router';
import { Review } from '../../models/review';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
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
  @Input({required: true}) userId! : number;
 
  private readonly reviewsService = inject(ReviewService);
      movies$: Observable<Review[]> = this.reviewsService.getReviews();
    private readonly router = inject(Router);
    
  private readonly usersService = inject(UserService);
  private readonly moviesService = inject(MovieService);

  user?: User = undefined;
  movies: Movie[] = [];
  movie?: Movie = undefined;
  ngOnInit(): void {
    this.userId=1; // TODO remove

      this.usersService.getUser(this.userId).subscribe(user => this.user = user);
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
            () => this.router.navigate([`/list-avis/${this.userId}`])
        );
      }
   }
    isInputValid(): boolean {
      return this.review.text.length > 0;
    }
}
