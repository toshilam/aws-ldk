var ocs;
module.exports = ocs = require('../');

(function(){
	
	var MessageID = function(){}
	
    MessageID.SUCCESS_TITLE = 'successTitle';
	MessageID.CONFIRM_TITLE = 'confirmTitle';
	MessageID.SUCCESS_UPLOAD_IMAGE = 'successUploadImage';
	MessageID.SUCCESS_USER_LOGGED_OUT = 'successUserLoggedOut';
	MessageID.SUCCESS_SAVE = 'successSave';
	MessageID.SUCCESS_SEND = 'successSend';
	MessageID.ERROR_TITLE = 'errorTitle';
	MessageID.ERROR_TRY_LATER = 'errorTryLater';
	MessageID.ERROR_DUPLICATED_DATA = 'errorDuplicatedData';
	MessageID.ERROR_GET_DATA = 'errorGetData';
	MessageID.CONTACT_US = 'contactUs';
	MessageID.DATA_NOT_EXIST = 'dataNotExist';
	MessageID.ERROR_UPLOAD_IMAGE_OVER_SIZE = 'errorUploadImageOverSize';
	MessageID.ERROR_UPLOAD_IMAGE = 'errorUploadImage';
	MessageID.PROCESSING = 'processing';
	MessageID.CONFIRM_DELETE = 'confirmDelete';
	MessageID.TRANS_NO_CONTENT = 'transNoContent';
	MessageID.TRANS_SELECT_LANG = 'transSelectLang';
	MessageID.PLEASE_SELECT = 'pleaseSelect';
	MessageID.MONTHS = 'months';
	MessageID.DAYS = 'days';
	MessageID.NO_TABLE = 'noTable';
	
	MessageID.FORM_MISSING_INFO = 'formMissingInfo';
	MessageID.FORM_MISSING_DATA = 'formMissingData';
	MessageID.FORM_ERROR_EMAIL = 'formErrorEmail';
	
	//AMF / FMS
	MessageID.ERROR_CONNECT = 'errorConnect';
	
	MessageID.T0006 = '0006';
	MessageID.T0007 = '0007';
	MessageID.T0008 = '0008';
	MessageID.T0009 = '0009';
	MessageID.T0010 = '0010';
	MessageID.T0011 = '0011';
	MessageID.T0012 = '0012';
	MessageID.T0013 = '0013';
	MessageID.T0014 = '0014';
	MessageID.T0015 = '0015';
	MessageID.T0016 = '0016';
	MessageID.T0017 = '0017';
	MessageID.T0018 = '0018';
	MessageID.T0019 = '0019';
	MessageID.T0020 = '0020';
	MessageID.T0021 = '0021';
	MessageID.T0022 = '0022';
	MessageID.T0023 = '0023';
	MessageID.T0024 = '0024';
	MessageID.T0025 = '0025';
	MessageID.T0026 = '0026';
	MessageID.T0027 = '0027';
	MessageID.T0028 = '0028';
	MessageID.T0029 = '0029';
	MessageID.T0030 = '0030';
	MessageID.T0031 = '0031';
	MessageID.T0032 = '0032';
	MessageID.T0033 = '0033';
	MessageID.T0034 = '0034';
	MessageID.T0035 = '0035';
	MessageID.T0036 = '0036';
	MessageID.T0037 = '0037';
	MessageID.T0038 = '0038';
	MessageID.T0039 = '0039';
	MessageID.T0040 = '0040';
	MessageID.T0041 = '0041';

ocs.MessageID = MessageID;
}());