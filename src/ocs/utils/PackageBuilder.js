// namespace:
//var _ = require('underscore');
//var gsql = require('graphql-sql');
var ocs;
module.exports = ocs = require('../');
( function() {
	
	
	var PackageBuilder = function() 
	{
		throw "PackageBuilder cannot be instantiated.";
	}
	
	var p = PackageBuilder.prototype = new Object();
	
	/**
	* @param inOriginalUserVO : original requester
	* @param inService : type of service
	* @param inData : request data
	* @param inIsInternal : is internal call for user
	* @param inIsSystem : is internal system call for system itself
	**/
	PackageBuilder.expressRequest = function(inOriginalUserVO, inService, inData, inIsInternal, inIsSystem)
	{
		if(inOriginalUserVO instanceof ocs.UserInfoVO)
		{
			var DataID = ocs.DataID;
			var requestData = inData || {};
			requestData[DataID.SERVICE] = inService;
			requestData[DataID.USER_VO] = {id:inOriginalUserVO.id};
			requestData[DataID.EXTRA_VO] = {internal:inIsInternal === true};
			requestData[DataID.EXTRA_VO].system = inIsSystem === true;
			
			return {data:requestData};
		}
		
		return false;
	}
	
	PackageBuilder.expressResponse = function(inUserVO, inRequestData, inID, inService, inCode, inData, inUniqueID)
	{
		return new ocs.ServiceResponse
		(
			new ocs.ExpressServiceRequest(inService, inRequestData, inUserVO), 
			new ocs.ResultVO(inID, inService, inCode, inData, inUniqueID) 
		);
	}
	
	PackageBuilder.getBroadcastData = function(inData, inService, inUserList)
	{
		if( inData && _.isArray(inUserList) )
		{
			var DataID = ocs.DataID;
			
			var objDataInfo = inData[DataID.EXTRA_VO];
			if(!objDataInfo) objDataInfo = {};
			
			objDataInfo[DataID.EXTRA_USER_LIST] = /*_.isArray(objDataInfo[DataID.EXTRA_USER_LIST]) ? objDataInfo[DataID.EXTRA_USER_LIST] :*/ [];
			
			var numItem = inUserList.length;
			for(var i = 0; i < numItem; i++)
			{
				try
				{
					objDataInfo[DataID.EXTRA_USER_LIST].push({ id:inUserList[i].id });
				}
				catch(e){}
			}
			
			inData[DataID.SERVICE] = inService;
			inData[DataID.EXTRA_VO] = objDataInfo;
			
			return inData;
		}
		
		return null;
	}
	
	PackageBuilder.getBroadcastUserList = function(inData, inAutoRemove)
	{
		var DataID = ocs.DataID;
		
		try
		{
			var result = inData[DataID.EXTRA_VO][DataID.EXTRA_USER_LIST];
			if(inAutoRemove === true) delete inData[DataID.EXTRA_VO][DataID.EXTRA_USER_LIST];
			
			return result;
		}
		catch(e){}
		
		return null;
	}
	
	PackageBuilder.isInternalRequest = function(inData)
	{
		return inData && inData[ocs.DataID.EXTRA_VO] && inData[ocs.DataID.EXTRA_VO].internal === true;
	}
	
	PackageBuilder.isSystemRequest = function(inData)
	{
		return inData && inData[ocs.DataID.EXTRA_VO] && inData[ocs.DataID.EXTRA_VO].system === true;
	}
	
	PackageBuilder.getRequestUniqueID = function(inData, inPrefix)
	{
		return (_.isString(inPrefix) && inPrefix.length ? inPrefix : 's_') + inData + '.' + new Date().getTime();
	}
	
	/**
	* from x-www-form-urlencoded to graphql requet
	**/
	PackageBuilder.getGQL = function(request, selectors)
	{
		if( _.isUndefined(request.context) || !_.isString(selectors) || !selectors.length )
		{
			return '';
		}
		
		console.log('PackageBuilder : getGQL : ', condition, request.queryString, selectors);
		
		var context = request.context;
		var method = context.method.toLowerCase();
		var graphMethod = method == 'get' ? 'query' : 'mutation';
		var condition = method == 'get' ?  /*_.omit( request.queryString, (v, k, o)=> (!_.isNumber(v) && !_.isString(v)) || k == 'fields')*/ {}  : request.post;
		var service = method + context.path.split('/').map(path=>/^([0-9]+|\{.*\})$/.test(path) ? '' : path.capitalize()).join('');
		var arrSelector = [];
		var regexp = /\w+\:\[(,?\w+)+\]/ig;
		
		//"name,id,description,product:[id,name],collection:[id,name]";
		var selectorsObj = selectors.match(regexp);
		
		
		//TODO : for complex object
		selectors.replace(regexp, "").split(',').filter(v=>v).forEach(item=>arrSelector.push(item));
		if(_.isArray(selectorsObj) && selectorsObj.length)
		{
			selectorsObj.forEach( item=>arrSelector.push( { [item.split(':').shift()]:item.split(':').pop().match(/(\w+)+/ig) } )  );
		}
		return new gsql.GQLService()[graphMethod]().select(arrSelector).from(service).where(condition);
		
		//
	}

ocs.PackageBuilder = PackageBuilder;
}());
