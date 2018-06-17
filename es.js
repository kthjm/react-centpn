import React, { Component } from 'react'

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

var _createClass = (function() {
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
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

//
var throws = function throws(message) {
  throw new Error(message)
}
var _asserts = function _asserts(condition, message) {
  return !condition && throws(message)
}

var Centpn = (function(_Component) {
  _inherits(Centpn, _Component)

  _createClass(Centpn, [
    {
      key: 'asserts',
      value: function asserts() {
        _asserts(
          !('top' in this.props) ||
            typeof this.props.top === 'number' ||
            typeof this.props.top === 'string',
          'Centpn props.top must be "number" | "string"'
        )
      }
    }
  ])

  function Centpn(props) {
    _classCallCheck(this, Centpn)

    var _this = _possibleConstructorReturn(
      this,
      (Centpn.__proto__ || Object.getPrototypeOf(Centpn)).call(this, props)
    )

    _this.asserts()

    _this.state = {
      height: undefined,
      valid: undefined
    }

    _this.ref = function(div) {
      if (div) {
        _this.getClientHeight = function() {
          return div.clientHeight
        }
        _this.getOffsetTop = function() {
          return div.offsetTop
        }
      } else {
        delete _this.getClientHeight
        delete _this.getOffsetTop
      }
    }
    return _this
  }

  _createClass(Centpn, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this

        this.setState({ height: this.getClientHeight() }, function() {
          return _this2.setState({ valid: _this2.isValid() })
        })
      }
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(preprops) {
        var _this3 = this

        this.asserts()

        var height = this.getClientHeight()

        this.state.height !== height
          ? this.setState({ valid: true, height: height }, function() {
              return _this3.setValidIfDiff()
            })
          : this.props.top === preprops.top
            ? false
            : this.state.valid
              ? this.setValidIfDiff()
              : this.setState({ valid: true }, function() {
                  return _this3.setValidIfDiff()
                })
      }
    },
    {
      key: 'isValid',
      value: function isValid() {
        var offsetTop = this.getOffsetTop()
        return typeof offsetTop === 'number' && offsetTop >= 0
      }
    },
    {
      key: 'setValidIfDiff',
      value: function setValidIfDiff() {
        var valid = this.isValid()
        this.state.valid !== valid && this.setState({ valid: valid })
      }
    },
    {
      key: 'render',
      value: function render() {
        var ref = this.ref,
          props = this.props,
          _state = this.state,
          height = _state.height,
          valid = _state.valid

        var attrs = {}

        Object.keys(props).forEach(function(key) {
          return key === 'top' ? false : (attrs[key] = props[key])
        })

        attrs.style = Object.assign(
          {},
          attrs.style,
          { position: 'relative' },
          typeof height !== 'number'
            ? { visibility: 'hidden' }
            : typeof valid !== 'boolean'
              ? { visibility: 'hidden', top: topAsCalc(height, props.top) }
              : { top: valid && topAsCalc(height, props.top) }
        )

        return React.createElement('div', _extends({ ref: ref }, attrs))
      }
    }
  ])

  return Centpn
})(Component)

var topAsCalc = function topAsCalc(height, propsTop) {
  return 'calc(50%' + (' - ' + height / 2 + 'px') + topByProps(propsTop) + ')'
}

var topByProps = function topByProps(propsTop) {
  return !propsTop
    ? ''
    : typeof propsTop === 'number'
      ? ' + (' + propsTop + 'px)'
      : ' + (' + propsTop + ')'
}

export default Centpn
