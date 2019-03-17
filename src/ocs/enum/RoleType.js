var ocs;
module.exports = ocs = require('../');

class RoleType
{
	static get ADMIN 			(){ return 'ADMIN';}
	static get MEMBER 			(){ return 'MEMBER';}
	static get DEVELOPER 		(){ return 'DEVELOPER';}
	static get GUEST 			(){ return 'GUEST';}
}

ocs.RoleType = RoleType;