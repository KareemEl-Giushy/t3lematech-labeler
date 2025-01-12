import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authService = inject(AuthService)
  router = inject(Router)

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user) {
        this.authService.currentUserSig.set({
          email: user.email!,
        });
      }else {
        this.authService.currentUserSig.set(null);
      }
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("login");
  }

  title = 't3lematech-labeler';
}
