import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, QueryDocumentSnapshot, addDoc, collection, doc, endBefore, getCountFromServer, getDoc, getDocs, limit, limitToLast, orderBy, query, startAfter, startAt, updateDoc } from '@angular/fire/firestore';
import { from } from 'rxjs';
import PromptRecord from 'src/app/models/record';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  dataRef = collection(this.store, "data");

  limit: number = 10;

  constructor(private store: Firestore) { }

  getRecordsCount() {
    let q = query(this.dataRef, orderBy("createdAt"));

    let count = getCountFromServer(q);

    return from(count);
  }

  getInitRecords(){
    let q = query(this.dataRef, orderBy("createdAt"), limit(this.limit));

    let records = getDocs(q);

    return from(records);
  }

  getNextRecords(last: QueryDocumentSnapshot) {
    let q = query(this.dataRef, orderBy("createdAt"), startAfter(last), limit(this.limit));

    let records = getDocs(q);

    return from(records)
  }

  getPrevRecords(first: QueryDocumentSnapshot) {
      let q = query(this.dataRef, orderBy('createdAt'), endBefore(first), limitToLast(this.limit));

      let records = getDocs(q);

      return from(records)
  }

  addRecord(record: PromptRecord) {
    let prom = addDoc(this.dataRef, {
      question: record.question,
      answer: record.answer,
      reason: record.reason,
      createdAt: record.createdAt
    })

    return from(prom)
  }

  getRecord(id: string) {
    const docRef = doc(this.dataRef, id);
    const record = getDoc(docRef);

    return from(record);
  }

  editRecord(id: string, record: PromptRecord) {
    const docRef = doc(this.dataRef, id);
    const rec = updateDoc(docRef, {
      question: record.question,
      answer: record.answer,
      reason: record.reason,
      createdAt: record.createdAt
    });

    return from(rec)
  }

}
