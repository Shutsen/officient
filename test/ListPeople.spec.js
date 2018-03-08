/* eslint-disable */

import { mount } from '@vue/test-utils'
import ListPeople from '../src/components/ListPeople.vue'
import expect from 'expect'

describe('ListPeople.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ListPeople)
  })

  it('displays the correct title', () => {
    expect(wrapper.find('.is-3').text()).toMatch('List of Employees')
  })

  it('displays the correct title', () => {
    expect(wrapper.contains('table')).toBe(true)
  })

  it('should display Barry in the people table', () => {
    wrapper.setData({
      people: [
        { 'id': 3059, 'name': 'Barry White', 'email': 'barrywhite@example.com', 'role_name': 'Accountant' },
      ]
    })
    expect(wrapper.find('tbody > tr:first-child > td:first-child').text()).toMatch('Barry White')
  })
})
