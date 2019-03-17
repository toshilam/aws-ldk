var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function(){
	
	var UserInfoVO = function( inID, inGroupName, inSocketIO, data )
	{
		this.initialize(inID, inGroupName, inSocketIO, data);
	}
	
	UserInfoVO.TYPE_ROLE_USER = 'USER';
	UserInfoVO.TYPE_ROLE_ADMIN = 'ADMIN';
	
	var p = UserInfoVO.prototype = Object.create( ocs.VO.prototype);
	
	p.socketIO = null; //express io socket
	
	p._ip = null;
	p.getIP = function() 
	{
		if(!this._ip)
		{
			try{ this._ip = this.socketIO.handshake.address.address; } 
			catch(e){ this._ip = '0.0.0.0'; }
		}
		
		return this._ip; 
	}
	
	/*p._arrgroup = null; //which group belonging to
	p.getGroupName = function() { return this._arrgroup.join(','); }
	p.setGroupName = function(value)
	{
		if( this._arrgroup.indexOf( value ) == -1)
		{
			this._arrgroup.push(value);
			this.dispatchChangeEvent('groupName', value);
		}
		
	}*/
	
	
	p.currency = null;
	
	p._token = '';
	p.getToken = function() { return this._token; }
	p.setToken = function(value)
	{
		this._token = value;
		this.dispatchChangeEvent('token', value);
	}
	
	p._cashBal = 0; // The cash balance of the player in his base currency in cents.
	p.getCashBal = function() {return this._cashBal;}
	p.setCashBal = function(value)
	{
		this._cashBal = value;
		this.dispatchChangeEvent('cashBal', value);
	}
	
	p.getThirdPartyID = function()
	{
		return this.get('thirdPartyID');
	}
	
	p.getRole = function()
	{
		return this.get('role');
	}
	
	p._properties = null; //an object contains all additional setting via setter
	p.set = function(inKey, inData)
	{
		this._properties[inKey] = inData;
	}
	
	p.get = function(inKey)
	{
		return this._properties[inKey];
	}
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inGroupName, inSocketIO, data)
	{
		/*if(!inSocketIO)
		{
			throw 'UserInfoVO : initialize : no socket object is provided!';
		}*/
		
		this.VO_initialize(inID);
		
		/*this._arrgroup = [];
		if(inGroupName)
		{
			this._arrgroup.push(inGroupName);
		}*/
		
		this._properties = {};
		
		this.socketIO = inSocketIO;
		
		//this.isAlive = true;
		
		_.each(data, (value, key, list)=>{ this.set(key, value); });
		
		this.isLogged = _.bind(this.isLogged, this);
	}
	
	p.isLogged = function()
	{
		ocs.Tracer.echo(`UserInfoVO : isLogged : ${_.isString(this._token) && this._token.length} (${this._token})`, this, ocs.Tracer.TYPE_INFO);
		return _.isString(this._token) && this._token.length;
	}
	
	p.clear = function()
	{
		this.currency = null;
		
		this._cashBal = 0;
		this.token = '';
		this.socketIO = null;
		this.ip = null;
		//this._arrgroup = [];
		this._properties = null;
	}
	
	p.clone = function()
	{
		var vo = new ocs.UserInfoVO(this.id, null, this.socketIO);
	}
	
	p.toInfoObject = function(inDeepLevel)
	{
		/*var info = {};
		for(var key in this)
		{
			var data = null;
			
			if(_.isFunction(this[key]))
			{
				continue;
			}
			else if(_.isObject(this[key]))
			{
				data  = this[key].toString();
			}
			else
			{
				data = this[key];
			}
			
			
			info[key] = data;
		}*/
		
		//return ocs.Tools.clone(this);
		return ocs.Tools.cloneWithLevel(this, _.isNumber(inDeepLevel) ? inDeepLevel : -1);
	}
	
	p.toString = function()
	{
		return "[object UserInfoVO (id=" + this.id  + ")]";
	}
	
	
	
	
ocs.UserInfoVO = UserInfoVO;
}());
