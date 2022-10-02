import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';


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
          localStorage.setItem('loginEmail', loginForm.get('email')?.value);
          localStorage.setItem('loginPassword', loginForm.get('password')?.value);
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
  this.isLoading = false;
}).catch((error) => {
  // An error happened.
});

  }
  constructor(private router:Router) { }

  googleRegister(){
    if(this.isLoading) return;
    this.isLoading = true;
    const auth = getAuth();
signInWithPopup(auth, new GoogleAuthProvider())
  .then((result) => {
    this.isAuthenticated = true;
    this.router.navigate(['blog/admin']);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user.displayName);
    // ...
  }).catch((error) => {
    this.isAuthenticated = false;
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  facebookRegister() {

    const auth = getAuth();
signInWithPopup(auth, new FacebookAuthProvider())
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });

  }
}
