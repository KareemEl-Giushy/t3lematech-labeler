import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { from } from 'rxjs';
import PromptRecord from 'src/app/models/record';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private store: Firestore) { }

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
