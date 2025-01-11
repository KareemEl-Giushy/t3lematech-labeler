import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit{
  authService = inject(AuthService)

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl("login");
      }
    })
  }
}
