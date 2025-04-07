import { Component, inject, Input } from '@angular/core';
import { Review } from '../../models/review';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { AvisComponent } from './avis/avis.component';

@Component({
  selector: 'app-avis-film',
  standalone: true,
  imports: [AvisComponent],
  templateUrl: './avis-film.component.html',
  styleUrl: './avis-film.component.scss'
})
export class AvisFilmComponent {
    @Input({ required: true }) movieId! : number
    reviews: Review[] = []

  private readonly reviewsService = inject(ReviewService);

    constructor (private route: ActivatedRoute) {
    
    }

    ngOnInit() {
      this.movieId = parseInt(this.route.snapshot.paramMap.get('id')!);
      this.reviewsService.getReviews().subscribe(reviews => this.reviews = reviews.filter(r => r.movie.id == this.movieId))
    }
}
