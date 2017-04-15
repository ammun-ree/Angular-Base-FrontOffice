// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

angular
.module('app', [
  'ui.router',
  'oc.lazyLoad',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'satellizer'
])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 1;
}])
.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
  $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams
                                                  , fromState, fromParams) {

       var isLogin = toState.name === "appSimple.login";
       if(isLogin){
          return; // no need to redirect
       }

       // now, redirect only not authenticated

       var userInfo =  JSON.parse(localStorage.getItem('user'));


       if(userInfo === null) {
           e.preventDefault(); // stop current execution
           $state.go('appSimple.login'); // go to login
       }else {
         // The user's authenticated state gets flipped to
                 // true so we can now show parts of the UI that rely
                 // on the user being logged in
                 $rootScope.authenticated = true;

                 // Putting the user's data on $rootScope allows
                 // us to access it anywhere across the app. Here
                 // we are grabbing what is in local storage
                 $rootScope.currentUser = userInfo;
       }
   });
  $rootScope.$on('$stateChangeSuccess',function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}]);
