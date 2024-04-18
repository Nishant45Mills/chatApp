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

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private localService: LocalService
  ) {
    this.currentLogInUser = localService.get('userId');
  }

  ngOnInit() {
    this.http
      .get(`/chat/${this.activatedRoute.snapshot.params['id']}`)
      .subscribe({
        next: (data) => {
          this.chat = data;
        },
      });
  }

  getUser(user: any) {
    return getCurrentUser(this.currentLogInUser, user);
  }
}
