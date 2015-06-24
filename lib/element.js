'use strict';

// NOT EQUAL //

/**
* FUNCTION: neq( x, y, strict )
*	Checks whether input element x is not equal to y
*
* @param {*} x - input value
* @param {*} y - comparator
* @param {Boolean} strict - option indicating whether to enforce type equality
* @returns {Number} 1 if element is not equal, 0 otherwise
*/
function neq( x, y, strict ) {
	if ( strict ) {
		return x !== y ? 1 : 0;
	} else {
		/* jshint eqeqeq:false */
		return x != y ? 1 : 0;
	}
} // end FUNCTION neq()

// EXPORTS //

module.exports = neq;
