var assert = require('assert');
var loader = require('./index');

describe('requireDir', function() {
	it('should be empty object', function() {
		assert
			.deepEqual({}, loader('./tests/empty'));
	});

	it('should be object with modules', function() {
		assert
			.deepEqual({
				js: {}, 
				json: {},
				coffee: {}
			}, loader('./tests/general'));
	})
});