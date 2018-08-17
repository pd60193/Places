(function ()
{
    'use strict';

    angular
        .module('TES.Services')
        .service("UtilService", ['$q', '$http', UtilService]);

    function UtilService($q, $http)
    {
		this.getLatLong = function ()
        {
            var obj = {
                method: "GET",
                url: "http://ip-api.com/json",
                cache: false
            }
            return $http(obj);
        }
	}

})();