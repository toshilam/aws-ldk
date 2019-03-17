var ocs;
module.exports = ocs = require('../');

(function(){
	
	var ServicesErrorID = function(){}
	
    ServicesErrorID.NONE = '0';
    ServicesErrorID.PARAMETER_EMPTY = '1';
    ServicesErrorID.PARAMETER_MISSING = '2';
    ServicesErrorID.PARAMETER_ERROR = '3';
    ServicesErrorID.TOKEN_EXPIRED = '4';
    ServicesErrorID.TOKEN_NOT_FOUND = '5';
    ServicesErrorID.NOT_IN_USE = '6';
	
    ServicesErrorID.DB_CONNECTION_ERROR = '20';
    ServicesErrorID.DB_INSERT_ERROR = '21';
    ServicesErrorID.DB_UPDATE_ERROR = '22';
    ServicesErrorID.DB_RECORD_NOT_FOUND = '23';
    ServicesErrorID.DB_RECORD_EXISTS = '24';
    ServicesErrorID.DB_QUERY_ERROR = '25';
	
    ServicesErrorID.JSON_EXCEPTION = '30';
    ServicesErrorID.JSON_GENERAL_ERROR = '31';
    ServicesErrorID.JSON_METHOD_NAME_ERROR = '32';
    ServicesErrorID.JSON_PARAMETER_EMPTY = '33';
    ServicesErrorID.JSON_PARAMETER_MISSING = '34';
    ServicesErrorID.JSON_REQUEST_ID_DUPLICATED = '35';
    ServicesErrorID.JSON_REQUEST_ID_ERROR = '36';
    ServicesErrorID.JSON_KEY_NOT_FOUND = '37';
	
	//internal error
	ServicesErrorID.INTERNAL_DATA_ERROR = '1990';
	ServicesErrorID.PERMISSION_DENIED = '1991';
    
ocs.ServicesErrorID = ServicesErrorID;
}());