var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

/*
* more info about mysql connection option:
* https://www.npmjs.com/package/mysql#connection-options
*/
(function(){
	
	var MySQLConfigVO = function
	(
		inID,
		inHost,
		inUser,
		inPassword,
		inDatabase
	)
	{
		this.initialize(inID, inHost, inUser, inPassword, inDatabase);
	}
	
	var p = MySQLConfigVO.prototype = Object.create( ocs.VO.prototype);
	
	p.host;//: The hostname of the database you are connecting to. (Default: localhost)
	p.port;//: The port number to connect to. (Default: 3306)
	p.user;//: The MySQL user to authenticate as.
	p.password;//: The password of that MySQL user.
	p.database;//: Name of the database to use for this connection (Optional).
	
	p.localAddress;//: The source IP address to use for TCP connection. (Optional);
	p.socketPath;//: The path to a unix domain socket to connect to. When used host and port are ignored.
	p.charset;//: The charset for the connection. This is called "collation" in the SQL-level of MySQL (like utf8_general_ci). If a SQL-level charset is specified (like utf8mb4) then the default collation for that charset is used. (Default: 'UTF8_GENERAL_CI')
	p.timezone;//: The timezone configured on the MySQL server. This is used to type cast server date/time values to JavaScript Date object and vice versa. This can be 'local', 'Z', or an offset in the form +HH:MM or -HH:MM. (Default: 'local')
	p.connectTimeout;//: The milliseconds before a timeout occurs during the initial connection to the MySQL server. (Default: 10000)
	p.stringifyObjects;//: Stringify objects instead of converting to values. See issue #501. (Default: false)
	p.insecureAuth;//: Allow connecting to MySQL instances that ask for the old (insecure) authentication method. (Default: false)
	p.typeCast;//: Determines if column values should be converted to native JavaScript types. (Default: true)
	p.queryFormat;//: A custom query format function. See Custom format.
	p.supportBigNumbers;//: When dealing with big numbers (BIGINT and DECIMAL columns) in the database, you should enable this option (Default: false).
	p.bigNumberStrings;//: Enabling both supportBigNumbers and bigNumberStrings forces big numbers (BIGINT and DECIMAL columns) to be always returned as JavaScript String objects (Default: false). Enabling supportBigNumbers but leaving bigNumberStrings disabled will return big numbers as String objects only when they cannot be accurately represented with JavaScript Number objects (which happens when they exceed the [-2^53, +2^53] range), otherwise they will be returned as Number objects. This option is ignored if supportBigNumbers is disabled.
	p.dateStrings;//: Force date types (TIMESTAMP, DATETIME, DATE) to be returned as strings rather then inflated into JavaScript Date objects. Can be true/false or an array of type names to keep as strings. (Default: false)
	p.debug;//: Prints protocol details to stdout. Can be true/false or an array of packet type names that should be printed. (Default: false)
	p.trace;//: Generates stack traces on Error to include call site of library entrance ("long stack traces"). Slight performance penalty for most calls. (Default: true)
	p.multipleStatements;//: Allow multiple mysql statements per query. Be careful with this, it could increase the scope of SQL injection attacks. (Default: false)
	p.flags;//: List of connection flags to use other than the default ones. It is also possible to blacklist default ones. For more information, check Connection Flags.
	p.ssl;//: object with ssl parameters or a string containing name of ssl profile. See SSL options.
	
	p.VO_initialize = p.initialize;
	p.initialize = function(inID, inHost, inUser, inPassword, inDatabase)
	{
		this.VO_initialize(inID);
		
		this.host = inHost;
		this.user = inUser;
		this.password = inPassword;
		this.database = inDatabase;
		
		this.charset = 'utf8_unicode_ci';
		this.timezone = '+00:00';
		this.connectTimeout = 10000;
		this.stringifyObjects = true;
		this.insecureAuth = false;
		this.typeCast = true;
		this.supportBigNumbers = false;
		this.bigNumberStrings =false;
		this.dateStrings = false;
		this.debug = false;
		this.trace = true;
		this.multipleStatements = false;
		
	}
	
	p.clone = function()
	{
		return new ocs.MySQLConfigVO(this.id, this.host, this.user, this.password, this.database);
	}
	
	
	p.toString = function()
	{
		return "[object MySQLConfigVO(id=" + this.id  + "]";
	}
	
	
ocs.MySQLConfigVO = MySQLConfigVO;
}());
