import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-list-reviews',
    standalone: true,
    imports: [DatePipe, RouterLink],
    templateUrl: './list-reviews.component.html',
    styleUrl: './list-reviews.component.scss'
})
export class ListReviewsComponent {
    private readonly reviewService = inject(ReviewService);
    selectedYear: number = 0;
    years: number[] = [];
    reviews: Review[] = [];
    private destroyRef = inject(DestroyRef)

    ngOnInit() {
        this.reviewService.getReviews().subscribe(reviews => {
            this.years = [...new Set(reviews.map(review => new Date(review.reviewDate).getFullYear()))].sort((a, b) => b - a);
            this.reviews = reviews;
        });
    }

    onYearChange(event: any) {
        this.selectedYear = Number(event.target.value);
        this.reviewService.getReviews().subscribe(reviews => {
            if (this.selectedYear != 0) {
                this.reviews = reviews.filter(review => new Date(review.reviewDate).getFullYear() === this.selectedYear);
            } else {
                this.reviews = reviews;
            }
        });
    }

    deleteReview(id: number): void {
        this.reviewService.deleteReview(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.reviews = this.reviews.filter(review => review.id !== id);
            this.years = [...new Set(this.reviews.map(review => new Date(review.reviewDate).getFullYear()))].sort((a, b) => b - a);
        }
    );
}
}
