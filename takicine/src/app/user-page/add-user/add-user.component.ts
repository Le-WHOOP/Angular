import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  pageTitle = "Passionné(e) de cinéma? Inscris-toi !";
  buttonTitle = "M'inscrire"

  failFirstName: boolean = false;
  failLastName: boolean = false;
  failAge: boolean = false;
  failEmail: boolean = false;

  user: User = {
    id: undefined,
    firstName: '',
    lastName: '',
    age: 16,
    email: '',
    points: 0
  };


  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');

    if (userId == null) {
      this.confirm = this.addUser;
    }

    else {
      this.pageTitle = "Modification utilisateur"
      this.buttonTitle = "Valider"
      this.usersService.getUser(parseInt(userId)).subscribe(user => this.user = user);
      this.confirm = this.updateUser;
    }
  }

  confirm(): void { }

  addUser(): void {
    if (this.isInputValid()) {
      this.usersService.addUser(this.user).subscribe(
        () => {
          localStorage.setItem('user', this.user.email);
          this.router.navigate(['/user-page']);
        }
      );
    }
  }

  updateUser(): void {
    if (this.isInputValid()) {
      this.usersService.editUser(this.user).subscribe(
        () => {
          localStorage.setItem('user', this.user.email);
          this.router.navigate(['/user-page']);
        }
      );
    }
  }

  isInputValid(): boolean {
    var emailRegex = /[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-z]+/

    this.failFirstName = false;
    this.failLastName = false;
    this.failAge = false;
    this.failEmail = false;


    if (this.user.firstName.length == 0) {
      this.failFirstName = true;
    }

    if (this.user.lastName.length == 0) {
      this.failLastName = true;
    }

    if (this.user.age <= 0) {
      this.failAge = true;
    }

    if (!emailRegex.test(this.user.email)) {
      this.failEmail = true;
    }

    return !this.failFirstName && !this.failLastName && !this.failAge && !this.failEmail;
  }
}
