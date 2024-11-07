import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Message } from '../../models/message.model';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  connection: HubConnection

  messages: Message[] = []
  newMessage: string|null = null;
  constructor(
    private messageService: MessageService
  ) {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://demosocket-bxh4fqhva2bdema4.northeurope-01.azurewebsites.net/ws/chat').build();
    this.connection.start();
    this.connection.on('Message', (m: Message) => {
      // this.messages.push(m);
      this.messages = [...this.messages, m];
      if(m.author !== 'Khun') {
        this.messageService.add({ severity: 'info', summary: 'Vous avez recu un message' })
      }
    })
  }

  async sendMessage() {
    await this.connection.send('NewMessage', {
      author: 'Khun',
      content: this.newMessage
    })
    this.newMessage = null;
  }
}
