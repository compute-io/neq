/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	neq = require( './../lib/element.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'element neq', function tests() {

	it( 'should export a function', function test() {
		expect( neq ).to.be.a( 'function' );
	});

	it( 'should correctly compare values (non-strict)', function test() {
		assert.strictEqual( neq( null, undefined, false ), 0 );
		assert.strictEqual( neq( '3', 3, false ), 0 );
		assert.strictEqual( neq( 0, false, false ), 0 );
	});

	it( 'should correctly compare values (strict)', function test() {
		assert.strictEqual( neq( null, undefined, true ), 1 );
		assert.strictEqual( neq( '3', 3, true ), 1 );
		assert.strictEqual( neq( 0, false, true ), 1 );

		assert.strictEqual( neq( 2, 2, false ), 0 );
		assert.strictEqual( neq( '3', '3', false ), 0 );
		assert.strictEqual( neq( true, true, false ), 0 );
	});

});
