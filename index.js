// @flow
import React, { Component } from 'react'

const { assign } = Object
const raf = callback => window.requestAnimationFrame(callback)
const caf = requestId => window.cancelAnimationFrame(requestId)

type RefFn = (React$ElementRef<React$ElementType> | null) => void
type GetHeightFn = () => number

function ref(div: any) {
  if (div) {
    ;(div: React$ElementRef<React$ElementType>)
    this.getHeight = () => div.clientHeight
  } else {
    ;(div: null)
    delete this.getHeight
  }
}

type Props = {
  top: number,
  style: { [key: string]: any },
  children: React$Node
}

type State = { height?: number }

type PropsCustom = {
  style: { visibility: 'hidden' } | { position: 'relative', top: number },
  children: React$Node
}

export default class Centpn extends Component<Props, State> {
  static defaultProps: { top: 0 }
  ref: RefFn
  getHeight: GetHeightFn
  requestId: void | number

  constructor(props: Props): void {
    super(props)
    this.throwInvalidProps(props)
    this.state = { height: undefined }
    this.requestId = undefined
    this.ref = ref.bind(this)
  }

  render() {
    return <div ref={this.ref} {...this.processedProps()} />
  }

  processedProps(): PropsCustom {
    const { top } = this.props
    const { height } = this.state
    return assign({}, this.props, {
      top: undefined,
      style: assign(
        {},
        this.props.style,
        typeof height !== 'number'
          ? { visibility: 'hidden' }
          : { position: 'relative', top: `calc(50% + ${top - height / 2}px)` }
      )
    })
  }

  componentDidMount() {
    this.rafSetState(this.getHeight())
  }

  componentWillReceiveProps(nextProps: Props) {
    this.throwInvalidProps(nextProps)
  }

  componentDidUpdate() {
    const height = this.getHeight()
    if (height !== this.state.height) {
      this.rafSetState(height)
    }
  }

  rafSetState(height: number): void {
    this.requestId = raf(() => this.setState({ height }))
  }

  componentWillUnmount() {
    caf(this.requestId)
  }

  throwInvalidProps(props: Props): void {
    if (typeof props.top !== 'number') {
      throw new TypeError(`Centpn props.top must be "number"`)
    }
  }
}

Centpn.defaultProps = { top: 0 }
