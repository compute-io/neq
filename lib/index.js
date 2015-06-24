'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var neq1 = require( './element.js' ),
	neq2 = require( './array.js' ),
	neq3 = require( './accessor.js' ),
	neq4 = require( './matrix.js' );


// EQUAL //

/**
* FUNCTION: neq( x, y[, opts] )
*	Computes an element-wise comparison (not equal).
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {*} y - comparator
* @param {Object} [opts] - function options
* @param {Boolean} [opts.strict=true] - option indicating whether to enforce type equality
* @param {Boolean} [opts.array=false] - option indicating whether to not perform element-by-element comparison when provided arrays of equal length
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} array or matrix of 1s and 0s,
* where a `1` indicates that an input element is not equal to a compared value and `0` indicates that an input element is equal to a compared value
*/
function neq( x, y, options ) {
	/* jshint newcap:false */
	var opts = {},
		err,
		out,
		strict;
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	strict = opts.strict;
	if ( strict === undefined ) {
		strict = true;
	}
	if ( isMatrixLike( x ) ) {
		if ( opts.copy !== false ) {
			out = matrix( x.shape, 'uint8' );
		} else {
			out = x;
		}
		return neq4( out, x, y, strict );
	}
	if ( isArrayLike( x ) ) {
		// Handle regular, typed, and accessor arrays...
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( !isArray( x ) ) {
			out = new Uint8Array( x.length );
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return neq3( out, x, y, opts.accessor, strict, opts.array );
		}
		return neq2( out, x, y, strict, opts.array );
	}
	return neq1( x, y, strict );
} // end FUNCTION neq()


// EXPORTS //

module.exports = neq;
