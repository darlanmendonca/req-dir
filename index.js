var path = require('path');
var fs = require('fs');
var dirname = path.dirname(module.parent.id);
var CoffeeScript = require('coffee-script');
CoffeeScript.register();

module.exports = function(src) {
	src = path.resolve(dirname, src);
	
	var files = fs.readdirSync(path.resolve(__dirname, src));
	var extensions = ['.js', '.json', '.coffee'];
	var modules = {};

	files.forEach(function(value, index) {
		var extname = path.extname(value);
		var key = value.replace(extname, '');
		var notParentIndex = module.parent.id !== path.resolve(src, value);
		var isValidFile = extensions.indexOf(extname) >= 0;
		var isDir = !extname;

		if (isValidFile && notParentIndex) {
			modules[key] = require(path.resolve(src, value));
		}

		if (isDir) {
			var file;
			extensions.forEach(function(ext) {
				var filePath = path.resolve(path.resolve(src, key), 'index' + ext );
				if (fs.existsSync( filePath )) {
					file = path.resolve(src, key);
				}
			});

			if (file) {
				modules[key] = require(file);
			}
		}
	});

	return modules;
}

delete require.cache[require.resolve(__filename)];
