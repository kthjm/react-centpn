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
var raf = function raf(callback) {
  return window.requestAnimationFrame(callback)
}
var caf = function caf(requestId) {
  return window.cancelAnimationFrame(requestId)
}

var topProcess = function topProcess(top) {
  return !top
    ? ''
    : typeof top === 'number' ? ' + (' + top + 'px)' : ' + (' + top + ')'
}

var Centpn = (function(_Component) {
  inherits(Centpn, _Component)

  function Centpn(props) {
    classCallCheck(this, Centpn)

    var _this = possibleConstructorReturn(
      this,
      (Centpn.__proto__ || Object.getPrototypeOf(Centpn)).call(this, props)
    )

    _this.throwProps(props)
    _this.state = { height: undefined }
    _this.requestId = undefined
    _this.ref = function(div) {
      if (div) {
        _this.getHeight = function() {
          return div.clientHeight
        }
      } else {
        delete _this.getHeight
      }
    }
    return _this
  }

  createClass(Centpn, [
    {
      key: 'render',
      value: function render() {
        var ref = this.ref,
          props = this.props,
          height = this.state.height

        var re_props = {}

        Object.keys(props)
          .filter(function(key) {
            return key !== 'top'
          })
          .forEach(function(key) {
            return (re_props[key] = props[key])
          })

        re_props.style = Object.assign(
          {},
          re_props.style,
          typeof height !== 'number'
            ? { visibility: 'hidden' }
            : {
                position: 'relative',
                top:
                  'calc(50% - ' +
                  height / 2 +
                  'px' +
                  topProcess(props.top) +
                  ')'
              }
        )

        return React.createElement('div', _extends({ ref: ref }, re_props))
      }
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.setStateRaf({ height: this.getHeight() })
      }
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var height = this.getHeight()
        return (
          height !== this.state.height && this.setStateRaf({ height: height })
        )
      }
    },
    {
      key: 'setStateRaf',
      value: function setStateRaf(nextstate) {
        var _this2 = this

        this.requestId = raf(function() {
          return _this2.setState(nextstate)
        })
      }
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        caf(this.requestId)
      }
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.throwProps(nextProps)
      }
    },
    {
      key: 'throwProps',
      value: function throwProps(props) {
        if (
          'top' in props &&
          typeof props.top !== 'number' &&
          typeof props.top !== 'string'
        ) {
          throw new TypeError('Centpn props.top must be "number" | "string"')
        }
      }
    }
  ])
  return Centpn
})(Component)

export default Centpn
