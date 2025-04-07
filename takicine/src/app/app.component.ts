import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HomeComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'takicine';
  constructor(

    private toastService: ToastService,
    private vcr: ViewContainerRef
  ) {
    this.toastService.vcr = vcr;
  }
    this.toastService.show('Operation successful!', 'success');
    this.toastService.show('Something went wrong!', 'error');
}
