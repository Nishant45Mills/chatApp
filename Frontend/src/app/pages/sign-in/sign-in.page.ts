import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  loading: boolean = false;
  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: Router
  ) {}

  ngOnInit() {}

  submitLoginForm(formData: any) {
    this.loading = true;
    this.http.post('/auth/login', formData.value).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data['accessToken']);
        setTimeout(() => {
          this.loading = false;
          this.route.navigateByUrl('/chat');
        }, 1000);
        console.log(data);
      },
    });
    this.loginForm.reset();
  }
}
