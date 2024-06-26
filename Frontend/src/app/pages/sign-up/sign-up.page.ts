import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  loading: boolean = false;
  signUpForm = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    acceptTerms: [false],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: Router
  ) {}

  ngOnInit() {}

  onSubmit(formData: any) {
    this.loading = true;
    this.http.post('/auth/register', formData.value).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.loading = false;
          this.route.navigateByUrl('/sign-in');
        }, 1000);
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.signUpForm.reset();
  }
}
