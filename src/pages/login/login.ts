import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import {SignUpPage} from '../sign-up/sign-up';
import {FeedPage} from '../feed/feed';

import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((info) => {
      
      this.toastCtrl.create({
        message: "Welcome " + info.user.displayName,
        duration: 3000
      }).present();

      this.navCtrl.setRoot(FeedPage);

    }).catch((err) => {
      this.toastCtrl.create({
        message: "Welcome " + err.message,
        duration: 3000
      }).present();
    })
  }

  goToSignup(){
    this.navCtrl.push(SignUpPage);
  }

}
