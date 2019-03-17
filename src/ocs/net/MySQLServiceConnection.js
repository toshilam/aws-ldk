var mysql = require('mysql');
var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

const Tracer = ocs.Tracer;
const {TYPE_WARN, TYPE_ERROR, TYPE_INFO} = Tracer;

( function() {

	/**
	* inConnection will be created once the method 'connect' is called!
	*/
	var MySQLServiceConnection = function(inConnection) 
	{
		this.initialize(inConnection);
	}
	
	var p = MySQLServiceConnection.prototype = Object.create( ocs.ServiceConnection.prototype );
	
	p._currSQLConnection = null;
	
	//save last config
	p._config = null;
	p._pool = null;
	
	p.ServiceConnection_initialize = p.initialize;
	p.initialize = function(inConnection)
	{
		this.ServiceConnection_initialize(inConnection);
		
		this.request = _.bind(this.request, this);
		this.beginTransaction = _.bind(this.beginTransaction, this);
		this.endTransaction = _.bind(this.endTransaction, this);
		
		
	}
	
	p.ServiceConnection_connect  = p.connect;
	p.connect = function(inURL/*:String*/, rest/*:Object = null*/)//:Boolean
	{
		if( !(rest instanceof ocs.MySQLConfigVO) )
		{
			Tracer.echo('MySQLServiceConnection : connect : no config is provided!', this, TYPE_ERROR);
			return false;
		}
		
		var self = this;
		//save config for auto re-connect
		this._config = rest;
		
		//TODO
		//handle connect itself
		Tracer.echo('MySQLServiceConnection : connect : connecting : ' + rest.host, this, TYPE_ERROR);
		
		/*var pool = this._pool = this._pool || mysql.createPool(rest.toInfoObject());
		
		if(!this._pool)
		{
			Tracer.echo('MySQLServiceConnection : connect : failed creating pool!', this, TYPE_ERROR);
			throw new Error('MySQLServiceConnection : connect : failed creating pool!');
		}*/
		
		
		//this._nc = pool;
		var connection = this._currSQLConnection = mysql.createConnection(rest.toInfoObject());
		connection.connect((err) => {
			
			Tracer.echo('MySQLServiceConnection : connect : error : {0}, connection : {1}({2})'.format([err,self._currSQLConnection, this]), this, Tracer.TYPE_WARN);
			//console.log(callstack());
			if (err || !self._currSQLConnection) 
			{
				self.dispatchEvent( new ocs.ServiceEvent(ocs.ServiceEvent.CONNECT_FAIL, err) );
			} 
			else
			{
				//Tracer.echo('-------------MySQLServiceConnection : connect seccess : dispatchEvent!!! ' + this, this, Tracer.TYPE_ERROR);
				
				self._isConnected = true;
				self.dispatchEvent(new ocs.ServiceEvent(ocs.ServiceEvent.CONNECT_SUCCESS));
				
				self._currSQLConnection.on('error', function(err) 
				{
					// reconnect if 'PROTOCOL_CONNECTION_LOST' 
					console.log('MySQLServiceConnection : connection error : ', err.code); 
					if(err.code == 'PROTOCOL_CONNECTION_LOST')
					{						
						//not to dispatchEvent & reconnect sliently
						self.disconnect(false);
						self.connect(null, self._config);
					}
				});
				
			}
		});
		/*pool.getConnection(function(err, connection) 
		{
			Tracer.echo('MySQLServiceConnection : getConnection : '+ connection, this, Tracer.TYPE_WARN);
			if(connection)
			{
				self._currSQLConnection = connection;
				self._isConnected = true;
				self.dispatchEvent(new ocs.ServiceEvent(ocs.ServiceEvent.CONNECT_SUCCESS));
				
				self._currSQLConnection.on('error', function(err) 
				{
					// reconnect if 'PROTOCOL_CONNECTION_LOST' 
					console.log('MySQLServiceConnection : connection error : ', err.code); 
					if(err.code == 'PROTOCOL_CONNECTION_LOST')
					{						
						//not to dispatchEvent & reconnect sliently
						self.disconnect(false);
						self.connect(null, this._config);
					}
				});
			}
			else
			{
				self.dispatchEvent(new ocs.ServiceEvent(ocs.ServiceEvent.CONNECT_FAIL));
			}
		});*/
		
		
		return true;
	}
	
	p.ServiceConnection_disconnect = p.disconnect;
	p.disconnect = function(toDispatchEvent)//:void
	{
		//TODO
		//handle disconnect itself
		/*if (this._nc) 
		{
			this._nc = null;
		}*/
		
		this.removeAllEventListeners();
		
		if(this._currSQLConnection)
		{
			this._pool ? this._currSQLConnection.release() : this._currSQLConnection.end();
		}
		
		this._isConnected = false;
		this._currSQLConnection = null;
		if(toDispatchEvent !== false)
		{
			this.dispatchEvent(new ocs.ServiceEvent(ocs.ServiceEvent.DISCONNECTED));
		}
		
	}
	
	
	p.isConnected = function()//:Boolean
	{
		return this._isConnected;
	}
	
	
	/**
	* inRequest : type = not used, data = sql statement, requester = callback function
	*/
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		
		return new Promise((resolve, reject)=>{
			
			var response = new ocs.ServiceResponse(inRequest, null);
			var ServiceEvent = ocs.ServiceEvent;
			var self = this;
			var arrRequest = Array.from(arguments);
			var arrPromise = []; //list of query to be exec
			
			if(!(inRequest instanceof ocs.ServiceRequest))
			{
				Tracer.echo('MySQLServiceConnection : calling : unknwon data type!', this, TYPE_ERROR);
				return reject(response);
			}
			
			new Promise((_resolve, _reject)=>{
				if (!this.isConnected())
				{
					Tracer.echo('MySQLServiceConnection : calling : waiting for connection...' + this, this, TYPE_ERROR);
					//return reject(response);
					//this.addEventListener(ocs.ServiceEvent.CONNECT_SUCCESS, _resolve);
					//this.addEventListener(ocs.ServiceEvent.CONNECT_FAIL, _reject);
					this.on(ocs.ServiceEvent.CONNECT_SUCCESS, _resolve, this, true);
					this.on(ocs.ServiceEvent.CONNECT_FAIL, _reject, this, true);
				}
				else
				{
					_resolve(null);
				}
			})
			.then((e)=>{
				//Tracer.echo('MySQLServiceConnection : connected : ' + this, this, TYPE_ERROR);
				var uniqueID = ocs.ServiceConnection.getUniqueID();
				var connection = self._currSQLConnection;
				var q = connection.query
				(
					mysql.format
					(
						inRequest.sqlStatement, 
						inRequest.escapeValue
					),
					function(err, result) 
					{
						if (err) 
						{
							Tracer.echo('MySQLServiceConnection : query error : {0}'.format([err]), this,Tracer.TYPE_ERROR );
							return reject(err);
						}
						
						Tracer.echo('MySQLServiceConnection : query result :', this,Tracer.TYPE_INFO );
						console.log(result);
						response.data = result;
						self._dispatchServiceEvent(ServiceEvent.RESPONSE, response);
						resolve(response);
					}
				);
				
				Tracer.echo('MySQLServiceConnection : querying : {0}'.format([q.sql]), this,Tracer.TYPE_INFO );
			})
			.catch((err)=>{
				response.data = err;
				reject(response)
			});
			
			
			
			
			
		});
		
	}
	
	p.beginTransaction = function()
	{
		
		return new Promise
		(
			(resolve, reject)=>
			{
				
				//this._nc.getConnection(function(err, connection) 
				//{
					//if(connection)
					//{
						Tracer.echo('---MySQLServiceConnection : beginTransaction : ', this, Tracer.TYPE_INFO);
						//console.log(this._currSQLConnection._protocol._queue);
						this._currSQLConnection.beginTransaction
						(
							function(err) 
							{
								if (err) 
								{
									return reject(err);
								}
								
								return resolve(this._currSQLConnection);
							}
						);
						
						
					//}
					//
					//reject(err);
				//});
			}
		);
	}
	
	p.endTransaction = function(isCommit)
	{
		
		return new Promise
		(
			(resolve, reject)=>
			{
				Tracer.echo('---MySQLServiceConnection : endTransaction : isCommit : {0} :'.format([isCommit]), this, Tracer.TYPE_INFO);
				//console.log(this._currSQLConnection._protocol._queue);
				
				isCommit === false ? this._currSQLConnection.rollback(resolve) : this._currSQLConnection.commit
									(
										(error) =>
										{
											if (error) 
											{
												return this._currSQLConnection.rollback
												(
													() =>
													{
														reject(error);
													}
												);
											}
											
											resolve();
										}
									);
			}
		);
	}
	
	p._dispatchServiceEvent = function(inType, inResponse)
	{
		if(inResponse)
		{
			if(inResponse.request.requester && _.isFunction(inResponse.request.requester.result) && _.isFunction(inResponse.request.requester.fault))
			{
				inResponse.request.requester[inType == ocs.ServiceEvent.RESPONSE ? 'result' : 'fault'](inResponse);
			}
			
			this.dispatchEvent(new ocs.ServiceEvent(inType, inResponse));
			return;
		}
		
		Tracer.echo('MySQLServiceConnection : _dispatchServiceEvent : unknown response data', this, TYPE_WARN);
	}
	
	p._remoteCall = function(inServiceType/*:String*/, inData/*:Object*/)//:void
	{
		Tracer.echo('MySQLServiceConnection : _remoteCall : called disabled function!', this, TYPE_WARN);
	}
	
	p.result = function(data/*:Object*/)//:void 
	{
		Tracer.echo('MySQLServiceConnection : result : called disabled function!', this, TYPE_WARN);
	}
	
	p.fault = function(info/*:Object*/)//:void 
	{
		Tracer.echo('MySQLServiceConnection : fault : called disabled function!', this, TYPE_WARN);
	}
	
	//create a new MySQLServiceConnection with a new config, or defined one
	p.createConnection = function(config)
	{
		
		var serviceConnection = new ocs.MySQLServiceConnection(null);
		
		if(!serviceConnection.connect(null, config || this._config))
		{
			Tracer.echo('MySQLServiceConnection : createConnection : failed !', this, TYPE_ERROR);
			return null;
		}
		Tracer.echo('MySQLServiceConnection : createConnection :' + serviceConnection, this, TYPE_INFO);
		return serviceConnection;
	}
	
	p.toString = function()
	{
		return "[object MySQLServiceConnection({0})]".format([this._instanceID]);
	}

ocs.MySQLServiceConnection = MySQLServiceConnection;
}());
