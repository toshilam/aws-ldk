// namespace:
var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');
( function() {

	
	var AssetManager = function() 
	{
		this.initialize();
	}
	
	var p = AssetManager.prototype = Object.create( ocs.DataManager.prototype);
	
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
	 * To get a display object from the lib.
	 * @param	inID - name of display object ID
	 * @param	inParent - parent object
	 * @return a Movieclip from lib
	 */
	p.getData = function(inDataID,  inParent)
	{
		if ('string' !== typeof inDataID)
		{
			throw new TypeError('AssetManager : getData :  dataID should be a string');
		}
            
		if (this.hasData(inDataID, inParent))
		{
			
			var cClass = ocs.lib[inDataID];
			var pClass = inParent || ocs.Container;
			
			if ('function' !== typeof pClass || 'function' !== typeof cClass)
			{
				throw new TypeError('AssetManager : getData : parent/child should be Function');
			}
			
			//added by createjs
			var nominalBounds = cClass.prototype.nominalBounds;
			
			cClass.prototype = new pClass();
			cClass.prototype.nominalBounds = nominalBounds;
			
			var child = new cClass();
			// var cTransitive= new Function;
			// var pTransitive= new Function;
			
	        // cTransitive.prototype = cClass.prototype;
	        // pTransitive.prototype = pClass.prototype;
	        
	        // cTransitive.prototype = new pTransitive();
	        
	        // var child = new cTransitive();
	        
	        // if(child.name != undefined)
	        // {
	        	child.name = inDataID;
	        // }
	        
	        return child;
		}
		
		throw 'AssetManager : getData : LoaderInfoID : ' + inParent + ' : inDataID : ' + inDataID;
		return null;
	}
	
	/**
	 * to check whether the indicated data is exist
	 * @param	inDataID - a name of data to be got 
	 * @param	inLoaderInfoID - NOT USED
	 * @return  true if the data is found, otherwise false
	 */
	p.hasData = function(inDataID,  inLoaderInfoID)
	{
		if (!ocs.lib || !ocs.lib[inDataID]) 
		{
			ocs.Tracer.echo('AssetManager : hasData : Data not found : LoaderInfoID : ' + inLoaderInfoID + ', inDataID : ' + inDataID);
			return false;
		}
			
		return true;
		
	}
	
	p.toString = function()
	{
		return "[object AssetManager]";
	}
	

ocs.AssetManager = AssetManager;
}());
