import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, IonSearchbar } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { LocalService } from 'src/app/services/local.service';
import { getCurrentUser } from 'src/app/config/chatLogic';
import { delay } from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit, AfterViewInit {
  chat: any;
  currentLogInUser: any;
  searchUser = '';
  searchStatus = false;
  searchChat: any;
  chatListSpinner = true;

  constructor(
    private http: HttpService,
    private animationController: AnimationController,
    private tokenService: LocalService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private localService: LocalService
  ) {
    this.currentLogInUser = localService.get('userId');
  }

  ngOnInit() {
    this.fetchChats();
  }

  ngAfterViewInit(): void {}

  fetchChats() {
    this.http.get('/chat').subscribe({
      next: (data) => {
        this.chat = data;
        this.chatListSpinner = false;
        console.log(this.chat);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openBox() {
    console.log('hello');
  }

  getUser(user: any) {
    return getCurrentUser(this.currentLogInUser, user);
  }

  printName(event: any) {
    console.log();
    if (event.target.value) {
      this.searchStatus = true;
      this.http.get(`/user?search=${this.searchUser}`).subscribe({
        next: (data) => {
          console.log(data);
          this.searchChat = data;
        },
      });
    } else {
      this.searchStatus = false;
    }
  }

  userProfile(userChat: any) {
    this.route.navigate([`user-profile/${userChat['_id']}`]);
  }

  logOut() {
    this.tokenService.remove();
    this.route.navigateByUrl('');
  }
}
