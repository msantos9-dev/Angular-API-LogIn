import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor( private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      password: ['', Validators.required]
    });

    //console.log(localStorage.getItem('email'));
    this.loginForm.get('email')?.setValue(localStorage.getItem('loginEmail'));
    this.loginForm.get('password')?.setValue(localStorage.getItem('loginPassword'));

    

  }

  googleSignUp(){
    
    return this.authService.googleRegister();
  }

  facebookSignUp(){
    return this.authService.facebookRegister();
  }
  
  submit() {
      this.authService.logIn(this.loginForm);
  }

  isLoading(){
    return this.authService.isLoading;
  }

  isAuthenticated(){
    return this.authService.isAuthenticated;
  }


}
