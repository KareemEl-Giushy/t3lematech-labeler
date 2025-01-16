import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAdderComponent } from './data-adder.component';
import { LatexComponent } from './latex/latex.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './preview/preview.component';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent } from './upload/upload.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DataAdderComponent,
    LatexComponent,
    PreviewComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ]
})
export class DataAdderModule { }
