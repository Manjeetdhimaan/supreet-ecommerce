import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
@Input() name: string;
@Input() isShown = false;

scrollTop() {
  window.scrollTo({
    top: 0
  })
}
}
