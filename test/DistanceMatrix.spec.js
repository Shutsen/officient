/* eslint-disable */

import { mount } from '@vue/test-utils'
import DistanceMatrix from '../src/components/DistanceMatrix.vue'
import expect from 'expect'

// Fix tests

describe('DistanceMatrix.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DistanceMatrix)
    wrapper.setData({
      dailyArrivals: [{text: '2 hours', value: 7200}, {text: '2 hours', value: 7200}, {text: '2 hours', value: 7200}, {text: '2 hours', value: 7200}, {text: '2 hours', value: 7200}],
      dailyDepartures: [{text: '1,5 hours', value: 5400}, {text: '1,5 hours', value: 5400}, {text: '1,5 hours', value: 5400}, {text: '1,5 hours', value: 5400}, {text: '1,5 hours', value: 5400}]
    })
  })

  it('should display the right time to go to WORK', () => {
    expect(wrapper.find('.dailyArrivals > td:nth-child(3)').text()).toMatch('2 hours')
  })

  it('should display the right time to go HOME', () => {
    expect(wrapper.find('.dailyDepartures > td:nth-child(2)').text()).toMatch('1,5 hours')
  })

  it('should display the right total time in transit per DAY', () => {
    expect(wrapper.find('.totalPerDay > td:nth-child(2)').text()).toMatch('3,5 hours 0 mins')
  })

  it('should display the right total time in transit per WEEK', () => {
    expect(wrapper.find('.totalPerDay > td:nth-child(7)').text()).toMatch('17,5 hours 0 mins')
  })
})
