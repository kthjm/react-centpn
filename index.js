// @flow
import React, { Component } from 'react'

const raf = callback => window.requestAnimationFrame(callback)
const caf = requestId => window.cancelAnimationFrame(requestId)

type RefFn = (React$ElementRef<React$ElementType> | null) => void
type GetHeightFn = () => number
type Props = { top?: number | string }
type State = { height?: number }
type PropsCustom = {
  style: { visibility: 'hidden' } | { position: 'relative', top: number },
  children: React$Node
}

const topProcess = (top) =>
  !top
    ? ''
    : ` + (${typeof top === 'number' ? String(top) + 'px' : top})`

export default class Centpn extends Component<Props, State> {
  ref: RefFn
  getHeight: GetHeightFn
  requestId: void | number

  constructor(props: Props): void {
    super(props)
    this.throwProps(props)
    this.state = { height: undefined }
    this.requestId = undefined
    this.ref = (div: any) => {
      if (div) {
        ;(div: React$ElementRef<React$ElementType>)
        this.getHeight = () => div.clientHeight
      } else {
        ;(div: null)
        delete this.getHeight
      }
    }
  }

  render() {
    const { ref, props, state: { height } } = this
    const re_props = {}

    Object.keys(props)
    .filter(key => key !== 'top')
    .forEach(key => re_props[key] = props[key])

    re_props.style = Object.assign({}, re_props.style,
      typeof height !== 'number'
      ? { visibility: 'hidden' }
      : { position: 'relative', top: `calc(50% - ${height / 2}px${topProcess(props.top)})` }
    )

    return <div {...{ ref }} {...re_props} />
  }

  componentDidMount() {
    this.setStateRaf({ height: this.getHeight() })
  }

  componentDidUpdate() {
    const height = this.getHeight()
    return height !== this.state.height && this.setStateRaf({ height })
  }

  setStateRaf(nextstate: State): void {
    this.requestId = raf(() => this.setState(nextstate))
  }

  componentWillUnmount() {
    caf(this.requestId)
  }

  componentWillReceiveProps(nextProps: Props) {
    this.throwProps(nextProps)
  }

  throwProps(props: any): void {
    if ('top' in props && typeof props.top !== 'number' && typeof props.top !== 'string') {
      throw new TypeError(`Centpn props.top must be "number" | "string"`)
    }
  }
}