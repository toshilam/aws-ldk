var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');
( function() {

	
	var ServiceResponse = function(inRequest, inData) 
	{
		this.initialize(inRequest, inData);
	}
	
	var p = ServiceResponse.prototype;
	
	p.request;
	p.data;
	
	
	p.initialize = function(inRequest, inData)
	{
		this.request = inRequest;
		this.data = inData;
	}
	
	p.toString = function()
	{
		return "[object ServiceResponse]";
	}
	
	p.toInfoString = function()
	{
		return ocs.Tools.objectToString(this);
	}

ocs.ServiceResponse = ServiceResponse;
}());
