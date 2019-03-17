// namespace:
var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');
( function() {

	
	var ServiceManager = function() 
	{
		this.initialize();
	}
	
	//ServiceManager.MYSQL = 'sMySQL';
	//ServiceManager.USER = 'sUser';
	
	var p = ServiceManager.prototype = Object.create( ocs.DataManager.prototype);
	
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
	
	
	p.DataManager_addAsset = p.addAsset;
	/**
	 * To add a swf Lib into this class, and an ID for identifying
	 * @param	inLoaderInfo 
	 * @param	inLoaderInfoID 
	 */
	p.addAsset = function(inAsset, inAssetID)
	{
		return this.DataManager_addAsset(inAsset, inAssetID);
	}
	
	p.DataManager_getAsset = p.getAsset;
	/**
	 * To get a loaded swf.
	 * @param	inLoaderInfoID
	 * @return a loaded swf
	*/ 
	p.getAsset = function(inLoaderInfoID)
	{
		return this.DataManager_getAsset(inLoaderInfoID);
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
		return false;
		
	}
	
	p.toString = function()
	{
		return "[object ServiceManager]";
	}

ocs.ServiceManager = ServiceManager;
}());
