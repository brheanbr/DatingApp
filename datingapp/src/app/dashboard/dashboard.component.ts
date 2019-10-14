import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  registerMode = false;

  constructor() { }

  ngOnInit() {
  }

  registerToogle() {
    this.registerMode = true;
  }

  cancelRegisterMode(RegisterMode: boolean){
    this.registerMode = RegisterMode;
  }

}
