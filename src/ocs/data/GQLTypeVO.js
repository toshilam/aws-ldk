var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function(){
	
	var GQLTypeVO = function(inID)
	{
		this.initialize(inID);
	}
	
	var p = GQLTypeVO.prototype = Object.create( ocs.VO.prototype);
	
	p.fields;
	p.name;
	p.gqlObject;
	p.con
	p.VO_initialize = p.initialize;
	p.initialize = function(inID)
	{
		this.VO_initialize(inID);
		
		this.name = inID;
		this.gqlObject = null;
	}
	
	p.getName = function()
	{
		return this.name;
	}
	
	p.getFields = function()
	{
		return null;
	}
	
	p.toGQLObject = function()
	{
		console.log( '{0} : toGQLObject : {1}'.format([this, this.getName()]) );
		
		this.gqlObject = this.gqlObject || new graphql.GraphQLObjectType({
			name:this.getName(),
			fields:this.getFields()
		});
		
		return this.gqlObject;
	}
	
	p.toString = function()
	{
		return "[object {0}]".format([this.constructor.name]);
	}
	
	
ocs.GQLTypeVO = GQLTypeVO;
}());
