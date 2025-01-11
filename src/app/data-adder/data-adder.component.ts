import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FirestoreService } from './service/firestore.service';
import PromptRecord from '../models/record';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-adder',
  templateUrl: './data-adder.component.html',
  styleUrls: ['./data-adder.component.css']
})
export class DataAdderComponent implements OnInit {
  authService = inject(AuthService);

  loading: boolean = false;

  form: FormGroup = new FormGroup("");

  showToast: boolean = false;

  errorMessage: string | null = null;

  constructor(private router: Router, private store: FirestoreService, private builder: FormBuilder) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl("login");
      }
    })

    this.form = this.builder.group({
      question: ["", Validators.required, Validators.minLength(5)],
      answer: ["", Validators.required, Validators.minLength(1)],
      reason: ["", Validators.required, Validators.minLength(5)]
    });
  }

  addRecord() {

    this.loading = true;

    let record: PromptRecord = {
      question: this.form.value.question,
      answer: this.form.value.answer,
      reason: this.form.value.reason
    }

    this.store.addRecord(record).subscribe({
      next: res => {
          this.showToast = true;
          console.log(res);
          this.loading = false
      },
      error: err => {
        this.showToast = false;
        this.errorMessage = err.code
      }
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("login");
  }

}
