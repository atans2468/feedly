import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import {FeedPage} from '../feed/feed';

import firebase from 'firebase';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  name: string = "";
  email: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp(){
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((info) => {
      
      let newUser: firebase.User = info.user;
      
      newUser.updateProfile({
        displayName: this.name,
        photoURL: ""
      }).then(() => {
        
        this.alertCtrl.create({
          title: "Account Created",
          message: "Your account has been created successfully",
          buttons: [
            {
              text: "Ok",
              handler: () => {
                //Navigate into app
                this.navCtrl.setRoot(FeedPage);
              }
            }
          ]
        }).present();

      }).catch((err) => {
        this.toastCtrl.create({
          message: "Welcome " + err.message,
          duration: 3000
        }).present();
      })

    }).catch((err) => {
      this.toastCtrl.create({
        message: "Welcome " + err.message,
        duration: 3000
      }).present();
    })
  }

  goBack(){
    this.navCtrl.pop();
  }

}
