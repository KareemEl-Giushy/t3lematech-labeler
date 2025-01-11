import { Component, OnInit } from '@angular/core';
import { FileUploadWithPreview } from 'file-upload-with-preview';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{
  ngOnInit(): void {
    const upload = new FileUploadWithPreview('problem-uploader', {
      text: {
        label: "Add Problem:"
      }
    });
  }
}
