import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  isPasswordMatch: boolean = true;

  logIn(loginForm: FormGroup) {
    if(this.isLoading) return;
    this.isLoading = true;
    if (!loginForm?.valid) {
      return;
    }else{
      const auth = getAuth();
      signInWithEmailAndPassword(auth, loginForm.get('email')?.value, loginForm.get('password')?.value)
        .then((userCredential) => {
          // Signed in 
          this.isAuthenticated = true;
          this.router.navigate(['blog/admin']);
          // ...
        })
        .catch((error) => {
          this.isAuthenticated = false;
          alert("User or password incorrect");
          const errorCode = error.code;
          const errorMessage = error.message;
        }).finally(() => (this.isLoading = false));
    }
  }

  register(registrationForm: FormGroup){
    if(this.isLoading) return;
    this.isLoading = true;
    if (!registrationForm?.valid) {
      return;
    }else{
      if(registrationForm.get('password')?.value !== registrationForm.get('confirmPassword')?.value){
        this.isPasswordMatch = false;
        return;
      }else{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, registrationForm.get('email')?.value, registrationForm.get('password')?.value)
      .then((userCredential) => {
        // Signed in 
        //this.isAuthenticated = true;
        this.router.navigate(['login']);
        // ...
      })
      .catch((error) => {
        this.isAuthenticated = false;
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      }).finally(() => (this.isLoading = false));
      }
    }
  }

  logOut(){
    const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  this.router.navigate(['']);
  this.isAuthenticated = false;
}).catch((error) => {
  // An error happened.
});

  }
  constructor(private router:Router) { }
}
