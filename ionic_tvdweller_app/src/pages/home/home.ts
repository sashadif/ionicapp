import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
  	public authProvider: AuthProvider,) {

  }


  logout(){
    this.authProvider.logout().then((res) => {
      console.log("Logged out");
      this.navCtrl.setRoot(LoginPage, {loggedOut: true});
    }, (err) => {
      console.log("error");
    });
  }

}
