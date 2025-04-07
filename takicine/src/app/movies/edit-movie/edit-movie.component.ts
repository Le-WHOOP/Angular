import { Component, inject, Input } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { Observable } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [FormsModule, RouterLink, DatePipe, CommonModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss'
})
export class EditMovieComponent {
  @Input({required: true}) id! : number;

  private readonly moviesService = inject(MovieService);
  private readonly router = inject(Router);

  failSynopsis: boolean = false;
  failTitle: boolean = false;
  failDirector: boolean = false;

  constructor (private route: ActivatedRoute) {

  }
    movie: Movie = {
      title: '',
      director: '',
      releaseDate: new Date(),
      synopsis: '',
      id: undefined,
      rate: undefined, 
      image: undefined
    }

    ngOnInit(): void {
      this.movie.id = parseInt(this.route.snapshot.paramMap.get('id')!);
      this.moviesService.getMovie(this.movie.id).subscribe(movie => this.movie = movie);
    }
  
    editMovie(): void {
      if (this.isInputValid()) {
        this.moviesService.editMovie(this.movie).subscribe(
            () => this.router.navigate(['/movies'])
        );
      }
   }

  isInputValid(): boolean {
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
