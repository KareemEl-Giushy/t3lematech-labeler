import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { from } from 'rxjs';
import PromptRecord from 'src/app/models/record';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private store: Firestore) { }

  getAllRecords(){
    let col = collection(this.store, "data");

    let records = getDocs(col);

    return from(records);
  }

  addRecord(record: PromptRecord) {

    let col = collection(this.store, "data")

    let prom = addDoc(col, {
      question: record.question,
      answer: record.answer,
      reason: record.reason,
      createdAt: record.createdAt
    })

    return from(prom)
  }

}
