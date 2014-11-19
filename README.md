Not Equal
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise comparison (not equal) of an array.


## Installation

``` bash
$ npm install compute-neq
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var neq = require( 'compute-neq' );
```

#### neq( arr, x[, opts] )

Computes an element-wise comparison (not equal) for each input `array` element. `x` may either be an `array` of equal length or a single value (of any type).

The function returns an `array` with length equal to that of the input `array`. Each output `array` element is either `0` or `1`. A value of `1` means that an element is __not__ equal to a compared value and `0` means that an element is equal to a compared value.

``` javascript
var arr = [ 5, 3, 8, 3, 2 ],
	out;

// Single comparison value:
out = neq( arr, 3 );
// returns [ 1, 0, 1, 0, 1 ]

// Array of comparison values:
out = neq( arr, [ 5, 2, 8, 7, 3 ] );
// returns [ 0, 1, 0, 1, 1 ]
```

By default, the function enforces type equality. To turn off type equality, set the `strict` options flag to `false`.

``` javascript
var arr = [ 1, 0, 3, null, undefined ],
	compare = [ true, false, 2, 0, 1 ],
	out;

out = neq( arr, compare );
// returns [ 1, 1, 1, 1, 1 ];

out = neq( arr, compare, {'strict': false} );
// returns [ 0, 0, 1, 1, 1 ]
```

By default, if provided a comparison `array` which has a length equal to the input `array` length, the function assumes an element-by-element comparison. To turn off element-by-element comparison for equal length `arrays`, set the `array` options flag to `true`.

``` javascript
var el = [ 1, 2 ],
	arr = [ el, null ],
	out;

out = neq( arr, el );
// returns [ 1, 1 ];

out = neq( arr, el, {'array': true} );
// returns [ 0, 1 ];
```




## Notes

*	Currently, this function only computes shallow inequality and does __not__ compute deep inequality when comparing `arrays` or `objects`.


## Examples

``` javascript
var neq = require( 'compute-neq' ),
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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-neq.svg
[npm-url]: https://npmjs.org/package/compute-neq

[travis-image]: http://img.shields.io/travis/compute-io/neq/master.svg
[travis-url]: https://travis-ci.org/compute-io/neq

[coveralls-image]: https://img.shields.io/coveralls/compute-io/neq/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/neq?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/neq.svg
[dependencies-url]: https://david-dm.org/compute-io/neq

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/neq.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/neq

[github-issues-image]: http://img.shields.io/github/issues/compute-io/neq.svg
[github-issues-url]: https://github.com/compute-io/neq/issues
