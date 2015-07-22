var path = require('path');
var fs = require('fs');
var dirname = path.resolve(module.parent.id, '..');
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
		var isValidFile = extensions.indexOf(extname) >= 0 && key !== 'index';

		if (isValidFile) {
			modules[key] = require(path.resolve(src, value));
		}
	});

	return modules;
}