// namespace:
var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');
( function() {

	
	var SettingManager = function() 
	{
		this.initialize();
	}
	
	SettingManager.VERSION = 'version';
	SettingManager.PLATFORM = 'platform';
	SettingManager.PRODUCT_ID = 'productID';
	SettingManager.OPERATOR_ID = 'operatorID';
	SettingManager.GAME_ID = 'gameID';
	SettingManager.COLOR_ID = 'colorID';
	
	var p = SettingManager.prototype = Object.create( ocs.DataManager.prototype);
	
	/**
	 * @property DataManager_initialize
	 * @type Function
	 * @private
	 **/
	p.DataManager_initialize = p.initialize;
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function()
	{
		this.DataManager_initialize();
	}
	
	p.getSource = function()//:Object
	{
		//clone a new object
		var obj = { };
		for (var i in this._objAssets)
		{
			obj[i] = this._objAssets[i];
		}
		return obj;
	}
	
	
	p.DataManager_addAsset = p.addAsset;
	/**
	 * To add a swf Lib into this class, and an ID for identifying
	 * @param	inLoaderInfo 
	 * @param	inLoaderInfoID 
	 */
	p.addAsset = function(inAsset, inAssetID)
	{
		var isExist = this._objAssets[inAssetID] != undefined;
		
		this._objAssets[inAssetID] = inAsset;
		this._lastAddedAssetID = inAssetID;
		
		//dispatch event if exist data value changed
		if (isExist)
		{
			this.dispatchEvent(new ocs.ApplicationEvent(ocs.ApplicationEvent.CONTENT_CHANGED, null, inAssetID));
		}
		
		return true;
	}
	
	p.DataManager_getAsset = p.getAsset;
	/**
	 * To get a loaded swf.
	 * @param	inLoaderInfoID
	 * @return a loaded swf
	*/ 
	p.getAsset = function(inAssetID)
	{
		return this._objAssets[inAssetID];
	}
	
	p.hasAsset = function(inAssetID/*:String*/)//:Boolean
	{
		return !(this._objAssets[inAssetID] == undefined);
	}
	
	
	p.DataManager_getData = p.getData;
	/**
	 * To get a movie clip from the swf lib.
	 * @param	inID - name of MC ID needed in swf lib
	 * @param	inLoaderInfoID - to get the right swf lib which is already added into this class
	 * @param	inTargetMC - targert movieclip that lib object will be cast as
	 * @param	inNewName - if wanna have a different name from lib ID
	 * @return a Movieclip from lib
	 */
	p.getData = function(inDataID,  inLoaderInfoID)
	{
		Tracer.echo('SettingManager : getData : calling disabled function! : use getAsset instead of!', this, 0xff0000);
		return null;
	}
	
	/**
	 * to check whether the indicated data is exist
	 * @param	inDataID - a name of data to be got 
	 * @param	inLoaderInfoID - the data to be got from
	 * @return return true is the data is found, otherwise false
	 */
	p.hasData = function(inDataID,  inLoaderInfoID)
	{
		Tracer.echo('SettingManager : hasData : calling disabled function! : use hasAsset instead of!', this, 0xff0000);
		return false;
		
	}
	
	p.removeAsset = function(inAssetID/*:String*/)//:Boolean
	{
		if (this.hasAsset(inAssetID))
		{
			delete this._objAssets[inAssetID];
			return true;
		}
		
		return false;
	}
	
	p.toString = function()
	{
		return "[object SettingManager]";
	}
	

ocs.SettingManager = SettingManager;
}());
