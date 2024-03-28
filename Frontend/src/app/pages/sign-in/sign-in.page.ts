import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder, private http: HttpService) {}

  ngOnInit() {}

  submitLoginForm(formData: any) {
    // console.log(formData.value);
    this.http.post('/auth/login', formData.value).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
    this.loginForm.reset();
  }
}
