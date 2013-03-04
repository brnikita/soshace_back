angular.module('soshace', []).
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: '/views/index.html',   controller: Index}).
        when('/addPost', {templateUrl: '/views/addPost.html', controller: AddPost}).
        otherwise({redirectTo: '/'});
}]);




