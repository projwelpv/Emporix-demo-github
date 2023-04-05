const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    localStorage.setItem("access_token", tokenObj);
    localStorage.setItem("refresh_token", tokenObj);
  }
  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }
  function _getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  function _setUserToken(tokenObj) {
    localStorage.setItem("user_token", tokenObj);
  }
  function _getUserToken() {
    return localStorage.getItem("user_token");
  }
  function _setSaasToken(tokenObj) {
    localStorage.setItem("sass_token", tokenObj);
  }
  function _getSaasToken() {
    return localStorage.getItem("sass_token");
  }
  function _setCustId(tokenObj) {
    localStorage.setItem("custId", tokenObj);
  }
  function _getCustId() {
    return localStorage.getItem("custId");
  }
  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_token");
    localStorage.removeItem("sass_token");
    localStorage.removeItem("custId");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    setUserToken: _setUserToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    getUserToken: _getUserToken,
    setSaasToken:_setSaasToken,
    getSaasToken:_getSaasToken,
    setCustId:_setCustId,
    getCustId:_getCustId
  };
})();
export default LocalStorageService;
