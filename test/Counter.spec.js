/* eslint-disable */

import { mount } from '@vue/test-utils'
import Counter from '../src/components/Counter.vue'
import expect from 'expect'

describe('Counter.vue', () => {
  it('increments count when button is clicked', () => {
    const wrapper = mount(Counter)
    wrapper.find('button').trigger('click')
    expect(wrapper.find('div').text()).toMatch('1')
  })
})
