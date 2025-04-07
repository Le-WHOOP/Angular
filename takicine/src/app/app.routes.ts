import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddAvisComponent } from './reviews/add-avis/add-avis.component';
import { EditAvisComponent } from './reviews/edit-avis/edit-avis.component';
import { AdminComponent } from './admin/admin.component';
import { AddUserComponent } from './user-page/add-user/add-user.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ConnectionComponent } from './user-page/connection/connection.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'add-user', component: AddUserComponent},
    { path: 'add-user/:userId', component: AddUserComponent},
    { path: 'user-page', component: UserPageComponent},
    { path: 'connection', component: ConnectionComponent},
    { path: 'movies', component: MoviesComponent},
    { path: 'add-movie', component: AddMovieComponent},
    { path: 'edit-movie/:id', component: EditMovieComponent},
    { path: 'list-avis/:id', component: ReviewsComponent},
    { path: 'add-avis', component: AddAvisComponent},
    { path: 'edit-avis/:id', component: EditAvisComponent},
    { path: 'panel-admin', component: AdminComponent }
];
