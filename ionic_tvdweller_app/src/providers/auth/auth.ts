import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public authHeaders: any;
  public currentUser: any;
  // static apiBase = 'https://bagsaway-antony-veedsred.c9users.io/api/for_drivers';
  static apiBase = 'https://rails-tvdweller-app-sashadif.c9users.io';
  constructor(public http: Http, public storage: Storage) {

  }

  validate(){

    return new Promise((resolve, reject) => {

      this.storage.get('headers').then((value) => {
        this.authHeaders = value;

        this.http.get(AuthProvider.apiBase + '/auth/validate_token', {headers: this.getHeaders()})
          .subscribe(res => {
            this.storeData(res);
            resolve(res.json());
          }, (err) => {
            this.resetData();
            reject(err);
          });

      });

    });

  }

  sign_up(credentials){

    return new Promise((resolve, reject) => {

      this.http.post(AuthProvider.apiBase + '/auth', {user: credentials})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });

  }

  login(credentials){

    return new Promise((resolve, reject) => {

      this.http.post(AuthProvider.apiBase + '/auth/sign_in', credentials)
        .subscribe(res => {
          this.storeData(res);
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });

  }

  logout(){
    return new Promise((resolve, reject) => {
      this.http.delete(AuthProvider.apiBase + '/auth/sign_out', {headers: this.getHeaders()})
        .subscribe(res => {
          this.resetData();
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    })
  }

  getHeaders(){
    let headers = new Headers();
    if(this.authHeaders){
      Object.keys(this.authHeaders).forEach(key => {
        headers.append(key, this.authHeaders[key])
      });
    }
    return headers
  }

  private storeData(res){
    this.authHeaders = {
      'access-token': res.headers.get('access-token'),
      'client': res.headers.get('client'),
      'uid': res.headers.get('uid'),
      'token-type': res.headers.get('token-type'),
    };
    console.log(this.authHeaders)
    this.currentUser = res.json().data;

    this.storage.set('headers', this.authHeaders);
    this.storage.set('current-user', this.currentUser);
  }

  private resetData(){
    this.storage.set('headers', '');
    this.storage.set('current-user', '');
  }

}
