import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FirestoreService } from './service/firestore.service';
import PromptRecord from '../models/record';
import { FormControl, FormGroup, Validators } from '@angular/forms';

enum Lang {
  EN = "EN",
  AR = "AR"
}

@Component({
  selector: 'app-data-adder',
  templateUrl: './data-adder.component.html',
  styleUrls: ['./data-adder.component.css']
})
export class DataAdderComponent implements OnInit {
  authService = inject(AuthService);

  recID: string | null = null;

  loading: boolean = false;

  direction: {lang: Lang, dir: string}[] = [
    {
      lang: Lang.EN,
      dir: "ltr"
    },
    {
      lang: Lang.EN,
      dir: "ltr"
    },
    {
      lang: Lang.EN,
      dir: "ltr"
    }
  ];

  form: FormGroup = new FormGroup({
    question: new FormControl("", [Validators.required, Validators.minLength(5)]),
    answer: new FormControl("", [Validators.required, Validators.minLength(1)]),
    reason: new FormControl("", [Validators.required, Validators.minLength(5)])
  });

  showToast: boolean = false;

  errorMessage: string | null = null;

  constructor(private router: Router, private store: FirestoreService, private route: ActivatedRoute) {
    this.authService.user$.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl("login");
      }
    });

    this.recID = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this.loading = true;
    if (this.recID != null){
      this.store.getRecord(this.recID).subscribe({
        next: resp => {
          if (resp.exists()) {
            this.form.controls['question'].setValue(resp.get("question"));
            this.form.controls['answer'].setValue(resp.get("answer"));
            this.form.controls['reason'].setValue(resp.get("reason"));
          }

          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  changeLang(item: any): void {
    if(item.lang == Lang.AR) {
      item.lang = Lang.EN
      item.dir = "ltr"
    }else {
      item.lang = Lang.AR
      item.dir = "rtl"
    }
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
      createdAt: (new Date()).toString()
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
        this.loading = false
      }
    });
  }

  editRecord() {
    if(!this.form.valid) {
      this.errorMessage = "Please Fix Entry Problems";
      return;
    }

    if(this.recID == null) {
      return;
    }

    this.loading = true;

    let record: PromptRecord = {
      question: this.form.value.question,
      answer: this.form.value.answer,
      reason: this.form.value.reason,
      createdAt: (new Date()).toString()
    }

    this.store.editRecord(this.recID, record).subscribe({
      next: res => {
        this.showToast = true;
        this.loading = false
      },
      error: err => {
        this.showToast = false;
        this.errorMessage = err.code
        this.loading = false
      }
    });
  }

}
