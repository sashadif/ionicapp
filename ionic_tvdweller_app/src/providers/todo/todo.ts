import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthProvider } from "../auth/auth";
import 'rxjs/add/operator/map';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TodoProvider {

  // private base = 'https://bagsaway-antony-veedsred.c9users.io/api/for_drivers';
  private base = 'https://bagsaway.ca/api/for_drivers';
  constructor(public http: Http, public authProvider: AuthProvider) {

  }

  queryTodos() {
    let url = this.base + '/todos';
    let response = this.http.get(url, {headers: this.authProvider.getHeaders()}).map(res => res.json());
    return response;
  }

  queryAtDate(date){
    let url = this.base + '/todos/at_date?when=' + encodeURIComponent(date);
    let response = this.http.get(url, {headers: this.authProvider.getHeaders()}).map(res => res.json());
    return response;
  }

  queryAfterDate(date){
    let url = this.base + '/todos/after_date?when=' + encodeURIComponent(date);
    let response = this.http.get(url, {headers: this.authProvider.getHeaders()}).map(res => res.json());
    return response;
  }

  track(data) {
    // let url = 'http://bagsaway-drive-admin.herokuapp.com/pages/track';
    // let url = 'http://ec2-54-200-237-232.us-west-2.compute.amazonaws.com/main/track';
    let url = 'http://localhost:3000/main/track';
    console.log('*****TRACKING DATA****');
    console.log(data);
    let response = this.http.post(url, {driver: data}, {headers: this.authProvider.getHeaders()}).subscribe(data => {
    }, error => {
      console.log(error);
    });
    return response;
  }
}
