import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {ShowPage} from "../show/show";


@Component({
  selector: 'page-allshows',
  templateUrl: 'allshows.html'
})
export class AllshowsPage {

 public allshows: any;
 static apiBase = 'https://rails-tvdweller-app-sashadif.c9users.io';
  constructor(public http: Http, public navCtrl: NavController,
  	public authProvider: AuthProvider,) {
    this.shows();
  }


  logout(){
    this.authProvider.logout().then((res) => {
      console.log("Logged out");
      this.navCtrl.setRoot(LoginPage, {loggedOut: true});
    }, (err) => {
      console.log("error");
    });
  }

  shows(){
    return new Promise((resolve, reject) => {
      this.http.get(AuthProvider.apiBase + '/shows')
        .subscribe(data => {
          this.allshows = data.json();
          console.log(this.allshows);
          this.allshows = Array.from(this.allshows);
          resolve(this.allshows);
        }, (err) => {
          reject(err);
        });
    });
  }

  goToShowPage(id: number){
    this.navCtrl.push(ShowPage, {id: id});
    
  }
}
