var db = new Firebase('https://stevenross.firebaseIO.com/website'),
    contactDb = db.child('contact'),
    app = angular.module('main', []);

app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
            when('/', {
                    templateUrl: 'partials/who.html'
                }).
            when('/lab', {
                    templateUrl: 'partials/lab.html'
                }).
            otherwise({
                    redirectTo: '/'
                });
        }
    ]);

app.controller('NavCtrl', ['$scope', '$location',
        function ($scope, $location) {

        	// Used in ng-class expression to highlight active link
            $scope.currentPath = function () {
                return $location.path();
            };
        }
    ]);

app.controller('ContactCtrl', ['$scope',

		// Simple contact form submission handler
        function ($scope) {
        	$scope.sent = false;
            $scope.submit = function (data) {
                data.time = new Date().toString();
                contactDb.push(data);
                $scope.sent = true;
            };
        }
    ]);

// Each popover need to be initialised manually from the bootstrap javascript library
app.directive('popover', function () {
        return function (scope, elem) {
            elem.popover();
        };
    });

// A animated scroll to the contact form in the footer on click
app.directive('contactscroll', function () {
        return function (scope, elem) {
            var i = $('form[name="contactform"] input:first');
            elem.click(function (e) {
                    e.preventDefault();
                    $('html, body').animate({
                            scrollTop: i.offset().top
                        }, 2000, function () {
                            i.focus();
                        });
                    return false;
                });
        };
    });

// An attempt to hide me email from spam bots
app.directive('emailhide', function () {
        return function (scope, elem, attrs) {
            elem.html("<a href='mailto:post" + "@" + "stevenross.me'>post" + "&#64;" + "stevenross.me</a>");
        };
    });