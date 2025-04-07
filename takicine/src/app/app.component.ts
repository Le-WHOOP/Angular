import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ToastComponent } from './toast/toast.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [NavbarComponent, ToastComponent, HomeComponent, RouterOutlet, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'takicine';
}
