var util = require('util')
var assign = (exports.assign = require('object.assign').getPolyfill())

exports.inherits = util.inherits

exports.clamp = function clamp(value, range) {
  return Math.min(Math.max(value, range[0]), range[1])
}

var type = (exports.type = function type(value) {
  if (value === undefined) {
    return 'undefined'
  } else if (value === null) {
    return 'null'
  } else if (Buffer.isBuffer(value)) {
    return 'buffer'
  }
  return Object.prototype.toString
    .call(value)
    .replace(/^\[.+\s(.+?)]$/, '$1')
    .toLowerCase()
})

exports.createMap = function (obj) {
  return assign.apply(
    null,
    [Object.create(null)].concat(Array.prototype.slice.call(arguments))
  )
}

exports.defineConstants = function (obj) {
  if (type(obj) !== 'object' || !Object.keys(obj).length) {
    throw new TypeError('Invalid argument; expected a non-empty object')
  }
  return Object.freeze(exports.createMap(obj))
}

exports.isPromise = function isPromise(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.then === 'function'
  )
}
