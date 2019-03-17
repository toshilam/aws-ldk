var ocs;
module.exports = ocs = require('../');

(function() {

    var self = function() {};

    self.FIND = 'find';
    self.FIND_BY_ID = 'findById';
    self.FIND_ONE_AND_UPDATE = 'findOneAndUpdate';
    self.REMOVE_BY_ID = 'removeById';
    self.SAVE = 'save';

    ocs.MongooseAPI = self;
}());
