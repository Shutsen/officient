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

  it('should display the correct data in the people table', () => {
    wrapper.setData({
      people: [
        { 'id': 3059, 'name': 'Barry White', 'email': 'barrywhite@example.com', 'role_name': 'Accountant' },
        { 'id': 3058, 'name': 'David Gilmour', 'email': 'davidgilmour@example.com', 'role_name': 'Sales Manager' },
        { 'id': 3057, 'name': 'Geert Van Campenhout', 'email': 'vancampenhoutgeert@gmail.com', 'role_name': 'Front-end Developer' }
      ]
    })
    expect(wrapper.find('tbody > tr:first-child > td:first-child').text()).toMatch('Barry White')
    let tableElements = wrapper.findAll('tbody > tr')
    expect(tableElements.length).toBe(3)
  })

  it('should display is-loading gif during API request', () => {
    // when loading = true
    expect(wrapper.findAll('.loading').length).toBe(1)
  })


  it('should not display is-loading gif after API request', () => {
    // when loading = false
    wrapper.setData({
      isLoading: false
    })
    expect(wrapper.findAll('.loading').length).toBe(0)
  })
})
