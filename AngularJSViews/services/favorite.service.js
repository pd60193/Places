(function ()
{
    'use strict';

    angular
        .module('TES.Services')
        .service("FavoriteService", ['$q', '$http', FavoriteService]);

    function FavoriteService($q, $http)
    {
        var self = this;
        self.IsLocalStorage = function()
        {
            if (typeof(Storage) !== "undefined") {
                return true;
                // Code for localStorage/sessionStorage.
            } else {
                return false;
                // Sorry! No Web Storage support..
            }
        }
        self.isEmpty = function()
        {
            var favorite = self.getFavorties();
            if(favorite == null || favorite.results == null || favorite.results.length == 0)
                return true;
            return false;
        }
        self.getFavorties = function()
        {
            if(!self.IsLocalStorage())
                return;
            var jsonResponse = localStorage.getItem("favorites");
            if(jsonResponse == null)
                return null;
            else
                return JSON.parse(jsonResponse);
        }
		
        self.setFavorties = function(place)
        {
            //self.setStarToYellow($event);
            //$state.go('main.favorites');
            if(!self.IsLocalStorage())
                return;
            
            var favorite = self.getFavorties() || {};
            if(favorite.results == null)
                favorite.results = [];
            for(var i =0 ;i<favorite.results.length;i++)
            {
                if(favorite.results[i].place_id == place.place_id)
                {
                    return;
                }
            }
            favorite.results.push(place);
            localStorage.setItem("favorites",JSON.stringify(favorite));
        }
        self.removeFavorites = function(place)
        {
            if(!self.IsLocalStorage())
                return;
            place.fav =false;
            var favorite = self.getFavorties() || {};
            if(favorite.results == null)
                favorite.results = [];
            
            for(var i =0 ;i<favorite.results.length;i++)
            {
                if(favorite.results[i].place_id == place.place_id)
                {
                    favorite.results.splice(i, 1);
                    localStorage.setItem("favorites",JSON.stringify(favorite));
                    break;
                }
            }
            return favorite.results;
        }
	}

})();