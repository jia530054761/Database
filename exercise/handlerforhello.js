function hello (req, res) {
	// raw style
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<html>");
	res.write("<head><title>Hello World</title></head>");
	res.write("<body><p>Hello world.</p></body>")
	res.write("</html>");
	res.end();
}

var uriAndHandles = [{handle:"/hello", func:hello}];

module.exports = function(app) {
	uriAndHandles.forEach(function(handle){
		app.get(handle.handle, async(req, res) => handle.func(req, res))
	});
}
