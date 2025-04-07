import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.scss',
})
export class ConnectionComponent {
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);

  failEmail: boolean = false;

  email: string = '';

  login(): void {
    this.failEmail = this.email.length === 0;

    if (!this.failEmail) {
      this.usersService.getUserByEmail(this.email).subscribe(
        user => {
          console.log(user);
          if (user != null) {
            localStorage.setItem('user', this.email);
            console.log(localStorage.getItem('user'));
            this.router.navigate(['/user-page']);
          }

          else {
            this.failEmail = true;
          }
        }
      );
    }
  }
}
