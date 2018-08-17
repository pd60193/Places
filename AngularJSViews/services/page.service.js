(function ()
{
    'use strict';

    angular
        .module('TES.Services')
        .service("PageService", ["GoogleService",PageService]);

    function PageService(GoogleService)
    {
        var self = this;
        self.pageNumber = 0;
        self.nextPageToken = null; 
        self.pageResultsMap = [];
        self.GoogleService = GoogleService;
        self.numberOfPages = function()
        {
            return self.pageResultsMap.length;    
        }
        
        self.resetPageService = function()
        {
            self.pageNumber = 0;
            self.nextPageToken = null; 
            self.pageResultsMap = [];
        }   
        self.isLastPage = function()
        {
            return (self.pageNumber && self.pageNumber==self.pageResultsMap.length);
        }
        self.nextPageCallback = function(response)
        {
            if (response)
            {
                var retVal = response.data.results || [];
                if(response.data.next_page_token)
                    self.nextPageToken = response.data.next_page_token;
                else
                   self.nextPageToken = null; 
                
                self.pageNumber = self.pageNumber + 1;
                self.pageResultsMap[self.pageNumber - 1] = retVal;
                return retVal;
            }
        }
		self.getNextPage = function()
        {
            if(self.nextPageToken && self.pageNumber && self.pageNumber==self.pageResultsMap.length )
            { 
                // self.isFirstPage = false;  
                return  self.GoogleService.getNextPageGooglePlaces(self.nextPageToken).then(self.nextPageCallback, function (e)
                {
                    self.handleError(e);
                });
            }
            else
            {
                self.pageNumber = self.pageNumber+1;
                return self.getCurrentPage();
            }
        }
        self.getPrevPage = function()
        {
            if(self.pageNumber >= 1)
            { 
                self.pageNumber = self.pageNumber-1; 
                return self.getCurrentPage();
            }
        }
        self.getCurrentPage = function()
        {
            return self.pageResultsMap[self.pageNumber-1];
        }
	}

})();