(function ()
{
    'use strict';

    angular
         .module("TES.Controllers")
          .controller('TESFavoriteController', ['$q', '$scope', '$state', '$location','GoogleService','DataFactory','CommonFactory',
                                                            'PageService','FavoriteService', TESFavoriteController]);

    function TESFavoriteController($q, $scope, $state, $location,GoogleService,DataFactory,CommonFactory,PageService,FavoriteService)
    {
        var self = this;
        self.GoogleService = GoogleService;
        self.DataFactory = DataFactory;
        self.CommonFactory =CommonFactory;
        self.PageService = PageService;
        self.FavoriteService = FavoriteService;
        // self.PageService.resetPageService();
      
        self.loadMoreDetails = function()
        {
            //$window.tableShown = false;
            if(self.DataFactory.prevState == 'info')
                $state.go('main.details.info');
            else if(self.DataFactory.prevState == 'map')
                $state.go('main.details.map');
            else if(self.DataFactory.prevState == 'photos')
                $state.go('main.details.photos');
            else if(self.DataFactory.prevState == 'reviews')
                $state.go('main.details.reviews');
        }
        self.moreDetails = function(place)
        {
            self.DataFactory.selectedPlace = place;
            $state.go('main.details.info');
        }
        self.toggleFavorite = function(place)
        {
            // $($event.currentTarget.children[0]).attr('class','fas fa-star');
            // $($event.currentTarget).addClass("yellow");
            if(self.DataFactory.selectedPlace && (place.place_id == self.DataFactory.selectedPlace.place_id))
                self.DataFactory.selectedPlace = null;
            self.places  = self.FavoriteService.removeFavorites(place);
        }
        self.setResultFromResponse =function()
        {
            var favorite = self.FavoriteService.getFavorties() || {};
            if(favorite.results == null)
                favorite.results = [];
            
            self.places = favorite.results || [];   
            setTimeout(function () {
            if(self.DataFactory.startAnimation == true)
            {
                self.DataFactory.startAnimation = false;
            }
            });
        }
        
        if (self.FavoriteService.IsLocalStorage() != false && self.DataFactory.searchParams == null && self.DataFactory.isFavTab== true)
            self.setResultFromResponse();
        else
            $state.go('main');

    }
})();

