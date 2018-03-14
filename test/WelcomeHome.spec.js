/* eslint-disable */

import { mount } from '@vue/test-utils'
import WelcomeHome from '../src/components/WelcomeHome.vue'
import expect from 'expect'

describe('WelcomeHome.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(WelcomeHome)
  })

  it('displays welcome msg after input', () => {
    expect(wrapper.contains('.welcome-msg')).toBe(false)

    let newGuest = wrapper.find('input')

    newGuest.element.value = 'Geert'
    newGuest.trigger('input')

    expect(wrapper.contains('.welcome-msg')).toBe(true)
    expect(wrapper.find('.welcome-msg').text()).toMatch('Well, hello Geert! It\'s so nice to have you here!')
  })

  it('displays the correct catch line', () => {
    wrapper.setData({
      msg: 'Learn something new, every single day!'
    })
    expect(wrapper.find('.catch-line').text()).toMatch('Learn something new, every single day!')
  })
})
