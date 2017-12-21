import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {ProfilePage} from "../profile/profile";

interface IShow{
  id:number,
  title: string,
  director: string,
  year: string,
  description: string,
  image: string,
}

@Component({
  selector: 'page-show',
  templateUrl: 'show.html'
})
export class ShowPage {

 img: string;
 classAdd: string;
 classRemove: string = 'non-active';
 public myshows: any;
 static apiBase = 'https://rails-tvdweller-app-sashadif.c9users.io';
 show: IShow;
  constructor(public http: Http,
              public navCtrl: NavController,
              public navParams: NavParams,
  	          public authProvider: AuthProvider,) {
    this.showdetails();
  }


  logout(){
    this.authProvider.logout().then((res) => {
      console.log("Logged out");
      this.navCtrl.setRoot(LoginPage, {loggedOut: true});
    }, (err) => {
      console.log("error");
    });
  }

  showdetails(){
    return new Promise((resolve, reject) => {
      let url = AuthProvider.apiBase + '/shows/' + this.navParams.get('id');
      let response = this.http.get(url).map(res => res.json());
        response.subscribe(data => {
          if (data.hasOwnProperty('id')){
            this.show = data;
            this.img = data.image;
          }
          console.log(this.show.image);
          //this.title = this.show.title;
          resolve(this.show);
        }, (err) => {
          reject(err);
        });
    });

  }
  addToUser(){
     return new Promise((resolve, reject) => {
      let url = AuthProvider.apiBase + '/shows/' + this.navParams.get('id') + '/add';
      let response = this.http.post(url, {id: this.navParams.get('id'), user:this.authProvider.currentUser.id});
        response.subscribe(res => {
          console.log('ok');
         // resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
    
  }

  addClass(){
    this.classAdd = 'non-active';
    this.classRemove = '';
  }

  removeClass(){
    this.classRemove = 'non-active';
    this.classAdd = '';
  }

  removeFromUser(){
     return new Promise((resolve, reject) => {
      let url = AuthProvider.apiBase + '/shows/' + this.navParams.get('id') + '/remove';
      let response = this.http.post(url, {id: this.navParams.get('id'), user:this.authProvider.currentUser.id});
        response.subscribe(res => {
          console.log('ok');
         // resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
    
  }
}