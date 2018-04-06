import assert from 'assert'
import rewire from 'rewire'
import sinon from 'sinon'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import enzyme from 'enzyme'
enzyme.configure({ adapter: new Adapter() })

it('throw: typeof props.top !== "number"', () => {
  const Centpn = rewire('./index.js').default
  const invalids = [true, false, null, {}, [], () => {}]
  invalids.forEach(top =>
    assert.throws(
      () => enzyme.shallow(<Centpn {...{ top }} />),
      /Centpn props.top must be "number" | "string"/
    )
  )
})

it('ref set getHeight', () => {
  const modules = rewire('./index.js')

  const Centpn = modules.default
  const wrapper = enzyme.mount(<Centpn />)

  const instance = wrapper.instance()
  assert.ok(typeof instance.getHeight === 'function')
  assert.ok(typeof instance.getOffsetTop === 'function')

  wrapper.unmount()
  assert.ok(!instance.getHeight)
  assert.ok(!instance.getOffsetTop)
})

it('mount => setProps()', () => {
  const Centpn = rewire('./index.js').default
  const display = 'inline-block'
  const position = 'relative'
  const wrapper = enzyme.mount(<Centpn style={{ display }} />)

  // componentDidMount + componentDidUpdate
  assert.deepEqual(wrapper.childAt(0).getElement().props.style, {
    display,
    position,
    top: `calc(50% - 0px)`
  })

  assert.deepEqual(
    wrapper
      .setProps({ top: -10 })
      .childAt(0)
      .getElement().props.style,
    {
      display,
      position,
      top: `calc(50% - 0px + (-10px))`
    }
  )

  assert.deepEqual(
    wrapper
      .setProps({ top: '-10%' })
      .childAt(0)
      .getElement().props.style,
    {
      display,
      position,
      top: `calc(50% - 0px + (-10%))`
    }
  )
})

describe('plusTop()', () => {
  const plusTop = rewire('./index.js').__get__('plusTop')

  it('undefined', () => assert.equal(plusTop(undefined), ''))

  it('string', () => assert.equal(plusTop('-10%'), ' + (-10%)'))

  it('number', () => assert.equal(plusTop(-10), ' + (-10px)'))
})
