(function ()
{
    'use strict';

    angular
         .module("TES.Controllers")
          .controller('TESDetailsController', ['$q', '$scope', '$state', '$location','GoogleService','DataFactory','FavoriteService',TESDetailsController]);

    function TESDetailsController($q, $scope, $state, $location,GoogleService,DataFactory,FavoriteService)
    {
        var self = this;
        self.DataFactory = DataFactory;
        self.FavoriteService = FavoriteService;
        self.DataFactory.startAnimation = false;
        self.goToList = function()
        {
            if(self.DataFactory.isFavTab == null || self.DataFactory.isFavTab == false)
            {
                $state.go('main.results');
            }
            else
            {
                $state.go('main.favorites');
            }
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
                self.FavoriteService.removeFavorites(place);
            
        }
        self.getPhotos = function()
        {
            $state.go('main.details.photos');
        }
        self.getInfo = function()
        {
            $state.go('main.details.info');
        }
        self.getMap = function()
        {
            $state.go('main.details.map');
        }
        self.getReviews = function()
        {
            $state.go('main.details.reviews');
        }
        if (!self.DataFactory.selectedPlace)
        {
            $state.go('main');
        }
        

    }
})();

