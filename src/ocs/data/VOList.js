var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function(){
	
	var VOList = function(inID)
	{
		this.initialize(inID);
	}
	
	var p = VOList.prototype = Object.create( ocs.VO.prototype);
	
	p.arrVO = null;
	p.lastAddedVOIndex = null;
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID)
	{
		this.VO_initialize(inID);
		this.arrVO = [];
	}
	
	p.length = function()
	{
		return this.arrVO.length;
	}
	
	p.clear = function() 
	{
		this.lastAddedVOIndex = this.arrVO.length = 0;
	}
	
	p.clone = function() 
	{
		var nVOList = new ocs.VOList(this.id);
		var numItem = this.arrVO.length;
		for (var i = 0; i < numItem; i++)
		{
			var vo = this.arrVO[i];
			if (vo)
			{
				nVOList.addVO( vo.clone() );
			}
		}
		
		return nVOList;
	}
	
	p.addVO = function(inVO)
	{
		if (!inVO || !(inVO instanceof ocs.VO))
		{
			ocs.Tracer.echo(this + ' : VOList : addVO : unknown data type : ' + inVO);
			return -1;
		}
		
		this.lastAddedVOIndex = this.arrVO.push(inVO) - 1;
		this.dispatchEvent(new ocs.VOEvent(ocs.VOEvent.VO_ADDED, null, inVO));
		return this.lastAddedVOIndex;//this.arrVO.length;
	}
		
	p.removeVO = function(inVO)
	{
		var voIndex = this.arrVO.indexOf(inVO);
		
		if (voIndex != -1)
		{
			var vo = this.arrVO.splice(voIndex, 1)[0];
			this.dispatchEvent(new ocs.VOEvent(ocs.VOEvent.VO_REMOVED, null, vo));
			return vo;
		}
		
		ocs.Tracer.echo(this + ' : removeVO : target vo not found : ' + inVO, this, ocs.Tracer.TYPE_WARN);
		return null;
	}
	
	p.removeVOByID = function(inVOID)
	{
		var numItem = this.arrVO.length;
		for (var i = 0; i < numItem; i++)
		{
			if (this.arrVO[i].id == inVOID) 
			{
				var vo = this.arrVO.splice(i, 1)[0];
				this.dispatchEvent(new ocs.VOEvent(ocs.VOEvent.VO_REMOVED, null, vo));
				return vo;
			}
		}
		
		ocs.Tracer.echo(this + ' : removeVOByID : target vo not found : ' + inVOID, this, ocs.Tracer.TYPE_WARN);
		console.log(this.arrVO);
		return null;
	}
	
	p.removeVOByIndex = function(inIndex)
	{
		var targetVO = this.getVO(inIndex);
		if(targetVO)
		{
			return this.removeVO(targetVO);
		}
		
		ocs.Tracer.echo('VOList : removeVOByIndex : no vo found in index : ' + inIndex);
		return null;
	}
	
	p.removeAllVO = function()
	{
		while (this.arrVO.length)
		{
			this.removeVO(arrVO[0]);
		}
	}
	
	p.getVO = function(inVOIndex)
	{
		if (inVOIndex >= this.arrVO.length) return null;
		return this.arrVO[inVOIndex];
	}
	
	p.getVOByID = function(inVOID)
	{
		var numItem = this.arrVO.length;
		for (var i = 0; i < numItem; i++)
		{
			if (this.arrVO[i].id == inVOID) return this.arrVO[i];
		}
		
		return null;
	}
	
	p.hasVO = function(inVOID)
	{
		var numItem = this.arrVO.length;
		for (var i = 0; i < numItem; i++)
		{
			if (this.arrVO[i].id == inVOID) return true;
		}
		
		return false;
	}
	
	p.toArray = function(inCreateNew)
	{
		if(inCreateNew === true)
		{
			var arrNewVO = [];
			var numItem = this.arrVO.length;
			for(var i = 0; i < numItem; i++)
			{
				arrNewVO[i] = this.arrVO[i];
			}
			return arrNewVO;
		}
		
		return this.arrVO;
	}
	
	p.toString = function()
	{
		return  "[object VOList(id=" + this.id  + "]";
	}
	
	
ocs.VOList = VOList;
}());
