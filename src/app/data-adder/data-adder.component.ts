import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FirestoreService } from './service/firestore.service';
import PromptRecord from '../models/record';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-adder',
  templateUrl: './data-adder.component.html',
  styleUrls: ['./data-adder.component.css']
})
export class DataAdderComponent implements OnInit {
  authService = inject(AuthService);

  loading: boolean = false;

  form: FormGroup = new FormGroup({
    question: new FormControl("", [Validators.required, Validators.minLength(5)]),
    answer: new FormControl("", [Validators.required, Validators.minLength(1)]),
    reason: new FormControl("", [Validators.required, Validators.minLength(5)])
  });

  showToast: boolean = false;

  errorMessage: string | null = null;

  constructor(private router: Router, private store: FirestoreService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl("login");
      }
    });
  }

  addRecord() {
    if(!this.form.valid) {
      this.errorMessage = "Please Fix Entry Problems";

      return;
    }

    this.loading = true;

    let record: PromptRecord = {
      question: this.form.value.question,
      answer: this.form.value.answer,
      reason: this.form.value.reason,
    }

    this.store.addRecord(record).subscribe({
      next: res => {
          this.showToast = true;
          console.log(res);
          this.form.reset();
          this.loading = false
      },
      error: err => {
        this.showToast = false;
        this.errorMessage = err.code
      }
    })
  }

}
