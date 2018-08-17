(function ()
{
    'use strict';

    angular
        .module('TES.Services')
        .service("GoogleService", ['$q', '$http', GoogleService]);

    function GoogleService($q, $http)
    {
		this.getGooglePlaces = function (payload)
        {
            var obj = {
                method: "POST",
                url: "api/GoogleService/GetPlaces",
                data: payload,
                cache: false
            }
            return $http(obj);
        } 
        this.getGooglePlacesGET = function (payload)
        {
            var obj = {
                method: "GET",
                url: "api/GoogleService/GetPlacesGET?"+jQuery.param( payload ),
                data: payload,
                cache: false
            }
            return $http(obj);
        }  
        this.getNextPageGooglePlaces = function(payload)
        {
            var obj = {
                method: "POST",
                url: "api/GoogleService/GetNexPlaces",
                data: {pagetoken:payload},
                cache: false
            }
            return $http(obj);
        }
        this.getGeocode = function(payload)
        {
            var obj = {
                method: "POST",
                url: "api/GoogleService/GetGeocode",
                data: {address:payload},
                cache: false
            }
            return $http(obj);
        }
        
	}

})();