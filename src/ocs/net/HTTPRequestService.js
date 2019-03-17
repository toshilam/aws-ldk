var _ = require('underscore');
var createjs = require('../../createjs/');
//var request = require('request');
var ocs;
module.exports = ocs = require('../');
( function() {

	
	var HTTPRequestService = function(/*inPMX*/) 
	{
		this.initialize(/*inPMX*/);
	}
	
	var p = HTTPRequestService.prototype = Object.create( ocs.BaseService.prototype);
	
	p._isConnected = false;
	//p._serviceConnection;//:pmx
	p.getServiceConnection = function() 
	{
		return this._connection;
	}
	
	p.BaseService_initialize = p.initialize;
	p.initialize = function(/*inPMX*/)
	{
		var conn = require('axios');
		this.BaseService_initialize(conn);
		this._isConnected = true;
	}
	
	p.isConnected = function()
	{
		return this._isConnected;
	}
	
	p._isHTTPRequest = function(inRequest)
	{
		var Tracer = ocs.Tracer;
		
		if
		(
			!(inRequest instanceof ocs.HTTPServiceRequest) || 
			!inRequest.requester || 
			!_.isFunction(inRequest.requester.result) || 
			!ocs.Tools.hasValue(inRequest.host) || 
			!ocs.Tools.hasValue(inRequest.data) 
		)
		{
			Tracer.echo('HTTPRequestService : _isHTTPRequest : unknown request data : ' + inRequest, this, Tracer.TYPE_ERROR);
			try
			{
				Tracer.echo((inRequest instanceof ocs.HTTPServiceRequest), this, Tracer.TYPE_ERROR);
				Tracer.echo(inRequest.requester, this, Tracer.TYPE_ERROR);
				Tracer.echo(_.isFunction(inRequest.requester.result), this, Tracer.TYPE_ERROR);
				Tracer.echo(ocs.Tools.hasValue(inRequest.host), this, Tracer.TYPE_ERROR);
				Tracer.echo(ocs.Tools.hasValue(inRequest.data), this, Tracer.TYPE_ERROR);
				console.log(inRequest);
			}catch(e){}
			
			return false;
		}
		
		return true;
	}
	
	p._hasConnection = function()
	{
		var request = this._connection;
		if(!request || !_.isFunction(request.post))
		{
			ocs.Tracer.echo('HTTPRequestService : _hasConnection : request is not initialized!', this, Tracer.TYPE_ERROR);
			return false;
		}
		
		return true;
	}
	
	/**
	* sending request to pmx monitor
	**/
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		var Tracer = ocs.Tracer;
		
		if(!this._isConnected)
		{
			ocs.Tracer.echo('HTTPRequestService : request : service is not connected!', this, Tracer.TYPE_ERROR);
			return false;
		}
		
		if(!this._isHTTPRequest(inRequest) || !this._hasConnection())
		{
			return false;
		}
		
		
		
		var url = inRequest.host 
		var requestData = ocs.Tools.isProduction() ? inRequest.toHashString(inRequest.type == ocs.HTTPServiceRequest.TYPE_POST) : inRequest.type == ocs.HTTPServiceRequest.TYPE_POST ? {data:inRequest.data} : ('data=' + JSON.stringify( inRequest.data ));
		//var requestData = inRequest.toHashString(inRequest.type == ocs.HTTPServiceRequest.TYPE_POST);
		
		
		ocs.Tracer.echo('HTTPRequestService : request : requesting to : (' +inRequest.type+ ') ' + url, this, Tracer.TYPE_DEBUG);
		console.log(requestData);
		
		
		if(inRequest.type == ocs.HTTPServiceRequest.TYPE_POST)
		{
			
			request.post
			(
				{
					url:url, 
					form:requestData
				}, 
				function(err,httpResponse,body)
				{
					if (err) 
					{
						inRequest.requester.fault(err);
					}
					
					inRequest.requester.result(body);
				}
			);
		}
		else
		{
			request
			(
				url +  '?' + requestData, 
				function(err,httpResponse,body)
				{
					if (err) 
					{
						inRequest.requester.fault(err);
					}
					
					inRequest.requester.result(body);
				}
			);
		}
		
		
		
		
		return true;
	}
	
	p.request2 = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		var Tracer = ocs.Tracer;
		
		if(!this._isConnected)
		{
			ocs.Tracer.echo('HTTPRequestService : request2 : service is not connected!', this, Tracer.TYPE_ERROR);
			return false;
		}
		
		if(!this._isHTTPRequest(inRequest) || !this._hasConnection())
		{
			return false;
		}
		
		
		
		var url = inRequest.host 
		
		
		ocs.Tracer.echo('HTTPRequestService : request2 : requesting to : (' +inRequest.type+ ') ' + url, this, Tracer.TYPE_DEBUG);
		
		
		if(inRequest.type == ocs.HTTPServiceRequest.TYPE_POST)
		{
			
			request.post
			(
				{
					url:url, 
					form:inRequest.data
				}, 
				function(err,httpResponse,body)
				{
					if (err) 
					{
						inRequest.requester.fault(err);
					}
					
					inRequest.requester.result(body);
				}
			);
		}
		else
		{
			request
			(
				url, 
				function(err,httpResponse,body)
				{
					if (err) 
					{
						inRequest.requester.fault(err);
					}
					
					inRequest.requester.result(body);
				}
			);
		}
		
		
		
		
		return true;
	}
	
	/*p.connect = function(inURL/, rest)//:Boolean
	{
		
	}*/
	
	/*p.disconnect = function()//:void
	{
		//this._serviceConnection.disconnect();
	}*/
	
	
	

ocs.HTTPRequestService = HTTPRequestService;
}());
