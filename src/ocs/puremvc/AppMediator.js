//var puremvc = require("npmvc");
//var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function() {
	
	var AppMediator = function(inMediatorName, inViewComponent)
	{
		this.initialize(inMediatorName, inViewComponent);
	}
	
	AppMediator.NAME = 'AppMediator';
	
	var p = AppMediator.prototype = Object.create( puremvc.Mediator.prototype);
	
	p._host;
	
	p.initialize = function(inMediatorName, inViewComponent) 
	{
		this.mediatorName= inMediatorName || ocs.AppMediator.NAME;
		
		this.setViewComponent(inViewComponent);
		
		this._host = inViewComponent;
		//this._handleTick = _.bind(this._handleTick, this);
	}
	
	p.getContainer = function()
	{
		return this.viewComponent.getContainer();
	}
	
	p._mainStage;
	p.getMainStage = function() 
	{ 
		if (!this._mainStage) this._mainStage = this.getContainer().getStage();
		return this._mainStage; 
	}
	
	p.Mediator_onRegister = p.onRegister;
	p.onRegister = function() 
	{
		this.Mediator_onRegister();
		this.echo('onRegister!');
	}
	
	p.Mediator_onRemove = p.onRemove;
	p.onRemove = function() 
	{
		this.Mediator_onRemove();
		this.echo('onRemove!');
	}
	
	
	p.sendPromiseNotification = function(inName, inData, inType)
	{
		return new Promise((resolve, reject)=>{
			this.echo('sendPromiseNotification : {0} : {1}'.format([inName, inData]));
			//console.log(this);
			this.sendNotification(inName, new ocs.PromiseVO(inName, inData, resolve, reject), inType);
		})
		/*.then((result)=> new Promise((resolve, reject)=>{
			
		}))*/;
	}
	
	p.startListener = function()
	{
		
	}
	
	p.stopListener = function()
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
			this.multitonKey + ' : ' + this.mediatorName + " : " + inMessage, 
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
	
	/*p.isRendering = false;
	p.startRender = function(inInterval)
	{
		if(this.isRendering) return;
		
		this.isRendering = true;
		createjs.Ticker.addEventListener("tick", this._handleTick);
		
	}
	
	p.stopRender = function()
	{
		createjs.Ticker.removeEventListener("tick", this._handleTick);
		this.isRendering = false;
	}
	
	p._handleTick = function()
	{
		this.getMainStage().update();
		// this.echo('_handleTick : rendering!!');
	}*/

ocs.AppMediator = AppMediator;
}());