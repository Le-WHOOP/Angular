import { Component, inject, Input } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { Observable } from 'rxjs';
import { Review } from '../../models/review';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MoviesService } from '../../services/movies.service';
import { User } from '../../models/user';
import { Movie } from '../../models/movie';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-avis',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './edit-avis.component.html',
  styleUrl: './edit-avis.component.scss'
})
export class EditAvisComponent {
  @Input({required: true}) id! : number;
   
  constructor (private route: ActivatedRoute) {
  
  }

    private readonly reviewsService = inject(ReviewsService);
        movies$: Observable<Review[]> = this.reviewsService.getReviews();
      private readonly router = inject(Router);
      
    private readonly usersService = inject(UsersService);
    private readonly moviesService = inject(MoviesService);
  
    user?: User = undefined;
    movies: Movie[] = [];
    movie?: Movie = undefined;
    failTexte: boolean = false;
      
    review: Review = {
          id: undefined,
          user: this.user!,
          movie: this.movie!,
          rate: -1,
          text: '',
          reviewDate: new Date()
    }

    ngOnInit(): void {
      this.id = parseInt(this.route.snapshot.paramMap.get('id')!);

      this.reviewsService.getReview(this.id).subscribe(review => this.review = review);
      this.moviesService.getMovies().subscribe(movies => this.movies = movies);
    }
    
    editReview(): void {
      if (this.isInputValid()) {
        this.reviewsService.editReview(this.review).subscribe(
            () => this.router.navigate([`/list-avis/${this.review.user.id}`])
        );
      }
    }
    isInputValid(): boolean {
      return this.review.text.length > 0;
    }
}
