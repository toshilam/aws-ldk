//var puremvc = require("npmvc");
//var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function() {
	
	var AppCommand = function()
	{
		this.initialize();
	}
	
	AppCommand.app = null;
	
	var p = AppCommand.prototype = Object.create( puremvc.SimpleCommand.prototype);
	
	p.initialize = function() 
	{
		if(!(AppCommand.app instanceof ocs.ModuleMain))
		{
			throw new Error('AppCommand : initialize : app object is not set yet!');
		}
		
		this._host = AppCommand.app;
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
	
	p.echo = function(inMessage, inTarget, inColor)
	{
		ocs.Tracer.echo
		(
			this.multitonKey + ' : ' + this.proxyName + " : " + inMessage, 
			inTarget ? inTarget : this,
			inColor ? inColor : ocs.Tracer.TYPE_DEBUG
		);
	}
	
	

ocs.AppCommand = AppCommand;
}());