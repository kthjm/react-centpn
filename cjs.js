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
var throwProps = function throwProps(props) {
  if (
    'top' in props &&
    typeof props.top !== 'number' &&
    typeof props.top !== 'string'
  ) {
    throw new TypeError('Centpn props.top must be "number" | "string"')
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

    throwProps(props)

    _this.state = {
      height: undefined,
      valid: undefined
    }

    _this.ref = function(div) {
      if (div) {
        _this.getHeight = function() {
          return div.clientHeight
        }
        _this.getOffsetTop = function() {
          return div.offsetTop
        }
      } else {
        delete _this.getHeight
        delete _this.getOffsetTop
      }
    }
    return _this
  }

  createClass(Centpn, [
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        throwProps(nextProps)
      }
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.setState({ height: this.getHeight() })
      }
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevprops, prevstate) {
        var state = this.state

        var height = this.getHeight()
        var valid = this.getOffsetTop() >= 0
        return typeof state.valid !== 'boolean' ||
          (prevstate.height !== state.height && valid !== state.valid)
          ? this.setState({ valid: valid, height: height })
          : height !== state.height && this.setState({ height: height })
      }
    },
    {
      key: 'render',
      value: function render() {
        var attributes = {}

        var ref = this.ref,
          props = this.props,
          _state = this.state,
          height = _state.height,
          valid = _state.valid

        Object.keys(props)
          .filter(function(key) {
            return key !== 'top'
          })
          .forEach(function(key) {
            return (attributes[key] = props[key])
          })

        attributes.style = Object.assign(
          {},
          attributes.style,
          typeof height !== 'number'
            ? {
                position: 'relative',
                visibility: 'hidden'
              }
            : typeof valid !== 'boolean'
              ? {
                  position: 'relative',
                  top: topAsCalc(height, props.top)
                }
              : {
                  position: 'relative',
                  top: valid && topAsCalc(height, props.top)
                }
        )

        return React__default.createElement(
          'div',
          _extends({ ref: ref }, attributes)
        )
      }
    }
  ])
  return Centpn
})(React.Component)

var topAsCalc = function topAsCalc(height, top) {
  return 'calc(50%' + (' - ' + height / 2 + 'px') + plusTop(top) + ')'
}

var plusTop = function plusTop(top) {
  return !top
    ? ''
    : typeof top === 'number' ? ' + (' + top + 'px)' : ' + (' + top + ')'
}

module.exports = Centpn
