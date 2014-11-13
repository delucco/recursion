// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	var matches = [];
	var elements = _.toArray(document.childNodes);	
	var checkNodes = function (elements) {
		elements.forEach(function(element){
			var classList = _.toArray(element.classList)
			if (classList.indexOf(className) >= 0){
				matches.push(element);
			}
			checkNodes(_.toArray(element.childNodes));
		})		
	}
	checkNodes(elements);

	return matches; 
  // your code here
};


// document.body
// element.childNodes
// element.classList
