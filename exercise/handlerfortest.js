function test (req, res) {
	// raw style
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<div style='display: inline-flex;'><div style='font-weight:bold;'>Number of Vistors: </div><div style='margin: 0 0 0 20px; color: red;'>" + (++globalcount) + "</div></div>");
	res.end();
}

var uriAndHandles = [{handle:"/test", func:test}];
var globalcount = 0;

module.exports = function(app) {
	uriAndHandles.forEach(function(handle){
		app.get(handle.handle, async(req, res) => handle.func(req, res))
	});
}