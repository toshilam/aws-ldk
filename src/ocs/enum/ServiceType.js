var ocs;
module.exports = ocs = require('../');

(function(){
	
	var ServiceType = function(){}
	
	ServiceType.INTERNAL_SUBSCRIBE		= 'internal-subscribe'; //use between servers for boardcast
	ServiceType.INTERNAL_UNSUBSCRIBE	= 'internal-unsubscribe'; //use between servers for boardcast
	
	ServiceType.SUBSCRIBE		= 'subscribe';
	ServiceType.UNSUBSCRIBE		= 'unsubscribe'; 
	
	ServiceType.BROADCAST		= 'broadcast';
	
	ServiceType.SYSTEM_HEARTBEAT	= 'system-heartbeat';
    
ocs.ServiceType = ServiceType;
}());