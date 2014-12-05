// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	
	if (json[0] === 't'){
		var result = true;
	} else if (json[0] === 'f'){
		var result = false;
	} else if (json[0] === 'n'){
		var result = null;
	} else if (json[0] === '"' || json[0] === '\''){
		var result = '';
		for (var i=1; i<json.length-1; i++){		
			result += json[i];			
		}	
	} else if (json[0] === ' '){
		if (json.length > 1){
			var result = parseJSON(json.slice(1));				
		}			
	} else if (json[0] === '['){
		var result = [];
		for (var i=1; i<json.length - 1; i++){
			if (json[i] === '['){
				var brace = json.indexOf(']', i);
				var item = json.slice(i, brace + 1);
				if (parseJSON(item) !== undefined){
					result.push(parseJSON(item));					
				}
				i = brace;					
			} else if (json[i-1] === ',' || json[i-1] === '['){
				var newArr = json.indexOf('[', i);		
				var newItem = json.indexOf(',', i);
				var closest = [newArr, newItem].sort(function(a,b){ return a-b; })[0];		
				var item = json.slice(i, closest);
				if (parseJSON(item) !== undefined){
					result.push(parseJSON(item));					
				}				
			}				
		}	
	} else if (json[0] === '{'){
		var result = {};
		for (var i=1; i<json.length; i++){
			if (json[i-1] === ',' || i === 1 && json[i] !== '}'){
				var colonIndex = json.indexOf(':', i);						
				var objEnd = json.indexOf('}', i);
				var arrEnd = json.indexOf(']', i) > 0 ? json.indexOf(']', i) : objEnd;
				var propEnd = [objEnd, arrEnd].sort(function(a,b){ return a-b; })[0];					
				if (propEnd < 0){
					propEnd = json.length;
				}					
				var key = parseJSON(json.slice(i, colonIndex));
				var prop = parseJSON(json.slice(colonIndex + 1, propEnd));	
				result[key] = prop;							
			} 					
		}			
	} else {
		var result = parseFloat(json);
	}

	
		
	return result;
  // your code goes here
};

//need to fix objects in arrays and vice versa....escape \\....non-parsibles