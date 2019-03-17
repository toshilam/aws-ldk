var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function() {
	
	var ModuleMain = function()
	{
		this.initialize();
	}
	
	var p = ModuleMain.prototype;// = new ocs.Container();
	
	p.moduleName = null;
	p._container = null;
	p._setupVO = null;
	
	//p.Container2_initialize = p.initialize;
	p.initialize = function() 
	{
		//this.Container2_initialize();
		// this._pageClosedHandler = _.bind(this._pageClosedHandler, this);
		
	}
	
	p.setup = function(inContainer, inSetupVO) 
	{
		if (!(inSetupVO instanceof ocs.SetupVO) /*|| !(inContainer instanceof ocs.Container)*/)
		{
			ocs.Tracer.echo(this.moduleName + ' : setup() : unknow data type!', this, 0xff0000);
			return false;
		}
		
		this._container = inContainer;
		this._setupVO = inSetupVO;
		
		ocs.Tracer.echo(this.moduleName + ' : setup()', this, 0xff0000);
		
		return true;
	}
	
	p.getContainer = function()
	{
		return this._container;
	}
	
	p.getVO = function()
	{
		return this._setupVO;
	}
	
	p.getAssetManager = function()
	{
		return this._setupVO._assetManager;
	}
	
	p.getXMLManager = function()
	{
		return this._setupVO._xmlManager;
	}
	
	p.getSettingManager = function()
	{
		return this._setupVO._settingManager;
	}
	
	p.getServiceManager = function()
	{
		return this._setupVO._serviceManager;
	}
	
	p.getVOManager = function()
	{
		return this._setupVO._voManager;
	}
	
	p.getUserManager = function()
	{
		return this._setupVO._userManager;
	}
	
	p.toString = function() {
		return "ocs.ModuleMain (name=" + this.moduleName + ")";
	}

ocs.ModuleMain = ModuleMain;
}());