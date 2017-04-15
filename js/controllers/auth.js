angular
.module('app')
.controller('AuthCtrl', AuthCtrl)


function AuthCtrl($auth, $state, $scope, $rootScope, $http) {

          $scope.login_error = false;
          $scope.login = function() {

              var credentials = {
                  email: $scope.auth.email,
                  password: $scope.auth.password
              }


              $auth.login(credentials)
              .then(function(response) {
                    $state.go('app.main', {});
              })
                .catch(function(response) {
                  $scope.login_error = true;
              $scope.error_message = response.error;
                });


                $auth.login(credentials).then(function() {

                  return $http.get('http://localhost:8888/bigfive/ADMD/admd-backend/public/api/authenticate');


      // Handle errors
      }, function(error) {
          $scope.login_error = true;

      // Because we returned the $http.get request in the $auth.login
      // promise, we can chain the next promise to the end here
      }).then(function(response) {
        // Return an $http request for the now authenticated
        // user so that we can flatten the promise chain

        var user = JSON.stringify(response.data.user);

        // Set the stringified user data into local storage
        localStorage.setItem('user', user);

        // The user's authenticated state gets flipped to
        // true so we can now show parts of the UI that rely
        // on the user being logged in
        $rootScope.authenticated = true;

        // Putting the user's data on $rootScope allows
        // us to access it anywhere across the app
        $rootScope.currentUser = response.data.user;

        // Everything worked out so we can now redirect to
        // the users state to view the data
        $state.go('app.main');

      });
  }




  $scope.logout = function() {

        $auth.logout().then(function() {

            // Remove the authenticated user from local storage
            localStorage.removeItem('user');

            // Flip authenticated to false so that we no longer
            // show UI elements dependant on the user being logged in
            $rootScope.authenticated = false;

            // Remove the current user info from rootscope
            $rootScope.currentUser = null;

            // Go to login
              $state.go('appSimple.login');
        });
    }


}
