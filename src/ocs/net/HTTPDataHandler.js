var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

( function() {

	
	var HTTPDataHandler = function(inServiceConnection) 
	{
		this.initialize(inServiceConnection);
	}
	
	
	
	var p = HTTPDataHandler.prototype = Object.create( ocs.DataHandler.prototype);
	
	
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	
	p.DataHandler_initialize = p.initialize;
	p.initialize = function(inServiceConnection)
	{
		
		this.DataHandler_initialize( inServiceConnection );
	}
	
	/*p._execute = function(inRequest)
	{
		return inRequest.requester instanceof ocs.UserInfoVO;
	}*/
	
	p.DataHandler_request = p.request;
	p.request = function(inRequest)
	{
		
		return this.DataHandler_request(inRequest);
	}
	
	p.DataHandler_result = p.result;
	//override
	p.result = function(inResponseJsonString)
	{
		ocs.Tracer.echo(this._serviceType + ' : result : ');
		ocs.Tracer.echo(inResponseJsonString);
		
		try
		{
			var responseObj = _.isString(inResponseJsonString) ? JSON.parse(inResponseJsonString) : inResponseJsonString;
		}
		catch(e)
		{
			return false;
		}
		
		return responseObj;
	}
	
	p.DataHandler_fault = p.fault;
	//override
	p.fault = function(inResponseString)
	{
		ocs.Tracer.echo(this._serviceType + ' : fault : ');
		ocs.Tracer.echo(inResponseString);
		
		this._dispatchResult
		( 
			ocs.ServiceEvent.RESPONSE, 
			new ocs.ServiceResponse( this._currRequest, this.getResultVO( ocs.ServicesErrorID.JSON_EXCEPTION, inResponseString))
		);
	}
	
	
	p.toString = function()
	{
		return "[object HTTPDataHandler]";
	}
	

ocs.HTTPDataHandler = HTTPDataHandler;
}());