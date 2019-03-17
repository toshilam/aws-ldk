var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

( function() {

	
	var BaseSQLService = function(inServiceConnection) 
	{
		this.initialize(inServiceConnection);
	}
	
	
	
	var p = BaseSQLService.prototype = Object.create( ocs.BaseService.prototype );
	
	//p._connection = null;
	p._currRequest = null;
	p._serviceType = null;
	//p._requestData = null; //the data that sent from client side.
	
	p.getRequest = function()
	{
		return this._currRequest;
	}
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function(inServiceConnection)
	{
		/*if(!(inServiceConnection instanceof ocs.MySQLServiceConnection))
		{
			throw 'BaseSQLService : initialize : unknown connection!';
		}*/
		
		this._connection = inServiceConnection;
	}
	
	p.getResultVO = function(inCode, inData)
	{
		return new ocs.ResultVO('', this._serviceType, inCode, inData/*,  this._requestData ?  this._requestData.uniqueID : ''*/);
	}
	
	p.request = function(inRequest)
	{
		if(!(inRequest instanceof ocs.MySQLServiceRequest))
		{
			/*try
			{
				this._requestData =  inRequest.toJsonObject();
			}
			catch(e)
			{
				ocs.Tracer.echo(this + ' : request : unable to convert client data to data object!', this, ocs.Tracer.TYPE_ERROR);
			}*/
			ocs.Tracer.echo(this + ' : request : unknown data object!', this, ocs.Tracer.TYPE_ERROR);
			return false;
		}
		
		this._currRequest = inRequest;
		
		var connection = this._connection;
		
		if( connection && connection.isConnected() )
		{
			ocs.Tracer.echo( 'BaseSQLService : request : ' + this._serviceType, this, ocs.Tracer.TYPE_DEBUG );
			return this._execute(inRequest);
		}
		
		ocs.Tracer.echo( 'BaseSQLService : request : no connection is  available!', this, ocs.Tracer.TYPE_ERROR );
		return false;
	}
	
	p._execute = function(inRequest)
	{
		return this._connection.request(inRequest);
	}
	
	p.result = function(inResponse)
	{
		if(inResponse instanceof ocs.ServiceResponse)
		{
			var request = inResponse.request;
			var data = inResponse.data;
			
			inResponse.data = this.getResultVO(  ocs.ServicesErrorID.NONE, data);
			
			if(_.isFunction(request.result))
			{
				request.result(inResponse);
			}
			
			this._dispatchResult
			( 
				//new ocs.ServiceEvent
				//(
					ocs.ServiceEvent.RESPONSE, 
					inResponse/*{response:'fail', error:'game_round_id did not exists'}*/
				//) 
			);
			
			this._promiseResolve(inResponse);
		}
		else
		{
			ocs.Tracer.echo(this + ' : result : unknown data object : ' + inResponse, this, ocs.Tracer.TYPE_ERROR );
			this._promiseReject(inResponse);
		}
	}
	
	p.fault = function(inResponse)
	{
		if(inResponse instanceof ocs.ServiceResponse)
		{
			var err = inResponse.data;
			inResponse.data = this.getResultVO( ocs.ServicesErrorID.DB_CONNECTION_ERROR, err ); //{response: 'fail', error: err};
			
			if(_.isFunction(inResponse.request.fault))
			{
				inResponse.request.fault(inResponse);
			}
			
			this._dispatchResult( ocs.ServiceEvent.FAULT, inResponse );
		
		}
		else
		{
			ocs.Tracer.echo(this + ' : fault : unknown data object : ' + inResponse, this, ocs.Tracer.TYPE_ERROR );
		}
		
		this._promiseReject(inResponse);
	}
	
	
	
	
	
	p._dispatchResult = function(inType, inResponse)
	{
		//if( !_.isUndefined(inResponse.request) )
		//{
			inResponse.request = this._currRequest;
			this.dispatchEvent( new ocs.ServiceEvent( inType, inResponse ) );
		//}
		
	}
	
	
	p.toString = function()
	{
		return "[object BaseSQLService]";
	}
	

ocs.BaseSQLService = BaseSQLService;
}());