// namespace:
var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');
( function() {

	
	var XMLManager = function() 
	{
		this.initialize();
	}
	
	var p = XMLManager.prototype = Object.create( ocs.DataManager.prototype);
	
	/**
	 * @property DataManager_initialize
	 * @type Function
	 * @private
	 **/
	p.DataManager_initialize = p.initialize;
	p.initialize = function()
	{
		this.DataManager_initialize();
	}
	
	
	p.DataManager_addAsset = p.addAsset;
	p.addAsset = function(inAsset, inAssetID)
	{
		if (this._objAssets[inAssetID] != undefined /*|| !(inAsset is XML)*/)
		{
			ocs.Tracer.echo('XMLManager : addAsset : asset exists/invalid data type : ' + inAssetID, this, 0xff0000);
			return false;
		}
		
		this._objAssets[inAssetID] = inAsset;
		this._lastAddedAssetID = inAssetID;
		
		return true;
	}
	
	p.DataManager_getAsset = p.getAsset;
	p.getAsset = function(inLoaderInfoID)
	{
		return this.DataManager_getAsset(inLoaderInfoID);
	}
	
	
	p.DataManager_getData = p.getData;
	p.getData = function(inNodeID,  inAssetID)
	{
		if (_.isString(inNodeID) && this.hasData(inNodeID, inAssetID))
		{
			return $(this._objAssets[inAssetID]);//.find(inNodeID);
		}
		
		return null;
	}
	
	
	p.hasData = function(inNodeID,  inAssetID)
	{
		if (this._objAssets[inAssetID] == undefined || !_.isString(inNodeID)) 
		{
			ocs.Tracer.echo('XMLManager : hasData : inAssetID : ' + inAssetID + ' : not found!', this, 0xff0000);
			return false;
		}
		
		return $(this._objAssets[inAssetID]).find(inNodeID).length > 0;
	}
	
	p.getString = function(inID, inNodeName /*= 'string'*/, inAssetLibID /*= 'langCommon'*/)
	{
		var xmlList = this.getData(inNodeName, inAssetLibID);
		
		if (xmlList)
		{
			var xml = $(xmlList).find(inNodeName + "[id='"+ inID  +"']");//[0];
			if (xml)
			{
				return $(xml[0]).text();
			}
			
			ocs.Tracer.echo('XMLManager : getString : target xml node not found!', this, 0xff0000);
			
		}
		else
		{
			ocs.Tracer.echo('XMLManager : getString : no data found!', this, 0xff0000);
		}
		
		return '';
	}
	
	p.toString = function()
	{
		return "[object XMLManager]";
	}

ocs.XMLManager = XMLManager;
}());
