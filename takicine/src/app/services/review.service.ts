import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    private readonly httpClient = inject(HttpClient)
    private readonly url = "http://localhost:8080/reviews"

    getReviews(): Observable<Review[]> {
        return this.httpClient.get<Review[]>(this.url);
    }

    getReview(id: any) {
        return this.httpClient.get<Review>(`${this.url}/${id}`)
    }

    addReview(review: Review): Observable<Review> {
        return this.httpClient.post<Review>(this.url, review);
    }

    editReview(review: Review) {
        return this.httpClient.put<Review>(`${this.url}/${review.id}`, review);
    }

    deleteReview(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.url}/${id}`);
    }
}
