angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider) {
   $routeProvider
   .when('/home', {
      templateUrl: 'app/views/pages/home.html'
   })
   .when('/', {
      templateUrl: 'app/views/pages/about.html'
   })
   .otherwise()
});
