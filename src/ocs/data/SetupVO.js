var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function(){
	
	var SetupVO = function
	(
		inID,
		inAssetManager,
		inXMLManager,
		inSettingManager,
		inServiceManager,
		inVOManager,
		inLanguage,
		inPrefixURL,
		inUserManager
	)
	{
		this.initialize(inID, inAssetManager, inXMLManager, inSettingManager, inServiceManager, inVOManager, inLanguage, inPrefixURL, inUserManager);
	}
	
	var p = SetupVO.prototype = Object.create( ocs.VO.prototype);
	
	p._assetManager;
	p._xmlManager;
	p._settingManager;
	p._serviceManager;
	p._userManager;
	p._voManager;
	
	p._language;
	p._prefixURL;
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inAssetManager, inXMLManager, inSettingManager, inServiceManager, inVOManager, inLanguage, inPrefixURL, inUserManager)
	{
		this.VO_initialize(inID);
		
		this._assetManager = inAssetManager;
		this._xmlManager = inXMLManager;
		this._settingManager = inSettingManager;
		this._serviceManager = inServiceManager;
		this._userManager = inUserManager;
		this._voManager = inVOManager;
		this._language = inLanguage;
		this._prefixURL = inPrefixURL;
		
	}
	
	p.getAssetManager = function() 
	{
		return this._assetManager;
	}
	
	p.getXMLManager = function() 
	{
		return this._xmlManager;
	}
	
	p.getSettingManager = function() 
	{
		return this._settingManager;
	}
	
	p.getServiceManager = function() 
	{
		return this._serviceManager;
	}
	
	p.getVOManager = function() 
	{
		return this._voManager;
	}
	
	p.getUserManager = function()
	{
		return this._userManager
	}
	
	p.getLanguage = function() 
	{
		return this._language;
	}
	
	p.getPrefixURL = function()
	{
		return this._prefixURL;
	}
	
	p.clone = function()
	{
		return new ocs.SetupVO(this.id, this._assetManager, this._xmlManager, this._settingManager, this._serviceManager, this._voManager, this._language, this._prefixURL, this._userManager);
	}
	
	p.toString = function()
	{
		return "[object SetupVO(id=" + this.id  + "]";
	}
	
	
ocs.SetupVO = SetupVO;
}());
