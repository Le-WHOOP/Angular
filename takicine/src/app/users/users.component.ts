import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

    private readonly userService = inject(UserService);

    users: User[] = [];

    ngOnInit(): void {
        this.userService.getUsers().subscribe(users => this.users = users);
    }
}
