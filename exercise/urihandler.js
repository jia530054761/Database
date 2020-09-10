
function uirhandlers(req, res) {
	// raw style
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<html>");
	res.write("<head><title>Exercise for install uri handlers</title></head>");
	res.write("<body><pre>Install URI handlers</pre></body>")
	res.write("</html>");
	res.end();
}

function test1 (req, res) {
	// raw style
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<html>");
	res.write("<head><title>Exercise for install uri handlers</title></head>");
	res.write("<body><pre>Install test1 URI handlers</pre></body>")
	res.write("</html>");
	res.end();
}

var uriAndHandles = [{handle:"/test1", func:test1}, {handle:"/urihandlers", func:uirhandlers}];

module.exports = function(app) {
	uriAndHandles.forEach(function(handle){
		app.get(handle.handle, async(req, res) => handle.func(req, res))
	});
}
