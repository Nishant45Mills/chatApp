import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  chat:any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchChats();
  }

  fetchChats() {
    this.http.get('http://localhost:3000/chat').subscribe((data) => {
      this.chat = data;
    });
  }
}
