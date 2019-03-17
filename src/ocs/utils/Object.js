//this.ocs = this.ocs || {}; 
//var _ = require('underscore');
(function(){
	
	Object.prototype.toObjectString = function()
	{
		return ocs.Tools.objectToString(this);
	}
	
	Object.prototype.toJsonString = function()
	{
		return JSON.stringify( _.pick(this, function(value, key, object) {
		  return _.isNumber(value) || _.isString(value);
		}) );
	}
	
	Object.prototype.mapKeys = function(keys, newKeys)
	{
		if(_.isArray(keys) && _.isArray(newKeys) && keys.length == newKeys.length)
		{
			var self = this;
			_.each(_.object(newKeys, keys), function(key, newKey, object) {
				
				if(!_.isUndefined( self[key] ))
				{
					self[newKey] =  self[key];
					delete self[key];
				}
			});
		}
		
		//unknown data do nothing
		return this;
		
	}
	
	
//ocs.Tools = Tools;
}());
