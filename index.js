// @flow
import React, { Component } from 'react'

type Props = { top?: number | string }
type State = { height?: number, valid?: boolean }

const throwProps = (props: any): void => {
  if ('top' in props && typeof props.top !== 'number' && typeof props.top !== 'string') {
    throw new TypeError(`Centpn props.top must be "number" | "string"`)
  }
}

export default class Centpn extends Component<Props, State> {
  ref: (React$ElementRef<React$ElementType> | null) => void
  getHeight: () => number
  getOffsetTop: () => number

  constructor(props: Props): void {
    super(props)

    throwProps(props)

    this.state = {
      height: undefined,
      valid: undefined
    }

    this.ref = (div: any) => {
      if (div) {
        ;(div: React$ElementRef<React$ElementType>)
        this.getHeight = () => div.clientHeight
        this.getOffsetTop = () => div.offsetTop
      } else {
        ;(div: null)
        delete this.getHeight
        delete this.getOffsetTop
      }
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    throwProps(nextProps)
  }

  componentDidMount() {
    this.setState({ height: this.getHeight() })
  }

  componentDidUpdate(prevprops: Props, prevstate: State) {
    const { state } = this
    const height = this.getHeight()
    const valid = this.getOffsetTop() >= 0
    return (
      typeof state.valid !== 'boolean' ||
      (prevstate.height !== state.height && valid !== state.valid)
        ? this.setState({ valid, height })
        : height !== state.height && this.setState({ height })
    )
  }

  render() {
    const attributes = {}

    const { ref, props, state: { height, valid } } = this

    Object
    .keys(props)
    .filter(key => key !== 'top')
    .forEach(key => attributes[key] = props[key])

    attributes.style = Object.assign({}, attributes.style,
      typeof height !== 'number' ? {
        position: 'relative',
        visibility: 'hidden'
      } : typeof valid !== 'boolean' ? {
        position: 'relative',
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