import React, { Component } from 'react'

var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }

    return target
  }

var inherits = function(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var possibleConstructorReturn = function(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }

  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

//
var assign = Object.assign

var isNum = function isNum(data) {
  return typeof data === 'number'
}
var raf = function raf(callback) {
  return window.requestAnimationFrame(callback)
}
var caf = function caf(callback) {
  return window.cancelAnimationFrame(callback)
}
var deductFromHalf = function deductFromHalf(value) {
  return 'calc(50% - ' + value + 'px)'
}

function ref(target) {
  if (target) {
    this.getHeight = function() {
      return target.clientHeight
    }
  }
}

var Center = (function(_Component) {
  inherits(Center, _Component)

  function Center(props) {
    classCallCheck(this, Center)

    var _this = possibleConstructorReturn(
      this,
      (Center.__proto__ || Object.getPrototypeOf(Center)).call(this, props)
    )

    _this.ref = ref.bind(_this)
    _this.state = { height: undefined }
    return _this
  }

  createClass(Center, [
    {
      key: 'render',
      value: function render() {
        var props = assign({}, this.props, {
          style: assign({}, this.props.style)
        })

        var style = props.style
        var height = this.state.height

        if (!isNum(height)) {
          style.visibility = 'hidden'
        } else {
          var deduct = props.deduct || 0
          style.position = 'relative'
          style.top = deductFromHalf(height / 2 + deduct)
        }

        props.deduct = undefined

        return React.createElement('div', _extends({ ref: this.ref }, props))
      }
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var height = this.getHeight()
        return this.rafSetState(height)
      }
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var height = this.getHeight()
        return height !== this.state.height && this.rafSetState(height)
      }
    },
    {
      key: 'rafSetState',
      value: function rafSetState(height) {
        var _this2 = this

        this.requestId = raf(function() {
          return _this2.setState({ height: height })
        })
      }
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        caf(this.requestId)
      }
    }
  ])
  return Center
})(Component)

export default Center
