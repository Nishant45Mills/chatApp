import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getCurrentUser } from 'src/app/config/chatLogic';
import { HttpService } from 'src/app/services/http.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  chat: any;
  currentLogInUser: any;
  message: any;
  messageText = '';
  chatId: any;

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private localService: LocalService
  ) {
    this.currentLogInUser = localService.get('userId');
    this.chatId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.fetchUser();
    this.fetchMessages();
  }

  fetchUser() {
    this.http.get(`/chat/${this.chatId}`).subscribe({
      next: (data) => {
        this.chat = data;
      },
    });
  }

  fetchMessages() {
    this.http.get(`/message/${this.chatId}`).subscribe({
      next: (data) => {
        this.message = data;
      },
    });
  }

  sendMessage(event: any) {
    if (event.key == 'Enter') {
      let messagePayload = {
        content: this.messageText,
        chatId: this.chatId,
      };
      this.messageText = '';
      this.http.post('/message', messagePayload).subscribe({
        next: (data) => {
          this.fetchMessages();
        },
      });
    }
  }

  getUser(user: any) {
    return getCurrentUser(this.currentLogInUser, user);
  }
}
