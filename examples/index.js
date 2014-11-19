'use strict';

var neq = require( './../lib' ),
	sum = require( 'compute-sum' );

// Simulate some data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*20 );
}

var out = neq( data, 10 );

// Count the number of values not equal to 10...
var count = sum( out );

console.log( 'Total: %d', count );
