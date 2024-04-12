import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, IonSearchbar } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit, AfterViewInit {
  chat: any;

  constructor(
    private http: HttpService,
    private animationController: AnimationController,
    private tokenService: LocalService,
    private route: Router
  ) {}

  ngOnInit() {
    this.fetchChats();
  }

  ngAfterViewInit(): void {}

  fetchChats() {
    this.http.get('/chat').subscribe({
      next: (data) => {
        this.chat = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openBox() {
    console.log('hello');
  }

  logOut() {
    this.tokenService.remove();
    this.route.navigate(['']);
  }
}
