import assert from 'assert'
import rewire from 'rewire'
import sinon from 'sinon'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import enzyme from 'enzyme'
enzyme.configure({ adapter: new Adapter() })

it('throw: typeof props.top !== "number"', () => {
  const Centpn = rewire('./index.js').default
  const invalids = ['string', true, false, null, {}, [], () => {}]
  invalids.forEach(top =>
    assert.throws(
      () => enzyme.shallow(<Centpn {...{ top }} />),
      /Centpn props.top must be "number"/
    )
  )
})

it('ref set getHeight', () => {
  const modules = rewire('./index.js')

  const raf = sinon.spy()
  const caf = sinon.spy()

  return modules.__with__({
    raf,
    caf
  })(() => {
    const Centpn = modules.default
    const wrapper = enzyme.mount(<Centpn />)
    const instance = wrapper.instance()
    assert.equal(wrapper.props().top, 0)
    assert.ok(typeof instance.getHeight === 'function')
    assert.equal(raf.callCount, 1)
    assert.equal(caf.callCount, 0)
    wrapper.unmount()
    assert.equal(caf.callCount, 1)
    assert.ok(!instance.getHeight)
  })
})

it('mount => setProps()', () => {
  const modules = rewire('./index.js')

  window.requestAnimationFrame = callback => callback()

  const getHeight = sinon.stub()

  const firstHeight = 100
  getHeight
    .onCall(0)
    .returns(firstHeight)
    .onCall(1)
    .returns(firstHeight)

  const secondHeight = 200
  getHeight
    .onCall(2)
    .returns(secondHeight)
    .onCall(3)
    .returns(secondHeight)

  return modules.__with__({
    ref() {
      this.getHeight = getHeight
    }
  })(() => {
    const Centpn = modules.default
    const wrapper = enzyme.mount(<Centpn />)

    // componentDidMount + componentDidUpdate
    assert.equal(getHeight.callCount, 2)
    assert.equal(wrapper.state('height'), firstHeight)
    assert.deepEqual(wrapper.childAt(0).getElement().props, {
      top: undefined,
      style: {
        position: 'relative',
        top: `calc(50% + ${0 - firstHeight / 2}px)`
      }
    })

    // componentDidUpdate
    wrapper.setProps({ top: 10 })
    assert.equal(getHeight.callCount, 4)
    assert.equal(wrapper.state('height'), secondHeight)
  })
})
