import { Component, inject } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review';
import { Chart } from 'chart.js/auto';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  private readonly reviewsService = inject(ReviewService);
  private readonly moviesService = inject(MovieService);
  years: number[] = [];
  movies: string[] = [];
  reviewsCountByMovie: number[] = [];
  reviewsByMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  selectedYear: number = 0;
  public chart1: any;
  public chart2: any;

  ngOnInit() {
    forkJoin({
      movies: this.moviesService.getMovies(),
      reviews: this.reviewsService.getReviews()
    }).subscribe({
      next: value => {
        this.movies = value.movies.map(movie => movie.title);
        this.years = [...new Set(value.reviews.map(review => new Date(review.reviewDate).getFullYear()))].sort((a, b) => b - a);
        this.selectedYear = this.years[0];
        this.reviewsCountByMovie = this.movies.map(title => {
          const movieReviews = value.reviews.filter(review => review.movie.title === title);
          const totalRating = movieReviews.reduce((sum, review) => sum + review.rate, 0);
          return movieReviews.length > 0 ? totalRating / movieReviews.length : 0;
        });

        this.createChart1();
        this.createChart2();
        this.updateReviewsByMonth(value.reviews);
      }
    });
  }

  onYearChange(event: any) {
    this.selectedYear = Number(event.target.value);
    this.reviewsService.getReviews().subscribe(reviews => {
      this.updateReviewsByMonth(reviews);
    });
  }

  updateReviewsByMonth(reviews: Review[]) {
    this.reviewsByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const reviewsOfSelectedYear = reviews.filter(review => 
      new Date(review.reviewDate).getFullYear() === this.selectedYear
    );

    reviewsOfSelectedYear.forEach(review => {
      const month = new Date(review.reviewDate).getMonth();
      this.reviewsByMonth[month]++; 
    });
    console.log(this.reviewsByMonth);

    this.chart2.data.datasets[0].data = this.reviewsByMonth;
    this.chart2.update();
  }

  createChart1(){
    this.chart1 = new Chart("chart1", {
      type: 'line',
      data: {
        labels: this.movies, 
           datasets: [
          {
            data: this.reviewsCountByMovie,
            backgroundColor: '#fecc00',
            borderColor: '#fecc00'
          } 
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          title: {
              display: true,
              text: 'Note par films'
          },
          legend: {
            display: false
          }
        }
      }

    });
  }

  createChart2() {
    this.chart2 = new Chart("chart2", {
      type: 'bar',
      data: {
        labels: [
          'janvier',
          'février',
          'mars',
          'avril',
          'mai',
          'juin',
          'juillet',
          'août',
          'septembre',
          'octobre',
          'novembre',
          'decembre'
        ], 
        datasets: [
          {
            data: this.reviewsByMonth,
            backgroundColor: '#fecc00'
          }
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          title: {
              display: true,
              text: 'Nombre d\'avis par année'
          },
          legend: {
            display: false
          }
        }
      }

    });
  }
}
