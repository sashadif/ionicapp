import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {ShowPage} from "../show/show";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  username: string;
  public myshows: any;
  constructor(public http: Http, public navCtrl: NavController,
  	public authProvider: AuthProvider,) {
    this.username = this.authProvider.currentUser.name;
    this.getShows();
  }


  logout(){
    this.authProvider.logout().then((res) => {
      console.log("Logged out");
      this.navCtrl.setRoot(LoginPage, {loggedOut: true});
    }, (err) => {
      console.log("error");
    });
  }

  getShows(){
    return new Promise((resolve, reject) => {
      this.http.get(AuthProvider.apiBase + '/users/'+ this.authProvider.currentUser.id + "/show")
        .subscribe(data => {
          this.myshows = data.json();
          console.log(this.myshows);
          this.myshows = Array.from(this.myshows);
          resolve(this.myshows);
        }, (err) => {
          reject(err);
        });
    });
  }

  goToShowPage(id: number){
    this.navCtrl.push(ShowPage, {id: id});
    
  }

  removeFromUser(id: number){
     return new Promise((resolve, reject) => {
      let url = AuthProvider.apiBase + '/shows/' + id + '/remove';
      let response = this.http.post(url, {id: id, user:this.authProvider.currentUser.id});
        response.subscribe(res => {
          console.log('ok');
         // resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
    
  }

}
