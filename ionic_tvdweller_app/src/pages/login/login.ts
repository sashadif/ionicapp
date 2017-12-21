import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignUpPage } from '../sign_up/sign_up';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {

    if (!this.navParams.get('loggedOut')){
      this.showLoader();

      //Check if already authenticated
      this.authService.validate().then((res) => {
        console.log("Already authorized");
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }, (err) => {
        console.log(err);
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Not Authorized!',
          subTitle: err.json().errors[0],
          buttons: ['OK']
        });
        alert.present();
      });
    }
  }

  login(){

    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Not Authorized!',
        subTitle: err.json().errors[0],
        buttons: ['OK']
      });
      alert.present();
    });

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

  goToSignUp(){

    this.navCtrl.push(SignUpPage);

  }

}
