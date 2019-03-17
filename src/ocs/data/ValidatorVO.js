var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function(){
	
	var ValidatorVO = function(name, message, optional, funcValidator, rule)
	{
		this.initialize(name, message, optional, funcValidator, rule);
	}
	
	var p = ValidatorVO.prototype = Object.create( ocs.VO.prototype);
	
	p.funcValidator; //function
	p.rule; //obj || RegExp
	p.name; 
	p.message; 
	p.isOptional;
	
	p.VO_initialize = p.initialize;
	p.initialize = function(name, message, optional, funcValidator, rule)
	{
		if(!_.isFunction(funcValidator))
		{
			throw new Error('ValidatorVO : initialize : funcValidator is required!');
		}
		
		this.VO_initialize('');
		this.name = name;
		this.rule = rule;
		this.funcValidator = funcValidator;
		this.message = message || '';
		this.isOptional = optional === true;
	}
	
	/*p.optional = function()
	{
		this.isOptional = true;
	}
	
	p.notEmpty = function()
	{
		this.isOptional = false;
	}*/
	
	p.validate = function(value)
	{
		if(!_.isFunction(this.funcValidator))
		{
			ocs.Tracer.echo(`ValidatorVO : validate : no validator function : "${this.name}" "${value}" `, this, ocs.Tracer.TYPE_ERROR);
			return false;
		}
		
		ocs.Tracer.echo(`ValidatorVO : validating : "${this.name}" "${value}" by "${this.funcValidator.name}" with "${(this.rule||{}).toObjectString()}"`, this, ocs.Tracer.TYPE_WARN);
		return this.funcValidator(value, this.rule);
	}
	
	
ocs.ValidatorVO = ValidatorVO;
}());
