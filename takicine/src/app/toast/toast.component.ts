import { Component, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

    public readonly toastService: ToastService = inject(ToastService);

    constructor() {

    }
}
