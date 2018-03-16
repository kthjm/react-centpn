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

  const raf = sinon.spy()
  const caf = sinon.spy()

  return modules.__with__({ raf, caf })(() => {
    const Centpn = modules.default
    const wrapper = enzyme.mount(<Centpn />)
    const instance = wrapper.instance()

    assert.ok(typeof instance.getHeight === 'function')
    assert.equal(raf.callCount, 1)
    assert.equal(caf.callCount, 0)

    wrapper.unmount()
    assert.equal(caf.callCount, 1)
    assert.ok(!instance.getHeight)
  })
})

it('mount => setProps()', () => {
  window.requestAnimationFrame = callback => callback()

  const Centpn = rewire('./index.js').default
  const display = 'inline-block'
  const wrapper = enzyme.mount(<Centpn style={{ display }} />)

  // componentDidMount + componentDidUpdate
  assert.deepEqual(wrapper.childAt(0).getElement().props.style, {
    display,
    position: 'relative',
    top: `calc(50% - 0px)`
  })

  assert.deepEqual(
    wrapper
      .setProps({ top: -10 })
      .childAt(0)
      .getElement().props.style,
    {
      display,
      position: 'relative',
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
      position: 'relative',
      top: `calc(50% - 0px + (-10%))`
    }
  )
})

describe('topProcess()', () => {
  const topProcess = rewire('./index.js').__get__('topProcess')

  it('undefined', () => assert.equal(topProcess(undefined), ''))

  it('string', () => assert.equal(topProcess('-10%'), ' + (-10%)'))

  it('number', () => assert.equal(topProcess(-10), ' + (-10px)'))
})
