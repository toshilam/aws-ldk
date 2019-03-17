var ocs;
module.exports = ocs = require('../');

(function(){
	
	var ServiceID = function(){}
	
    ServiceID.COMMUNICATION = 'sComm';
    ServiceID.AMF = 'sAMF';
    ServiceID.DATABASE = 'sDatabase';
    ServiceID.USER = 'sUser';
    ServiceID.EXPRESS_IO = 'sExpressIO';
    ServiceID.WEB_SOCKET = 'sWebSocket';
    ServiceID.PMX = 'sPMX';
    ServiceID.SOCKET_CLIENT = 'sSocketClient';
    ServiceID.HTTP_REQUEST = 'sHttpRequest';
    ServiceID.QUEUE = 'sQueue';
    
ocs.ServiceID = ServiceID;
}());