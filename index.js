// @flow
import React, { Component } from 'react'

type Props = { top?: number | string }
type State = { height?: number, valid?: boolean }
type GetRawValueFn = () => number

const throwProps = (props: any): void => {
  if ('top' in props && typeof props.top !== 'number' && typeof props.top !== 'string') {
    throw new TypeError(`Centpn props.top must be "number" | "string"`)
  }
}

export default class Centpn extends Component<Props, State> {
  ref: (React$ElementRef<React$ElementType> | null) => void
  getClientHeight: GetRawValueFn
  getOffsetTop: GetRawValueFn

  componentWillReceiveProps(nextProps: Props) {
    throwProps(nextProps)
  }

  constructor(props: Props): void {
    throwProps(props)

    super(props)

    this.state = { height: undefined, valid: undefined }

    this.ref = (div: any) => {
      if (div) {
        ;(div: React$ElementRef<React$ElementType>)
        this.getClientHeight = () => div.clientHeight
        this.getOffsetTop = () => div.offsetTop
      } else {
        ;(div: null)
        delete this.getClientHeight
        delete this.getOffsetTop
      }
    }
  }

  componentDidMount() {
    this.setState({ height: this.getClientHeight() }, () =>
      this.setState({ valid: this.getOffsetTop() >= 0 })
    )
  }

  componentDidUpdate() {
    const height = this.getClientHeight()
    return height !== this.state.height && this.setState({ height }, () => {
      const valid = this.getOffsetTop() >= 0
      return valid !== this.state.valid && this.setState({ valid })
    })
  }

  render() {
    const attributes = {}
    const { ref, props, state: { height, valid } } = this

    Object.keys(props).forEach(key =>
      key === 'top'
        ? false
        : attributes[key] = props[key]
    )

    attributes.style = Object.assign({}, attributes.style,
      typeof height !== 'number' ? {
        position: 'relative',
        visibility: 'hidden'
      } : typeof valid !== 'boolean' ? {
        position: 'relative',
        visibility: 'hidden',
        top: topAsCalc(height, props.top)
      } : {
        position: 'relative',
        top: valid && topAsCalc(height, props.top)
      }
    )

    return <div {...{ ref }} {...attributes} />
  }
}

const topAsCalc = (height, top): string =>
  'calc(50%'
  + ` - ${height / 2}px`
  + plusTop(top)
  + ')'

const plusTop = (top): string =>
  !top
    ? ''
    : typeof top === 'number'
      ? ` + (${top}px)`
      : ` + (${top})`