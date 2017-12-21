import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign_up',
  templateUrl: 'sign_up.html',
})

export class SignUpPage {

  name: string;
  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {

  }

  sign_up(){

    this.showLoader();

    let credentials = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.sign_up(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(LoginPage);
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Not Signed up!',
        subTitle: err.json().errors[0],
        buttons: ['OK']
      });
      alert.present();
    });

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Signing up...'
    });

    this.loading.present();

  }

}
