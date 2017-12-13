angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
.factory('Show', function($resource) {
  return $resource("https://rails-tvdweller-app-sashadif.c9users.io/shows/:id.json");
})
.factory('UserSession', function($resource) {
  return $resource("https://rails-tvdweller-app-sashadif.c9users.io/users/sign_in.json");
})
.service('BlankService', [function(){

}]);