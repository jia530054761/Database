function help (req, res) {
	// raw style
	res.type("html");
	res.set({
			'ETag': '12345',
			'meta': 'charset="utf-8"',
		 });
	res.send("<p>Hello world.</p>")
	res.status(200).end();
}

var uriAndHandles = [{handle:"/help", func:help}];

module.exports = function(app) {
	uriAndHandles.forEach(function(handle){
		app.get(handle.handle, async(req, res) => handle.func(req, res))
	});
}
