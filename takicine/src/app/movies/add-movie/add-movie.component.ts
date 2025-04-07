import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { Observable } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-add-movie',
    standalone: true,
    imports: [FormsModule, RouterLink, CommonModule],
    templateUrl: './add-movie.component.html',
    styleUrl: './add-movie.component.scss'
})
export class AddMovieComponent {

    private readonly toastService = inject(ToastService);
    private readonly movieService = inject(MovieService);
    private readonly router = inject(Router);

    movies$: Observable<Movie[]> = this.movieService.getMovies();

    failDate: boolean = false;
    failSynopsis: boolean = false;
    failTitle: boolean = false;
    failDirector: boolean = false;

    movie: Movie = {
        title: '',
        director: '',
        releaseDate: new Date(),
        synopsis: '',
        id: undefined,
        rate: undefined,
        image: undefined
    };

    addMovie(): void {
        if (this.isInputValid()) {
            this.movieService.addMovie(this.movie).subscribe(() => { 
                this.router.navigate(['/movies'])
                this.toastService.show("Movie added", "success");
            });
        }
    }

    isInputValid(): boolean {
        this.failDate = false;
        this.failSynopsis = false;
        this.failDirector = false;
        this.failTitle = false;

        var result : boolean = true;
        if (this.movie.title.length == 0) {
            result = false;
        }

        if (this.movie.synopsis.length < 30) {
            this.failSynopsis = true;
            result = false;
        }

        if (new Date(this.movie.releaseDate) <= new Date()) {
            this.failDate = true;
            result = false;
        }

        if (this.movie.title.toUpperCase() != this.movie.title) {
            this.failTitle = true;
            result = false
        }

        console.log(this.movie.director.match("[-a-zA-Z]+ [-a-zA-Z]+"))
        if (this.movie.director.match("[-a-zA-Z]+ [-a-zA-Z]+") == null) {
            this.failDirector = true;
            result = false;
        }
        return result;
    }
}
