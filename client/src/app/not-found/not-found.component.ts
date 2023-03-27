import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  constructor() {
    this.scrollTop();
  }

  scrollTop() {
    window.scrollTo({
      top: 0
    })
  }
}
