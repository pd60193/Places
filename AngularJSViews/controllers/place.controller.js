(function ()
{
    'use strict';

    angular
         .module("TES.Controllers")
          .controller('TESPlaceController', ['$q','$window', '$scope','$rootScope', '$state', '$location','GoogleService','DataFactory','CommonFactory',
                                                            'PageService','FavoriteService', TESPlaceController]);

    function TESPlaceController($q, $window,$scope,$rootScope ,$state, $location,GoogleService,DataFactory,CommonFactory,PageService,FavoriteService)
    {
        var self = this;
        self.GoogleService = GoogleService;
        self.DataFactory = DataFactory;
        self.CommonFactory =CommonFactory;
        self.PageService = PageService;
        self.FavoriteService =FavoriteService;
        if(self.DataFactory.startAnimation!==false && self.DataFactory.startAnimation ==null)
            self.DataFactory.startAnimation = false;
        
        
        self.max = function(a, b)
        {
            return a>b?a:b;
        }
        self.toggleFavorite = function(place)
        {
            if(place["fav"]  == false)
                place["fav"]  = true;
            else
                place["fav"] =false;
            if(place["fav"] == true)
                self.FavoriteService.setFavorties(place);
            else
            {
                // if(self.DataFactory.selectedPlace && (place.place_id == self.DataFactory.selectedPlace.place_id))
                //     self.DataFactory.selectedPlace = null;
                self.FavoriteService.removeFavorites(place);
            }
            
        }
        self.moreDetails = function(place)
        {
            self.DataFactory.selectedPlace = place;
            //$window.tableShown = false;
            $state.go('main.details.info');
            
        }
        self.loadMoreDetails = function()
        {
            if(self.DataFactory.prevState == 'info')
                $state.go('main.details.info');
            else if(self.DataFactory.prevState == 'map')
                $state.go('main.details.map');
            else if(self.DataFactory.prevState == 'photos')
                $state.go('main.details.photos');
            else if(self.DataFactory.prevState == 'reviews')
                $state.go('main.details.reviews');
            
        }
        self.setStarsInResult = function(response)
        {
            console.log(response);
            
            if(response == null)
                return [];
            var favorite = self.FavoriteService.getFavorties() || {};
            if(favorite.results == null)
                favorite.results = [];
            
            for(var i =0 ;i<response.length;i++)
            {
                response[i].fav =false;
                for(var j =0 ;j<favorite.results.length;j++)
                {
                //response[i].
                    if(favorite.results.length == 0)
                        break;
                    if(response[i].place_id == favorite.results[j].place_id)
                    {
                       response[i].fav =true;
                    }
                }
            }
            return response;
        }
        self.setResultFromResponse =function(response)
        {
            
            
            if (response)
            {
                for(var i =0 ;i<response.length;i++)
                {
                    response[i]["fav"] = false;
                }
                
                self.places = self.setStarsInResult(response);
            }
            
            
        }
        self.fetchNextPage = function()
        {
            var nextPage = self.PageService.getNextPage(); 
            if (typeof nextPage.then === 'function') {
                // probably a promise
                nextPage.then(self.setResultFromResponse);
            } else {
                // definitely not a promise
                self.setResultFromResponse(nextPage);
            }
            
        }
        self.fetchPreviousPage = function()
        {
            
            self.places = self.PageService.getPrevPage();
        }
        self.searchResults = function(searchParams)
        {
            
            if (!self.DataFactory.searchParams.keyword || !self.DataFactory.searchParams.type)
                return;
            if((self.DataFactory.isCurrentLocation == false && self.DataFactory.searchParams.address=="" && 
                !self.DataFactory.searchParams.location))
                return;
            if(self.DataFactory.searchParams.location == null)
            {
                $rootScope.displayLoader = true;
                $rootScope.valuenow = 50;
                self.DataFactory.geocodePromise.then(function(results){
                    console.log(results);
                    if(results.status == 200 && results.data && results.data!="" && results.data.results && results.data.results.length>0)
                    {
                        self.DataFactory.searchParams.location = results.data.results[0].geometry.location.lat+","+results.data.results[0].geometry.location.lng;
                        self.PageService.resetPageService();
                        self.CommonFactory.showProgressBar(self.GoogleService.getGooglePlaces(searchParams).then(self.PageService.nextPageCallback,
                            function (e)
                            {
                                self.places = null;
                                console.log(error);
                            })
                        .then(self.setResultFromResponse));
                    }
                    else
                    {
                        $rootScope.displayLoader = false;
                        self.places= [];
                    }
                        
                    self.DataFactory.searchParams = null;
                },function(error)
                {
                    $rootScope.displayLoader = false;
                    self.places = null;
                    console.log(error);
                });

            }
            else
            {
                self.PageService.resetPageService();
                self.CommonFactory.showProgressBar(self.GoogleService.getGooglePlaces(searchParams).then(self.PageService.nextPageCallback,
                    function (e)
                    {
                        self.handleError(e);
                    })
                .then(self.setResultFromResponse));
                self.DataFactory.searchParams = null;
            }
        }
        if (self.DataFactory.searchParams == null && self.PageService.numberOfPages() != 0 && self.DataFactory.clearSet!=1)
        {
            self.places = self.setStarsInResult(self.PageService.getCurrentPage());
            setTimeout(function () {
                if(self.DataFactory.startAnimation == true)
                {
                    self.DataFactory.startAnimation = false;
                }
            });
        }
        else if (self.DataFactory.searchParams && self.DataFactory.clearSet!=1)
        {
            self.PageService.resetPageService();
            self.searchResults(self.DataFactory.searchParams);
            
        }
        else
            $state.go('main');

    }
})();

