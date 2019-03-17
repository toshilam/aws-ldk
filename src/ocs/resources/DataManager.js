var createjs = require('../../createjs/');
var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');
( function() {

	
	var DataManager = function(inID) 
	{
		this.initialize(inID);
	}
	
	var p = DataManager.prototype;
	
	createjs.EventDispatcher && createjs.EventDispatcher.initialize(p);
	
	p._objAssets;
	p._id;
	
	p._lastAddedAssetID;
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function(inID)
	{
		this._id = inID || 'DataManager';
		this._objAssets = {};
		this._lastAddedAssetID = '';
	}
	
	p.addAsset = function(inAsset, inAssetID)
	{
		//if (this._objAssets[inAssetID] == undefined)
		if ( !this._objAssets[inAssetID] )
		{
			this._lastAddedAssetID = inAssetID;
			this._objAssets[inAssetID] = inAsset;
			ocs.Tracer.echo(this + ' : addAsset : ' + inAssetID, this, ocs.Tracer.TYPE_WARN);
			return true;
		}
		
		ocs.Tracer.echo('DataManager : addAsset : asset exists : ' + inAssetID, this, ocs.Tracer.TYPE_WARN);
		return false;
	}
	
	p.getAsset = function(inAssetID)
	{
		var asset = this._objAssets[inAssetID];
		if(!asset)
		{
			
			ocs.Tracer.echo(this + ' : getAsset : {0} not found!'.format([inAssetID]), this, ocs.Tracer.TYPE_WARN);
			console.log(callstack());
		}
		return asset;
	}
	
	p.hasAsset = function(inAssetID)
	{
		return this._objAssets[inAssetID] != undefined;
	}
	
	p.getData = function(inDataID,  inAssetID)
	{
		return null;
	}
	
	p.hasData = function(inDataID,  inLoaderInfoID)
	{
		return false;
	}
	
	p.removeAsset = function(inAssetID)
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
		return "[object {0}]".format([this.constructor.name]);
	}
	

ocs.DataManager = DataManager;
}());
