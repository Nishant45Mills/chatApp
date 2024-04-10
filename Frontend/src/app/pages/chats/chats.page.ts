import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { AnimationController, IonSearchbar } from '@ionic/angular';
import type { Animation } from '@ionic/angular';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit,AfterViewInit {
  chat: any;
  status = false;

  constructor(private http: HttpClient,private animationController:AnimationController) {}

  isSearchExpanded: boolean = false;

  toggleSearch() {
    this.isSearchExpanded = !this.isSearchExpanded;
  }

  ngOnInit() {
    this.fetchChats();
  }

  ngAfterViewInit(): void {
  }

  fetchChats() {
    this.http.get('http://localhost:3000/chat').subscribe((data) => {
      this.chat = data;
    });
  }

  play() {
    this.status = true;
  }
}
