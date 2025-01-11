import { Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = user(this.auth)

  currentUserSig = signal<{email: string} | undefined | null>(undefined)

  constructor(private auth: Auth) { }

  firebaseLogin(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password).then(() => {}))
  }

  logout() {
    return from(signOut(this.auth))
  }

}
