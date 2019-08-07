var AuthUser = (function() {
  // var refreshToken = "";

  var getToken = function() {
    return JSON.parse(localStorage.getItem("_auth"))["refreshToken"]; // Or pull this from cookie/localStorage
  };

  var setToken = function(token) {
    // refreshToken = token;
    localStorage.setItem("refreshToken", JSON.stringify(token));
    // Also set this in cookie/localStorage
  };

  return {
    getToken: getToken,
    setToken: setToken
  };
})();

export default AuthUser;
