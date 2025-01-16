import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import PromptRecord from 'src/app/models/record';
import { AuthService } from 'src/app/service/auth.service';
import { FirestoreService } from '../service/firestore.service';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit{
  authService = inject(AuthService)

  records: PromptRecord[] = [];

  lastRecordRef: QueryDocumentSnapshot | null = null;
  firstRecordRef: QueryDocumentSnapshot | null = null;

  pageCount: number = 0;

  currentPage: number = 0;

  constructor(private router: Router, private store: FirestoreService) {
    this.authService.user$.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl("login");
      }
    })
  }

  ngOnInit(): void {
    this.store.getInitRecords().subscribe({
      next: resp => {
        this.records = this.convertArr(resp.docs);
        this.lastRecordRef = resp.docs[resp.docs.length-1];

        this.currentPage++;
      }
    });

    this.store.getRecordsCount().subscribe({
      next: resp => {
        this.pageCount = Math.floor(resp.data().count / 10)
      }
    });
  }

  convertArr(docs: any): PromptRecord[]{
    let arr: PromptRecord[] = [];
    for(let d of docs) {
      let r: PromptRecord = {
        id: d.id,
        question: d.get("question"),
        answer: d.get("answer"),
        reason: d.get("reason"),
        createdAt: d.get("createdAt")
      };
      arr.push(r);
    }

    return arr;
  }

  getNext() {
    this.store.getNextRecords(this.lastRecordRef!).subscribe({
      next: resp => {
        this.records = this.convertArr(resp.docs);
        this.lastRecordRef = resp.docs[resp.docs.length-1];
        this.firstRecordRef = resp.docs[0];

        this.currentPage++;

        if(this.currentPage == this.pageCount) {
          this.lastRecordRef = null;
        }
      }
    })
  }

  getPrevious() {
    this.store.getPrevRecords(this.firstRecordRef!).subscribe({
      next: resp => {
        this.records = this.convertArr(resp.docs);
        this.lastRecordRef = resp.docs[resp.docs.length-1];
        this.firstRecordRef = resp.docs[0];

        this.currentPage--;

        if(this.currentPage == 1) {
          this.firstRecordRef = null;
        }
      }
    })
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
