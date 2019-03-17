var _ = require('underscore');
var ocs;
module.exports = ocs = require('../');

(function() {

    var MongooseConfigVO = function(
        inID,
        inHost,
        inUser,
        inPassword,
        inDatabase
    ) {
        this.initialize(inID, inHost, inUser, inPassword, inDatabase);
    };

    var p = MongooseConfigVO.prototype = Object.create(ocs.VO.prototype);

    p.VO_initialize = p.initialize;
    p.initialize = function(inID, inHost, inUser, inPassword, inDatabase) {
        this.VO_initialize(inID);

        this.host = inHost;
        this.user = inUser;
        this.password = inPassword;
        this.database = inDatabase;
    };

    p.clone = function() {
        return new ocs.MongooseConfigVO(this.id, this.host, this.user, this.password, this.database);
    };

    p.toString = function() {
        return '[object MongooseConfigVO(id=' + this.id + ']';
    };


    ocs.MongooseConfigVO = MongooseConfigVO;
}());
