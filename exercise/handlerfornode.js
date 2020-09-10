function node (req, res) {
	// raw style
		var myArr = [0, 1, 2, 3];
		let result = []; // variable result is declared as Array.
		var depth = 3;
	    function flattenWithDepth (array, result, depth) {
			for (var i = 0; i < array.length; i++) {
			  var value = array[i]
		  
			  if (depth > 0 && Array.isArray(value)) {
				flattenWithDepth(value, result, depth - 1)
			  } else {
				result.push(value)
			  }
			}
			return result
		}

		res.writeHead(200, {'Content-Type': 'text/html'});
		// invoke function 'flattenWithDepth' 
		flattenWithDepth(myArr, result, depth);
		// Output array 'result' as HTML Table.
		res.write("<table><tr>")
		result.forEach(function(element){
			res.write("<td>" + element + "</td>")
		})
		res.write("</tr></table>")
		res.end();
}

var uriAndHandles = [{handle:"/node", func:node}];

module.exports = function(app) {
	uriAndHandles.forEach(function(handle){
		app.get(handle.handle, async(req, res) => handle.func(req, res))
	});
}
