'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	neq = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-neq', function tests() {

	it( 'should export a function', function test() {
		expect( neq ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				neq( value, 10 );
			};
		}
	});

	it( 'should not throw an error for any comparison value', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.not.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				neq( [], value );
			};
		}
	});

	it( 'should throw an error if provided a non-object for options', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			[],
			true,
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				neq( [], 10, value );
			};
		}
	});

	it( 'should throw an error if provided a non-boolean for the strict option', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				neq( [], 10, {'strict': value} );
			};
		}
	});

	it( 'should throw an error if provided a non-boolean for the array option', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				neq( [], 10, {'array': value} );
			};
		}
	});

	it( 'should correctly compare values (non-strict)', function test() {
		var data, expected, actual, tmp, opts;

		opts = { 'strict': false };

		tmp = [ 1, 2 ];
		data = [ 0, false, true, null, 5, 'a', tmp ];

		// Single comparison value:
		actual = neq( data, false, opts );
		expected = [ 0, 0, 1, 1, 1, 1, 1 ];

		assert.deepEqual( actual, expected );

		// Array of comparison values:
		actual = neq( data, [ false, 0, 1, undefined, '5', 4, tmp ], opts );
		expected = [ 0, 0, 0, 0, 0, 1, 0 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should correctly compare values (strict)', function test() {
		var data, expected, actual, tmp;

		tmp = [ 1, 2 ];
		data = [ 0, false, true, null, 5, 'a', tmp ];

		// Single comparison value:
		actual = neq( data, false );
		expected = [ 1, 0, 1, 1, 1, 1, 1 ];

		assert.deepEqual( actual, expected );

		actual = neq( data, tmp );
		expected = [ 1, 1, 1, 1, 1, 1, 0 ];

		assert.deepEqual( actual, expected );

		// Array of comparison values:
		actual = neq( data, [ false, 0, true, undefined, '5', 4, tmp ] );
		expected = [ 1, 1, 0, 1, 1, 1, 0 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should treat an equal length comparison array as a single comparison element when the array option is true', function test() {
		var data, expected, actual, tmp;

		tmp = [ 1, 2 ];
		data = [ tmp, 'foo' ];

		// Strict mode:
		actual = neq( data, tmp, {'array':true} );
		expected = [ 0, 1 ];

		assert.deepEqual( actual, expected );

		// Non-strict mode:
		actual = neq( data, tmp, {'array':true, 'strict': false} );
		expected = [ 0, 1 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		var actual = neq( [], 10 ),
			expected = [];

		assert.deepEqual( actual, expected );
	});

});
