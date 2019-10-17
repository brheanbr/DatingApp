import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  modelTorRegister: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

   register(): void {
     this.authService.register(this.model).subscribe(data => {
      this.alertify.success(this.model.username + ' Has successfuly registered');
     }, error => {
      this.alertify.error(error);
     });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.warning('Cancelled!');
  }

}
