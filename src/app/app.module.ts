import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environement } from '../environment/environement'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataAdderModule } from './data-adder/data-adder.module';
import { AppAuthModule } from './auth/app-auth.module';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environement.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    DataAdderModule,
    AppAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
