import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import PromptRecord from 'src/app/models/record';
import { AuthService } from 'src/app/service/auth.service';
import { FirestoreService } from '../service/firestore.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit{
  authService = inject(AuthService)

  records: PromptRecord[] = [];

  constructor(private router: Router, private store: FirestoreService) {
    this.authService.user$.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl("login");
      }
    })
  }

  ngOnInit(): void {
    this.store.getAllRecords().subscribe({
      next: resp => {
        console.log()
        // this.records = resp;
      }
    });
  }

  edit() {}
}
