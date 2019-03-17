//var puremvc = require("npmvc");
//var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function() {
	
	var AppProxy = function(inProxyName, inData)
	{
		this.initialize(inProxyName, inData);
	}
	
	AppProxy.NAME = 'AppProxy';
	
	var p = AppProxy.prototype = Object.create( puremvc.Proxy.prototype);
	
	p.initialize = function(inProxyName, inData) 
	{
		this.proxyName= inProxyName || ocs.AppProxy.NAME;
		
		if (!(inData instanceof ocs.ModuleMain)) 
		{
			var message = this.proxyName + ' : invaild data object set : ModuleMain is excepted : ' + inData;
			this.echo(message, this, 0xff0000);
			throw message;
		}
		
		this.setData(inData);
	}
	
	p._host = null; //IModuleMain;
	p.getHost = function() { return this._host; }
	
	p.Proxy_onRegister = p.onRegister;
	p.onRegister = function() 
	{
		this.Proxy_onRegister();
		this.echo('onRegister!');
		// if(typeof this.testCall == 'function')
		// {
			// this.testCall();
		// }
		// else
		// {
			// this.echo('no testCall found!!!!!');
		// }
	}
	
	p.Proxy_onRemove = p.onRemove;
	p.onRemove = function() 
	{
		this.Proxy_onRemove();
		this.echo('onRemove!');
	}
	
	p.Proxy_setData = p.setData;
	p.setData = function(data) 
	{
		if (data instanceof ocs.ModuleMain) this._host = data;
		else this.Proxy_setData(data);
	}
	
	/**
	 * send a notification to a targeted mediator
	 * @param	inTargetMediatorName - the target mediator's name
	 * @param	notificationName 
	 * @param	body
	 * @param	type
	 * @return  true if successfully send
	 */
	p.sendNotificationToMediator = function(inTargetMediatorName, notificationName, body, type)
	{
		if (this.facade.hasMediator(inTargetMediatorName))
		{
			this.facade.retrieveMediator(inTargetMediatorName).handleNotification(new puremvc.Notification(notificationName, body, type));
			return true;
		}
		
		this.echo('sendNotificationToMediator : target mediator is not found : ' + inTargetMediatorName);
		return false;
	}
	
	
	p.initAsset = function(inAsset)
	{
		
	}
	
	
	p.getPrefixURL = function()
	{
		return this.isModuleMain() ? this._host.getVO().getPrefixURL() : null;
	}
	
	p.getLanguage = function()
	{
		return this.isModuleMain() ? this._host.getVO().getLanguage() : null;
	}
	
	p.getPlatform = function()
	{
		
		return this.isModuleMain() ? this.getSettingManager().getAsset(ocs.SettingManager.PLATFORM) : null;
	}
	
	p.getAssetManager = function()
	{
		return this.isModuleMain() ? this._host.getAssetManager() : null;
	}
	
	p.getXMLManager = function()
	{
		return this.isModuleMain() ? this._host.getXMLManager() : null;
	}
	
	p.getSettingManager = function()
	{
		return this.isModuleMain() ? this._host.getSettingManager() : null;
	}
	
	p.getVOManager = function()
	{
		return this.isModuleMain() ? this._host.getVOManager() : null;
	}
	
	p.getServiceManager = function()
	{
		return this.isModuleMain() ? this._host.getServiceManager() : null;
	}
	
	p.getUserManager = function()
	{
		return this.isModuleMain() ? this._host.getUserManager() : null;
	}
	
	p.isModuleMain = function()
	{
		return (this._host instanceof ocs.ModuleMain);
	}
	
	/*p.playSound = function(inDataIDs, inAssetID, inVolLevel, inStartTime, inLoop)
	{
		inVolLevel = inVolLevel || -1;
		inStartTime = inStartTime || 0;
		inLoop = inLoop || 0;
		this.getSoundManager().playSound(inDataIDs, inAssetID,  inVolLevel, inStartTime, inLoop );
	}*/
	
	p.echo = function(inMessage, inTarget, inColor)
	{
		ocs.Tracer.echo
		(
			this.multitonKey + ' : ' + this.proxyName + " : " + inMessage, 
			inTarget ? inTarget : this,
			inColor ? inColor : ocs.Tracer.TYPE_DEBUG
		);
	}
	
	/**
	 * NOTE : xml formet is supposed to be : (data / string)
	 * @param	inID - the targeted node attribute id
	 * @param	inNodeName - target node name
	 * @param	inAssetLibID - aseet lib id 
	 * @return message if found else null
	 */
	p.getMessage = function(inID, inNodeName, inAssetLibID)
	{
		inNodeName = inNodeName || 'string';
		inAssetLibID = inAssetLibID || 'langCommon';
		// if (!xmlManager) return null;
// 		
		return this.getXMLManager().getString(inID, inNodeName, inAssetLibID);
		
	}
	
	
	p._httpHost = null;
	p.getHTTPHost = function()
	{
		// if (!xmlManager) return null;
// 		
		// if (!_httpHost)
		// {
			// var xml:XML = xmlManager.getData('services', AssetLibID.XML_COMMON)[0];
			// if (xml)
			// {
				// var tragetNode:XML = xml.*.(@id == 'http')[0];
// 				
				// if (tragetNode)
				// {
					// _httpHost = tragetNode.@host.toString();
					// return _httpHost;
				// }
// 				
				// echo('httpHost : target xml node not found!', this, 0xff0000);
// 				
			// }
			// else
			// {
				// echo('httpHost : no data found!', this, 0xff0000);
			// }
// 			
			// return '';
		// }
// 		
// 		
		// return _httpHost;
	}
	

ocs.AppProxy = AppProxy;
}());