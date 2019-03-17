var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function(){
	
	var ResultVO = function(inID, inService, inCode, inResult, inUniqueID)
	{
		this.initialize(inID, inService, inCode, inResult, inUniqueID);
	}
	
	var p = ResultVO.prototype = Object.create( ocs.VO.prototype);
	
	p.service;
	p.code;
	p.result;
	p.uniqueID; //this unique created by ServiceConnection, and returned by server
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inService, inCode, inResult, inUniqueID)
	{
		this.VO_initialize(inID);
		this.service = inService;
		this.code = inCode;
		this.result = inResult;
		this.uniqueID = inUniqueID;
	}
	
	p.toObject = function()
	{
		return {service:this.service, code:this.code, result:this.result};
	}
	
	p.toString = function(inToResultString)
	{
		if(inToResultString === true)
		{
			return JSON.stringify(this.toObject());
		}
		
		return "[Object ResultVO( {0}, {1}, {2} )]".format([this.service, this.code, this.result]);
	}
	
	
ocs.ResultVO = ResultVO;
}());
