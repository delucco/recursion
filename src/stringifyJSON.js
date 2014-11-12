// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  // your code goes here
  if (typeof obj === 'string' || obj === {} ) {
  	return '"' + obj + '"';
  } else if (typeof obj === 'boolean' || typeof obj === 'number' ){	  
	return obj.toString();
  } else if (obj === null) {
	  return 'null'
  } else if (Array.isArray(obj)) {
	var result = '[';
	for (var i=0; i<obj.length; i++){
		if (i === obj.length - 1){
			result += stringifyJSON(obj[i]);
		} else {
			result += stringifyJSON(obj[i]) + ',';
		} 
	}
	return result  + ']';
  } else {
	var keys = Object.keys(obj);
	var result = '{';

//	while (keys.length > 0){
//	  var prop = keys.shift();
    for (var i=0; i<keys.length; i++){
		if (typeof obj[keys[i]] === 'function' || obj[keys[i]] === undefined) {
			result += '';
		} else if (i === keys.length - 1){
			result += '"' + keys[i] + '":' + stringifyJSON(obj[keys[i]]); 
		} else {
			result += '"' + keys[i] + '":' + stringifyJSON(obj[keys[i]]) + ',';
		}
	}
	return result + '}';
  }
};

//+ ','

// stringifyJSON( {x: {y: 'z'}, m: 'p'} )
// "{"x" : {"y" : "z","y"},"x,m"}"
                              