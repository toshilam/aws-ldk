var _ = require('underscore');
var ocs;
module.exports = ocs = require('../../');

(function(){
	
	var UserVOService = function()
	{
		throw 'UserVOService cannot be instantiated.';
	}
	
	UserVOService.hasError = function(inData/*:Object*/)//:Boolean
	{
		return !(inData instanceof ocs.ResultVO) || String(inData.code) != ocs.ServicesErrorID.NONE;
	}
	
	
ocs.UserVOService = UserVOService;
}());
