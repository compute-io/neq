'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @private
* @param {Object} opts - destination for validated options
* @param {Object} options - function options1
* @param {Boolean} [options.strict=true] - option indicating whether to enforce type equality
* @param {Boolean} [options.array=false] - option indicating whether to not perform element-by-element comparison when provided arrays of equal length
* @param {Boolean} [options.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [options.accessor=null] - accessor function for accessing array values
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'neq()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
	}

	if ( options.hasOwnProperty( 'accessor' ) ) {
		opts.accessor = options.accessor;
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'neq()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'array' ) ) {
		opts.array = options.array;
		if ( !isBoolean( opts.array ) ) {
			return new TypeError( 'neq()::invalid option. Array option must be a boolean primitive. Option: `' + opts.array + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'neq()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'strict' ) ) {
		opts.strict = options.strict;
		if ( !isBoolean( opts.strict ) ) {
			return new TypeError( 'neq()::invalid option. Strict option must be a boolean primitive. Option: `' + opts.strict + '`.' );
		}
	}

	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
