'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isObject = require( 'validate.io-object' );

// FUNCTIONS //

var NEQUAL = require( './element.js' );


// NOT EQUAL //

/**
* FUNCTION: neq( out, x, y, clbk, strict[, array ] )
*	Computes an element-wise comparison (not equal) of an array using an accessor.
*
* @param {Array} out - output array
* @param {Array} x - input array
* @param {*} y - comparator
* @param {Function} accessor - accessor function for accessing array values
* @param {Boolean} strict - boolean indicating whether to enforce type equality
* @param {Boolean} [array=false] - boolean indicating whether to not perform element-by-element comparison when provided arrays of equal length
* @returns {Array} array of 1s and 0s, where a `1` indicates that an input array element is not equal to a compared value and `0` indicates that an input array element is equal to a compared value
*/
function neq( out, x, y, clbk, strict, array ) {
	var len = x.length,
		i,
		xVal, yVal;

	if ( !isArrayLike( y ) || y.length !== len || array ) {
		for ( i = 0; i < len; i++ ) {
			xVal  = clbk( x[ i ], i, 0 );
			out[ i ] = NEQUAL( xVal, y, strict );
		}
	} else {
		if ( !isObject( y[ 0 ] ) ) {
			// y is primitive array -> callback does not have to be applied
			for ( i = 0; i < len; i++ ) {
				xVal  = clbk( x[ i ], i, 0 );
				out[ i ] = NEQUAL( xVal, y[ i ], strict );
			}
		} else {
			// y is an object array, too -> callback is applied
			for ( i = 0; i < len; i++ ) {
				xVal = clbk( x[ i ], i, 0 );
				yVal = clbk( y[ i ], i, 1 );
				out[ i ] = NEQUAL( xVal, yVal, strict );
			}
		}
	}
	return out;
} // end FUNCTION neq()


// EXPORTS //

module.exports = neq;
