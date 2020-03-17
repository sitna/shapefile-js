'use strict';
var Promise = require('lie');
module.exports = binaryAjax;
function binaryAjax(url){
	return new Promise(function(resolve,reject){
		var type = url.slice(-3);
		var ajax = new XMLHttpRequest();
		ajax.open('GET',url,true);
		if(type !== 'prj' && type !== 'cpg' && type !== 'cst'){
			ajax.responseType='arraybuffer';
		}
		ajax.addEventListener('load', function (){
			if(ajax.status>399){
				if(type==='prj' || type === 'cpg' || type === 'cst'){
					return resolve(false);
				}else{
					return reject(new Error(ajax.status));
				}
			}
			if(type !== 'prj' && type !== 'cpg' && type !== 'cst' ){
				return resolve(new Buffer(ajax.response));
			} else {
				return resolve(ajax.response);
			}
		}, false);
		ajax.send();
	});
}
