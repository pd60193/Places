(function ()
{
    'use strict';

    angular
        .module('TES.Factories')
            .factory('DataFactory', [DataFactory]);

    function DataFactory()
    {
        var searchParams;
        var isCurrentLocation;
        var reviews;
        var yelpRequest;
        var isFavTab;
        var showResults;
        var showDetails;
        var showFavs;
        var today;
        var clearSet;
        return {
            reviews:reviews,
            searchParams: searchParams,
            isCurrentLocation : isCurrentLocation,
            yelpRequest : yelpRequest,
            isFavTab:isFavTab,
            showResults:showResults,
            showDetails:showDetails,
            showFavs:showFavs,
            today:today,
            clearSet:clearSet
        };
    }

})();