import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-latex',
  inputs: ["content"],
  templateUrl: './latex.component.html',
  styleUrls: ['./latex.component.css']
})
export class LatexComponent implements OnInit, OnChanges{
  @Input() content!: string;

  mathJaxObject: any;

  latex: any;

  constructor(private gs: GlobalService) {}

  ngOnInit(): void {
    // @ts-ignore
    this.mathJaxObject = this.gs.nativeGlobal()["MathJax"];
    this.loadMathConfig()

  }

  renderMath() {
    let angObj = this;
    setTimeout(() => {
      angObj.mathJaxObject.Hub.Queue(
        ["Typeset", angObj.mathJaxObject.Hub],
        "mathContent"
      );
    }, 10);
  }

  loadMathConfig() {
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"]
        ]
      },
      menuSettings: { zoom: "Double-Click", zscale: "150%" },
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["content"]) {
      this.renderMath();
    }
  }

}
