import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);

  email: string = '';
  user: User = {
    id: undefined,
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    points: 0
  };

  ngOnInit(): void {
    const email = localStorage.getItem('user');
    if (email == null) {
      this.router.navigate(['/connection']);
    }

    this.usersService.getUserByEmail(email!).subscribe(user => {
      this.user = user;
      if (this.user.id == undefined) {
        this.logout();

      }
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/connection']);
  }
}
