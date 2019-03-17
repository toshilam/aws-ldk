global._ = require('underscore');
global.puremvc = require("npmvc");
global.mysql = require("mysql");
//global.crypto = require('crypto');
global.cryptoJS = require('crypto-js');
global.axios = require('axios');
global.shortid = require('shortid');
global.uuidv4 = require('uuid/v4');
global.AWS = require('aws-sdk');
global.dynamoose = require('dynamoose');
global.graphql = require('graphql');
global.GraphQLJSON = require('graphql-type-json');
global.validator = require('validator');
global.decodeUriComponent = require('decode-uri-component');
global.colors = require('colors/safe');
global.callstack = require('callstack');
global.moment = require('moment');
//global.apiBuilder = require('claudia-api-builder');
global.rs = require('randomstring');
global.i18n = require("i18n-2");
global.Cookies = require("js-cookie");
global.gsql = require("graphql-sql");


//require('clear-module').all();
var createjs = require('./createjs/');
var ocs = require('./ocs/');

//console.log('!!!!!!!!!!!!!!!!!11');
//console.log(require.cache);
//console.log('!!!!!!!!!!!!!!!!!11');

require('./createjs/events/Event.js');
require('./createjs/events/EventDispatcher.js');
require('./createjs/utils/IndexOf.js');

require('./ocs/Config.js');

require('./ocs/utils/Object.js');
require('./ocs/utils/Number.js');
require('./ocs/utils/String.js');
require('./ocs/utils/Array.js');
require('./ocs/utils/PackageBuilder.js');
require('./ocs/utils/Timer.js');
require('./ocs/utils/Tools.js');
require.resolve('./ocs/utils/Tools.js');
require('./ocs/utils/Tracer.js');
require('./ocs/utils/DataValidator.js');

require('./ocs/data/VO.js');
require('./ocs/data/VOList.js');
require('./ocs/data/MongooseConfigVO.js');
require('./ocs/data/MySQLConfigVO.js');
require('./ocs/data/ResultVO.js');
require('./ocs/data/SetupVO.js');
require('./ocs/data/UserInfoVO.js');
require('./ocs/data/UserVOList.js');
require('./ocs/data/QueueVO.js');
require('./ocs/data/QueueVOList.js');
require('./ocs/data/PromiseVO.js');
require('./ocs/data/GQLTypeVO.js');
require('./ocs/data/ValidatorVO.js');

require('./ocs/data/service/UserVOService.js');

require('./ocs/display/ModuleMain.js');

require('./ocs/enum/MessageID.js');
require('./ocs/enum/MongooseAPI.js');
require('./ocs/enum/ServiceID.js');
require('./ocs/enum/ServicesErrorID.js');
require('./ocs/enum/ServiceType.js');
require('./ocs/enum/VOID.js');
require('./ocs/enum/RoleType.js');

require('./ocs/events/ApplicationEvent.js');
require('./ocs/events/FileEvent.js');
require('./ocs/events/ServiceEvent.js');
require('./ocs/events/TimerEvent.js');
require('./ocs/events/VOEvent.js');
require('./ocs/events/SystemEvent.js');

require('./ocs/net/BaseService.js');
require('./ocs/net/BaseSQLService.js');
require('./ocs/net/DataHandler.js');
require('./ocs/net/ServiceRequest.js');
require('./ocs/net/ServiceConnection.js');
require('./ocs/net/MySQLServiceConnection.js');
require('./ocs/net/MySQLServiceRequest.js');
require('./ocs/net/ServiceResponse.js');
require('./ocs/net/HTTPRequestService.js');
require('./ocs/net/HTTPServiceRequest.js');
require('./ocs/net/HTTPDataHandler.js');

require('./ocs/puremvc/AppCommand.js');
require('./ocs/puremvc/AppMediator.js');
require('./ocs/puremvc/AppProxy.js');

require('./ocs/resources/DataManager.js');
require('./ocs/resources/AssetManager.js');
require('./ocs/resources/ServiceManager.js');
require('./ocs/resources/SettingManager.js');
require('./ocs/resources/UserManager.js');
require('./ocs/resources/VOManager.js');
require('./ocs/resources/XMLManager.js');
require('./ocs/resources/QueueManager.js');


module.exports = ocs;