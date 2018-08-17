const axios = require("axios");
function getRequest(url,authToken) {
  try {
    var instance;
    if(authToken == null)
      instance =axios.create();
    else
      instance =axios.create({
        headers: {'Authorization': 'Bearer '+authToken}
      });
    
    const response = instance.get(url);
    //console.log(response);
    // response.then(function (response) {
    //   return response;
    // }).catch(function (error) {
    //   return error;
    // });
    return response;
	 
  } catch (error) {
    console.error(error);
    console.error("Error Occurred");
    return error;
  }
}
function postRequest(url,data) {
  try {
    const response = axios.post(url,data);
    console.log(response);
	  return response;
  } catch (error) {
    console.error(error);
	return error;
  }
}
module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;