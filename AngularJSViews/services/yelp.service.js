(function ()
{
    'use strict';

    angular
        .module('TES.Services')
        .service("YelpService", ['$q', '$http', YelpService]);

    function YelpService($q, $http)
    {
        this.getMatch = function (payload)
        {
            var obj = {
                method: "POST",
                url: "api/YelpService/match",
                data: payload,
                cache: false
            }
            return $http(obj);
        }
        this.getYelpReviews = function (payload)
        {
            var obj = {
                method: "POST",
                url: "api/YelpService/reviews",
                data: payload,
                cache: false
            }
            return $http(obj);
        }    
	}

})();