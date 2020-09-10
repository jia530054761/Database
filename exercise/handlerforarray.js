function array (req, res) {
	// raw style
		var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		res.writeHead(200, {'Content-Type': 'text/html'});

		res.write("<div style='margin: 20px 0 0 0;'>The Origin Array:</div>")
		res.write("<div>")
		res.write(arr.toString());
		res.write("</div>")

		delete arr[4]; // This change variable 'arr'
		res.write("<div style='margin: 20px 0 0 0;'>After delete fourth element:</div>")
		res.write("<div>")
		res.write(arr.toString());
		res.write("</div>")

		res.write("<div style='margin: 20px 0 0 0; display:flex;'><div style='color: red;'>Slice</div>&nbsp;from 1 to end:</div>")
		res.write("<div>")
		res.write(arr.slice(1).toString());
		res.write("</div>")

		// the Array splice function is different from slice
		res.write("<div style='margin: 20px 0 0 0; display:flex;'><div style='color: red;'>Splice</div>&nbsp;from 1 to 2 and insert new element 'World':</div>")
		res.write("<div>")
		// NOTE: splice returning the deleted elements
		arr.splice(1,  2, "World");
		res.write(arr.toString());
		res.write("</div>")

		//result = arr.toString();
		res.write("<div style='margin: 20px 0 0 0;'>Output array with forEach function:</div>")
		res.write("<div style='display: inline-flex;'>")
		arr.forEach(function(element){
			res.write("<div style=' margin: 0 0 0 20px;'>" + element + "</div>");
		})
		res.write("</div>")
		//res.write(arr.toString());

		//res.write(arr.push("hello").toString());

		res.end();
}

var uriAndHandles = [{handle:"/array", func:array}];

module.exports = function(app) {
	uriAndHandles.forEach(function(handle){
		app.get(handle.handle, async(req, res) => handle.func(req, res))
	});
}