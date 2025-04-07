import { Component, Input } from '@angular/core';
import { Review } from '../../../models/review';
import { User } from '../../../models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-avis',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './avis.component.html',
  styleUrl: './avis.component.scss'
})
export class AvisComponent {
  @Input({required: true}) review!: Review;
  user?: User = undefined;
  
  ngOnInit() {
    this.user = this.review.user as User;
    console.log(this.user);
  }
}
