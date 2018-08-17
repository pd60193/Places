(function ()
{
    'use strict';
    angular
      .module('TES')
      .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$provide', registerRoutes])
      .run(function ($rootScope)
      {
        $rootScope.displayLoader = false;
        $rootScope.valuenow = 50;
      });

    function registerRoutes($stateProvider, $locationProvider, $urlRouterProvider, $provide)
    {
        
        $stateProvider.state('main', {  
             
            url: "/",
            views: {
               
                'searchView': {
                    controller: 'TESSearchController',
                    controllerAs: 'tes',
                    templateUrl: "../AngularJSViews/partials/partials.search.html"
                    }
                }
        });
       $stateProvider.state('main.results', {
            url: "results/",
            views:{
                'resultsView@':{
                    controller: 'TESPlaceController',
                    controllerAs: 'pc',
                    templateUrl: "../AngularJSViews/partials/place.partials.html"
                }
                    
            },
            data: { transition: 'slide-container'}
        });
        $stateProvider.state('main.details', {
            url: "details/",
            views:{
                'resultsView@':{
                    controller: 'TESDetailsController',
                    controllerAs: 'dc',
                    templateUrl: "../AngularJSViews/partials/partials.details.html"
                }     
            },
            data: { transition: 'slide-container'}
            
        });
        $stateProvider.state('main.details.info', {
            url: "info/",
            views:{
                'detailsView':{
                    controller: 'TESDetailsInfoController',
                    controllerAs: 'dic',
                    templateUrl: "../AngularJSViews/partials/partials.details.info.html"
                }     
            }
            
        });
        $stateProvider.state('main.details.photos', {
            url: "photos/",
            views:{
                'detailsView':{
                    controller: 'TESDetailsPhotoController',
                    controllerAs: 'dpc',
                    templateUrl: "../AngularJSViews/partials/partials.details.photos.html"
                }     
            }
            
        });
        $stateProvider.state('main.details.map', {
            url: "map/",
            views:{
                'detailsView':{
                    controller: 'TESDetailsMapController',
                    controllerAs: 'dmc',
                    templateUrl: "../AngularJSViews/partials/partials.details.map.html"
                }     
            }
            
        });
        $stateProvider.state('main.details.reviews', {
            url: "reviews/",
            views:{
                'detailsView':{
                    controller: 'TESDetailsReviewsController',
                    controllerAs: 'dmr',
                    templateUrl: "../AngularJSViews/partials/partials.details.reviews.html"
                }     
            }
            
        });
        $stateProvider.state('main.favorites', {
            url: "favorites/",
            views:{
                'resultsView@':{
                    controller: 'TESFavoriteController',
                    controllerAs: 'pc',
                    templateUrl: "../AngularJSViews/partials/place.partials.html"
                }     
            }
            
            
        });
        //templateUrl: "AngularJSViews/partials/partials.search.html"
        

        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode({
          enabled: true
        });
    }
})();
