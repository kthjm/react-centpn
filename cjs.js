'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var React = require('react')
var React__default = _interopDefault(React)

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

var raf = function raf(callback) {
  return window.requestAnimationFrame(callback)
}
var caf = function caf(requestId) {
  return window.cancelAnimationFrame(requestId)
}

function ref(div) {
  if (div) {
    this.getHeight = function() {
      return div.clientHeight
    }
  } else {
    delete this.getHeight
  }
}

var Centpn = (function(_Component) {
  inherits(Centpn, _Component)

  function Centpn(props) {
    classCallCheck(this, Centpn)

    var _this = possibleConstructorReturn(
      this,
      (Centpn.__proto__ || Object.getPrototypeOf(Centpn)).call(this, props)
    )

    _this.throwInvalidProps(props)
    _this.state = { height: undefined }
    _this.requestId = undefined
    _this.ref = ref.bind(_this)
    return _this
  }

  createClass(Centpn, [
    {
      key: 'render',
      value: function render() {
        return React__default.createElement(
          'div',
          _extends({ ref: this.ref }, this.processedProps())
        )
      }
    },
    {
      key: 'processedProps',
      value: function processedProps() {
        var top = this.props.top
        var height = this.state.height

        return assign({}, this.props, {
          top: undefined,
          style: assign(
            {},
            this.props.style,
            typeof height !== 'number'
              ? { visibility: 'hidden' }
              : {
                  position: 'relative',
                  top: 'calc(50% + ' + (top - height / 2) + 'px)'
                }
          )
        })
      }
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.rafSetState(this.getHeight())
      }
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.throwInvalidProps(nextProps)
      }
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var height = this.getHeight()
        if (height !== this.state.height) {
          this.rafSetState(height)
        }
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
    },
    {
      key: 'throwInvalidProps',
      value: function throwInvalidProps(props) {
        if (typeof props.top !== 'number') {
          throw new TypeError('Centpn props.top must be "number"')
        }
      }
    }
  ])
  return Centpn
})(React.Component)

Centpn.defaultProps = { top: 0 }

module.exports = Centpn
