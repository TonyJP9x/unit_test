import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'form-main',
  templateUrl: './form-main.component.html',
  styleUrls: ['./form-main.component.scss'],
})
export class FormMainComponent {
  constructor(private router: Router) {}

  openFormPeople() {
    this.router.navigate(['people']);
  }
}
