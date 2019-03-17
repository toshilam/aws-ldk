var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function(){
	
	var QueueVOList = function(inID)
	{
		this.initialize(inID);
	}
	
	var p = QueueVOList.prototype = Object.create( ocs.VOList.prototype);
	
	p.isBusy;
	
	p.VOList_initialize = p.initialize;
	p.initialize = function(inID)
	{
		this.VOList_initialize(inID);
		this.isBusy = false;
	}
	
	p.VOList_addVO = p.addVO;
	p.addVO = function(inVO)
	{
		if (!inVO || !(inVO instanceof ocs.QueueVO))
		{
			ocs.Tracer.echo('QueueVOList : addVO : unknown data type : ' + inVO);
			return -1;
		}
		
		return this.VOList_addVO(inVO);
	}
	
	
	p.getVOIndexByService = function(inService)
	{
		var numItem = this.arrVO.length;
		for (var i = 0; i < numItem; i++)
		{
			var targetService = this.arrVO[i].service;
			if (targetService && _.isFunction( targetService.getServiceType ) && targetService.getServiceType() == inService) 
			{
				return i;
			}
		}
		
		return -1;
	}
	
	
	
	p.toString = function()
	{
		return  "[object QueueVOList(id=" + this.id  + ")]";
	}
	
	
ocs.QueueVOList = QueueVOList;
}());
