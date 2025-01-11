import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  protected form: FormGroup = new FormGroup('');

  errorMessage: string | null = null;

  islogedin: boolean = false;

  loading: boolean = false;

  constructor(private builder: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.auth.user$.subscribe(user => {
      if (user) {
        this.router.navigateByUrl("labeler");
      }
    });


    this.form = this.builder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    this.loading = true;
    if(this.form.errors != null) {
      console.log(this.form.errors)
      return;
    }

    this.auth.firebaseLogin(this.form.value.email, this.form.value.password).subscribe({
      next: (resp) => {
        this.loading = false;
        console.log(resp);
        this.router.navigateByUrl("labeler");
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
    });
  }
}
