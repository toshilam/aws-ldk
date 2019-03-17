var _ = require('underscore');
var createjs = require('../../createjs/');
var ocs;
module.exports = ocs = require('../');
( function() {

	
	var ServiceConnection = function(inConnection) 
	{
		this.initialize(inConnection);
	}
	
	var p = ServiceConnection.prototype;
	
	ServiceConnection.AMF_REQ_TIME = 1000 * 35; //35sec
	ServiceConnection.UNIQUE_ID_PN = 'uniqueID';
	
	p._instanceID; 
	p._url = '';
	p._nc;//:NetConnection;
	p.getConnection = function() { return this._nc; };
	
	// p._responder;//:Responder;
	// p.getResponder = function() { return this._responder; };
	
	p._responderMap;
	
	p._isConnected;
	p._amfTimer;
	
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	
	createjs.EventDispatcher && createjs.EventDispatcher.initialize(p);
	
	ServiceConnection._numRequested = 0;//:uint; //used for creating unique id;
	
	ServiceConnection.setNumFromRequestID = function(inValue/*:int*/)//:void
	{
		ocs.ServiceConnection._numRequested += inValue;
	}
	
	ServiceConnection.getUniqueID = function()//:String
	{
		return 'a' + String(ocs.ServiceConnection._numRequested++);
	}
	
	
	p.initialize = function(inConnection)
	{
		this._nc = inConnection;
		this._url = inConnection && inConnection.url ? inConnection.url : '';
		this._responderMap = {};
		this._instanceID = shortid.generate();
	}
	
	p.timerEventHandler = function(e/*:TimerEvent*/)//:void 
	{
		//dispatchEvent(new ServiceEvent(ServiceEvent.FAULT));
	}
	
	p.connect = function(inURL/*:String*/, rest/*:Object = null*/)//:Boolean
	{
		ocs.Tracer.echo('ServiceConnection : connect : connecting : ' + inURL, this);
			
		// if (!_nc.hasEventListener(NetStatusEvent.NET_STATUS)) 
		// {
			// _nc.addEventListener(NetStatusEvent.NET_STATUS, netStatusEventHandler);
		// }
		// if (rest)
		// {
			// _nc.connect(inURL, rest);
		// }
		// else
		// {
			// _nc.connect(inURL);
		// }
		
		this._isConnected = true;
		this.dispatchEvent(new ocs.ServiceEvent(ocs.ServiceEvent.CONNECT_SUCCESS));
		return true;
	}
	
	p.disconnect = function()//:void
	{
		if (this._nc) 
		{
			// _nc.close();
			this._isConnected = false;
			this.dispatchEvent(new ocs.ServiceEvent(ocs.ServiceEvent.DISCONNECTED));
		}
	}
	
	//in amf server, if connect fail dispatch NetStatusEvent / NO not only fail
	// p.netStatusEventHandler = function(e/*:NetStatusEvent*/)//:void 
	// {
		// Tracer.echo('ServiceConnection : netStatusEventHandler : ' + e.info.code);
// 		
		// switch(e.info.code)
		// {
			// //ignore case, do nothing for these event
			// case 'NetConnection.Connect.NetworkChange':
			// {
// 				
				// return;
			// }
		// }
// 		
		// Tracer.echo('ServiceConnection : netStatusEventHandler : connect fail! ', this, 0xff0000);
		// _isConnected = false;
		// dispatchEvent(new ServiceEvent(ServiceEvent.CONNECT_FAIL));
	// }
	
	/**
	 * NOTE : it's alwasy return true if the connection is not connected to FMS server
	 * @return
	 */
	p.isConnected = function()//:Boolean
	{
		return this._isConnected;
	}
	
	
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		var Tracer = ocs.Tracer;
		
		if (!this.isConnected())
		{
			Tracer.echo('ServiceConnection : calling : server is not connected yet!', this, 0xFF0000);
			return false;
		}
		
		Tracer.echo('ServiceConnection : calling : ' + inRequest.type, this, 0xFF0000);
		
		if ( !_.isFunction(inRequest.requester.result) || !_.isFunction(inRequest.requester.fault) )
		{
			Tracer.echo('ServiceConnection : missing responder! ', this, 0xFF0000);
			return false;
		}
		
		
		//add an unique id into data object for identifying request when server call back
		var uniqueID = ocs.ServiceConnection.getUniqueID();
		if (inRequest.data == null)
		{
			inRequest.data = {};
		}
		
		inRequest.data[ocs.ServiceConnection.UNIQUE_ID_PN] = uniqueID;
		
		//to store request for calling back later
		this._responderMap[uniqueID] = inRequest;
		
		this._remoteCall(inRequest.type, inRequest.data);
		return true;
	}
	
	p._remoteCall = function(inServiceType/*:String*/, inData/*:Object*/)//:void
	{
		// if (!_amfTimer.running)
		// {
			// _amfTimer.start();
		// }
		
		var that = this;
		var ResultVO = ocs.ResultVO;
		var AMFServicesErrorID = ocs.AMFServicesErrorID;
		
		// $.support.cors = true; 
		var data = this._nc;
		data.url = this._url + '/' + inServiceType + '/' ;//+ JSON.stringify(inData);
		data.data = '&data=' + JSON.stringify(inData);
		data.type = "post";
		data.timeout = ServiceConnection.AMF_REQ_TIME;
		
		var request = $.ajax(data);
		request.done(function(data, textStatus, jqXHR) { 
			
			// try
			// {
				var resultObj = JSON.parse(data);
				delete resultObj._explicitType;
				
				if ( that._responderMap[ resultObj.uniqueID ] )
				{
					that.result( new ResultVO(resultObj.uniqueID, resultObj.service, resultObj.code, resultObj.result, resultObj.uniqueID) );					
				}
				else
				{
					that.result( new ResultVO(inData.uniqueID, inServiceType, AMFServicesErrorID.DB_GET_DATA, resultObj, inData.uniqueID) );
				}
			// }
			// catch(e)
			// {
				// that.result( new ResultVO(inData.uniqueID, inServiceType, AMFServicesErrorID.DB_GET_DATA, {}, inData.uniqueID) );
			// }
			
		});
		request.fail(function(jqXHR, textStatus, errorThrown) { 
			// that.fault(textStatus);
			that.result( new ResultVO(inData.uniqueID, inServiceType, AMFServicesErrorID.DB_GET_DATA, {}, inData.uniqueID) );
		});
	}
	
	p.result = function(data/*:Object*/)//:void 
	{
		var Tracer = ocs.Tracer;
		var propertyName = ocs.ServiceConnection.UNIQUE_ID_PN;
		
		Tracer.echo('ServiceConnection : result : UniqueID : ' + data[propertyName], this, 0xFF0000);
		
		var serviceRequest = this._responderMap[ data[propertyName] ];
		if (!serviceRequest)
		{
			Tracer.echo('ServiceConnection : result : no service requester found : ' + data.service, this, 0xFF0000);
			// this.fault(data);
			return;
		}
		
		// if (_amfTimer.running)
		// {
			// _amfTimer.reset();
		// }
		
		serviceRequest.requester.result(data);
		
		delete this._responderMap[ data[propertyName] ];
		serviceRequest = null;
	}
	
	p.fault = function(info/*:Object*/)//:void 
	{
		var Tracer = ocs.Tracer;
		var ServiceEvent = ocs.ServiceEvent;
		
		Tracer.echo('ServiceConnection : fault : ' + info, this, 0xFF0000);
		for (var i in info)
		{
			Tracer.echo('ServiceConnection : fault : ' + info[i], this, 0xFF0000);
		}
		
		this.dispatchEvent(new ServiceEvent(ServiceEvent.FAULT));
	}
	

ocs.ServiceConnection = ServiceConnection;
}());
