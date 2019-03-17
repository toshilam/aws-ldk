var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');
( function() {

	
	var MySQLServiceRequest = function(inSQLStatement, inEscapeValue, inType, inData, inRequester) 
	{
		this.initialize(inSQLStatement, inEscapeValue, inType, inData, inRequester);
	}
	
	var p = MySQLServiceRequest.prototype = Object.create( ocs.ServiceRequest.prototype);
	
	p.sqlStatement; //string
	p.escapeValue; //Array | object
	
	
	p.ServiceRequest_initialize = p.initialize;
	p.initialize = function(inSQLStatement, inEscapeValue, inType, inData, inRequester)
	{
		this.ServiceRequest_initialize(inType, inData, inRequester)
		
		this.sqlStatement = inSQLStatement;
		this.escapeValue = inEscapeValue;
	}
	
	p.toString = function()
	{
		return "object MySQLServiceRequest (" + this.type + " )";
	}
	

ocs.MySQLServiceRequest = MySQLServiceRequest;
}());
