import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public identidad;

  constructor() {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {}


}
