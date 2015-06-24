/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	neq = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor neq', function tests() {

	it( 'should export a function', function test() {
		expect( neq ).to.be.a( 'function' );
	});

	it( 'should correctly compare values (non-strict) with a single element using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':false},
			{'x':0},
			{'x':'0'},
			{'x':3}
		];
		actual = new Array( data.length );
		actual = neq( actual, data, false, getValue );

		expected = [
			0,
			0,
			0,
			1
		];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should correctly compare values (strict) with a single element using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':false},
			{'x':0},
			{'x':'0'},
			{'x':3}
		];
		actual = new Array( data.length );
		actual = neq( actual, data, false, getValue, true );

		expected = [
			0,
			1,
			1,
			1
		];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should perform an element-wise not-equal check of an object array and a primitive array using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [ 0, 1, 2, 3 ];

		actual = new Array( data.length );
		actual = neq( actual, data, y, getValue );

		expected = [
			0,
			0,
			0,
			0
		];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should perform an element-wise not-equal check of two object arrays using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			{'y':0},
			{'y':1},
			{'y':2},
			{'y':3}
		];

		actual = new Array( data.length );
		actual = neq( actual, data, y, getValue );

		expected = [
			0,
			0,
			0,
			0
		];

		assert.deepEqual( actual, expected );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should return empty array if provided an empty array', function test() {
		assert.deepEqual( neq( [], [], 1, getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

});
