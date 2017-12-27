// @flow
import React, { Component } from 'react'

const { assign } = Object
const isNum = data => typeof data === 'number'
const raf = callback => window.requestAnimationFrame(callback)
const caf = id => window.cancelAnimationFrame(id)
const deductFromHalf = value => `calc(50% - ${value}px)`

function ref(target) {
  if (target) {
    this.getHeight = () => target.clientHeight
  }
}

export default class VerticalCenter extends Component {
  constructor(props) {
    super(props)
    this.ref = ref.bind(this)
    this.state = { height: undefined }
  }

  render() {
    const props = assign({}, this.props, {
      style: assign({}, this.props.style)
    })

    const { style } = props
    const { height } = this.state

    if (!isNum(height)) {
      style.visibility = 'hidden'
    } else {
      const deduct = props.deduct || 0
      style.position = 'relative'
      style.top = deductFromHalf(height / 2 + deduct)
    }

    props.deduct = undefined

    return <div ref={this.ref} {...props} />
  }

  componentDidMount() {
    const height = this.getHeight()
    return this.rafSetState(height)
  }

  componentDidUpdate() {
    const height = this.getHeight()
    return height !== this.state.height && this.rafSetState(height)
  }

  rafSetState(height) {
    this.requestId = raf(() => this.setState({ height }))
  }

  componentWillUnmount() {
    caf(this.requestId)
  }
}
