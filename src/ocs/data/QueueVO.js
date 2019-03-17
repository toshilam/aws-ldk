var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function(){
	
	var QueueVO = function(inID, inService, inData, inGroupID)
	{
		this.initialize(inID, inService, inData, inGroupID);
	}
	
	var p = QueueVO.prototype = Object.create( ocs.VO.prototype);
	
	p.service;
	p.data;
	p.groupID;
	p.numTried;
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inService, inData, inGroupID)
	{
		if(!(inService instanceof ocs.BaseService))
		{
			throw new Error('QueueVO : initialize : unknown data Object : ' + inService);
		}
		
		
		this.VO_initialize(inID);
		this.service = inService;
		this.data = inData;
		this.groupID = inGroupID;
		this.numTried = 0;
	}
	
	
	p.toString = function()
	{
		return "[Object QueueVO( " + this.id + " )]";
	}
	
	
ocs.QueueVO = QueueVO;
}());
