import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  modelTorRegister: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

   register(): void {
     this.authService.register(this.model).subscribe(data => console.log(data), error => console.log(error));
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled!');
  }

}
