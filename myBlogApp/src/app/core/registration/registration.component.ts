import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor( private formBuilder: FormBuilder, private authService:AuthService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  submit() {
    this.authService.register(this.registrationForm);
  }
  isLoading(){
    return this.authService.isLoading;
  }

}