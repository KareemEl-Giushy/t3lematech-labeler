import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  protected form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  errorMessage: string | null = null;

  islogedin: boolean = false;

  loading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.router.navigateByUrl("labeler");
      }
    });
  }

  login() {
    if(!this.form.valid) {
      this.errorMessage = "Invalid Login";

      return;
    }

    this.loading = true;

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
