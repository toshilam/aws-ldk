var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function(){
	
	var PromiseVO = function(inID, inData, inResolve, inReject)
	{
		this.initialize(inID, inData, inResolve, inReject);
	}
	
	var p = PromiseVO.prototype = Object.create( ocs.VO.prototype);
	
	p.data;
	p.resolve;
	p.reject;
	
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inData, inResolve, inReject)
	{
		this.VO_initialize(inID);
		
		this.data = inData;
		this.resolve = inResolve;
		this.reject = inReject;
	}
	
	/*p.toString = function(inToResultString)
	{
		if(inToResultString === true)
		{
			return JSON.stringify({service:this.service, code:this.code, result:this.result});
		}
		
		return "[Object PromiseVO( {0}, {1}, {2} )]".format([this.service, this.code, this.result]);
	}*/
	
	
	
ocs.PromiseVO = PromiseVO;
}());
