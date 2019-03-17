
( function() {

	
	var MySQLDataHandler = function(inServiceConnection) 
	{
		this.initialize(inServiceConnection);
	}
	
	
	
	var p = MySQLDataHandler.prototype = Object.create( ocs.DataHandler.prototype);
	
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	
	p._DataHandler_initialize = p.initialize;
	p.initialize = function(inServiceConnection)
	{
		/*if(!(inServiceConnection instanceof ocs.MySQLServiceConnection))
		{
			throw 'MySQLDataHandler : initialize : unknown connection!';
		}*/
		
		this._DataHandler_initialize( inServiceConnection );
	}
	
	
	
	/*p._DataService_fault = p.fault;
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
			ocs.Tracer.echo(this + ' : fault : unknown data object : ' + inResponse);
		}
	}*/
	
	
	
	p.toString = function()
	{
		return "[object MySQLDataHandler]";
	}
	

ocs.MySQLDataHandler = MySQLDataHandler;
}());