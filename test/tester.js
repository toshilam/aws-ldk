var ocs = require('../src/');
//console.log( new ocs.MySQLConfigVO().toInfoObject() )

//graphql query string
//console.log(new ocs.GQLService().query().select(['id','name']).from('getProduct').where({id:1}).toString());


/*console.log(ocs.DataValidator);
var dataValidator = new ocs.DataValidator();
dataValidator.rule('name', 'name.required', false, validator.isLength, {min:1, max: 2048});
dataValidator.rule('age', 'age.required', true, validator.isInt);
dataValidator.rule('ageOver10', 'ageOver10.required', true, validator.isInt, { min: 10, max: 99 });
dataValidator.rule('photo', 'photo.required', false, validator.matches, /^(,?((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?)*$/i);
dataValidator.rule('email', 'email.required', false, validator.isEmail);

dataValidator.validate({
	name:'toshi',
	age:'1',
	ageOver10:'10',
	photo:'http://a.com/Image.jpg?a=1',
	email:'a@a.hk'
})
.then(()=>console.log('validated!'))
.catch(console.log)*/


console.log( ocs.PackageBuilder.getGQL( {context:{path:'/businesses', method:"GET" }, queryString:{/*tags:"tag1",ids:"1",addresses:"",keywords:"keyword1"*/} }, "name,id,description,product:[pid,pname],collection:[cid,cname]").toString() );



/*var arrSelector = [];
var regexp = /\w+\:\[(,?\w+)+\]/ig;
var selectors = "name,id,description,product:[id,name],collection:[id,name]";
var regexp = /\w+\:\[(,?\w+)+\]/ig;
//.split(',').filter(v=>v).
console.log( selectors.replace(regexp, "") )
//selectors.match(regexp).forEach(item=>arrSelector.push( { [item.split(':').pop()]:item.split(':').pop().match(/(\w+)+/ig) } )
//console.log( str.replace(/\w+\:\[(,?\w+)+\]/ig, "").split(',').filter(v=>v) );
console.log( arrSelector );*/