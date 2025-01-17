import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './auth/login/login.component';
import { DataAdderComponent } from './data-adder/data-adder.component';
import { PreviewComponent } from './data-adder/preview/preview.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "labeler",
    component: DataAdderComponent
  },
  {
    path: "labeler/:id",
    component: DataAdderComponent
  },
  {
    path: "preview",
    component: PreviewComponent
  },
  {
    path: "**",
    redirectTo: "login",
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
