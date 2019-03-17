// namespace:
//var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');
( function() {
	
	
	var DataValidator = function() 
	{
		this.initialize();
	}
	
	var p = DataValidator.prototype;
	
	p._data; //data object to be validated
	p._schema = null; //list of validation rule
	
	p.initialize = function()
	{
		this._schema = {};
	}
	
	p.rule = function(name, message, optional, funcValidator, rule) 
	{
		if
		(
			!_.isString(name) || 
			!name.length ||
			!_.isFunction(funcValidator)
		) 
		{
			ocs.Tracer.echo('DataValidator : rule : unknown data : ' + arguments, this, ocs.Tracer.TYPE_WARN);
			return false;
		}
		
		this._schema[name] = new ocs.ValidatorVO(name, message, optional, funcValidator, rule);
		
		return true
		
	}
	
	p.validate = function(data)
	{
		return new Promise((resolve, reject)=>{
			
			var errors = [];
			//var tasks = [];
			_.each(this._schema, (vo, key, list)=>{
				
				if
				(
					( !vo.isOptional && _.isUndefined(data[key]) ) ||
					( !_.isUndefined(data[key]) && !vo.validate(data[key]) )
				)
				{
					ocs.Tracer.echo('DataValidator : validate : failed : ' + (vo.message || `${vo.name}.required`), this, ocs.Tracer.TYPE_ERROR);
					console.log(data[key], key, data, vo);
					errors.push( vo.message || `${vo.name}.required`);
				}
			})
			
			errors.length ? reject(errors) : resolve();
		});
		
	}
	
	/*p._validate = function(vo, value)
	{
		return !(vo instanceof ocs.ValidatorVO) || ( !vo.isOptional && value === undefined ) ? false : vo.validate(data[key])
	}*/
	

ocs.DataValidator = DataValidator;
}());
