//this.ocs = this.ocs || {}; 
//var _ = require('underscore');
(function(){
	
	/*var String = function()
	{
		throw "Tools cannot be instantiated.";
	}*/
	
	String.prototype.format = function(inArrString)
	{
		if (!_.isArray(inArrString)) return this;
		var regExp = /{(\d+)}/i;
		var tempString = this;
		for(var i =0; i < inArrString.length; i++)
		{
			tempString = tempString.replace(regExp, inArrString[i]);
		}
		//this = tempString;
		return tempString;
	}
	
	String.prototype.capitalize = function() 
	{
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
	
	String.prototype.uncapitalize = function() 
	{
		return this.charAt(0).toLowerCase() + this.slice(1);
	}

	String.prototype.toJson = function()
	{
		return JSON.parse(this);
	}
	
	
//ocs.Tools = Tools;
}());
