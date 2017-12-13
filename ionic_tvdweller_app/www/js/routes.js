angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  //$httpProvider.defaults.withCredentials = true;
// $urlRouterProvider.otherwise('/home');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

  .state('tVdweller.profile', {
    url: '/profile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('tVdweller.calendar', {
    url: '/calendar',
    views: {
      'side-menu21': {
        templateUrl: 'templates/calendar.html',
        controller: 'calendarCtrl'
      }
    }
  })

  .state('tVdweller.shows', {
    url: '/shows',
    views: {
      'side-menu21': {
        templateUrl: 'templates/shows.html',
        controller: 'showsCtrl'
      }
    }
  })

  .state('tVdweller', {
    url: '/side-menu21',
    templateUrl: 'templates/tVdweller.html',
    controller: 'tVdwellerCtrl'
  })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

$urlRouterProvider.otherwise('/login')


});