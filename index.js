// @flow
import React, { Component } from 'react'

type Props = { top?: number | string }
type State = { height?: number, valid?: boolean }
type GetRawValueFn = () => number

const throws = (message) => { throw new Error(message) }
const asserts = (condition, message) => !condition && throws(message)

export default class Centpn extends Component<Props, State> {
  ref: (React$ElementRef<React$ElementType> | null) => void
  getClientHeight: GetRawValueFn
  getOffsetTop: GetRawValueFn

  asserts() {
    asserts(
      !('top' in this.props) ||
      typeof this.props.top === 'number' ||
      typeof this.props.top === 'string',
      `Centpn props.top must be "number" | "string"`
    )
  }

  constructor(props: Props): void {
    super(props)

    this.asserts()

    this.state = {
      height: undefined,
      valid: undefined
    }

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
      this.setState({ valid: this.isValid() })
    )
  }

  componentDidUpdate(preprops: Props) {
    this.asserts()

    const height = this.getClientHeight()

    this.state.height !== height ?
      this.setState({ valid: true, height }, () => this.setValidIfDiff()) :
    this.props.top === preprops.top ?
      false :
    this.state.valid ?
      this.setValidIfDiff() :
      this.setState({ valid: true }, () => this.setValidIfDiff())
  }

  isValid() {
    const offsetTop = this.getOffsetTop()
    return typeof offsetTop === 'number' && offsetTop >= 0
  }

  setValidIfDiff() {
    const valid = this.isValid()
    this.state.valid !== valid && this.setState({ valid })
  }

  render() {
    const { ref, props, state: { height, valid } } = this
    const attrs = {}

    Object.keys(props).forEach(key => key === 'top' ? false : attrs[key] = props[key])

    attrs.style = Object.assign({}, attrs.style, { position: 'relative' },
      typeof height !== 'number' ?
      { visibility: 'hidden' } :
      typeof valid !== 'boolean' ?
      { visibility: 'hidden', top: topAsCalc(height, props.top) } :
      { top: valid && topAsCalc(height, props.top) }
    )

    return <div {...{ ref }} {...attrs} />
  }
}

const topAsCalc = (height, propsTop): string =>
  'calc(50%'
  + ` - ${height / 2}px`
  + topByProps(propsTop)
  + ')'

const topByProps = (propsTop): string =>
  !propsTop ?
  '' :
  typeof propsTop === 'number' ?
  ` + (${propsTop}px)` :
  ` + (${propsTop})`