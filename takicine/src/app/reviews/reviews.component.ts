import { Component, DestroyRef, inject, Input } from '@angular/core';
import { ReviewsService } from '../services/reviews.service';
import { Review } from '../models/review';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  @Input({required: true}) userId! : number;

  constructor (private route: ActivatedRoute) {
  
  }

  private readonly reviewsService = inject(ReviewsService);
    reviews: Review[] = [];
    ngOnInit(): void {
        this.userId = parseInt(this.route.snapshot.paramMap.get('id')!);
        this.reviewsService.getReviews().subscribe(reviews => this.reviews = reviews.filter(r => r.user.id == this.userId));
    }
    
    private destroyRef = inject(DestroyRef)    
    deleteReview(id: number): void {
        this.reviewsService.deleteReview(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => 
            this.reviews = this.reviews.filter(review => review.id !== id)
        );
    }
}
