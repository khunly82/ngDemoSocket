import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private messageService: MessageService) {}

  displayToast() {
    this.messageService.add({ summary: 'test', severity: 'info' })
  }
}
