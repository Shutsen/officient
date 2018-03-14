/* eslint-disable */

import { mount } from '@vue/test-utils'
import ListPeopleDetail from '../src/components/ListPeopleDetail.vue'
import expect from 'expect'
import moxios from 'moxios'
import axios from 'axios'

describe('ListPeopleDetail.vue', () => {
  let wrapper

  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install()
    wrapper = mount(ListPeopleDetail)
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
  })

  it('should mock the axios request', () => {
    expect(wrapper.vm.personDetails).toEqual({})

    const token = 'c7f08dde5d74d600ff61db20897dab486b844295'
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const target = `https://api.officient.io/1.0/people/3054/detail`
    const url = proxyurl + target
    const request = moxios.stubRequest({ method: 'get', url: url, headers: { 'Authorization': 'Bearer ' + token } }, {
        status: 200,
        response: {
          data: {
            data: {
              "id": 3054,
              "deleted": 0,
              "name": "Geert Van Campenhout",
              "email": "vancampenhoutgeert@gmail.com",
              "personal_email": "",
              "social_security_nr": "",
              "birthdate": "",
              "avatar": "https://www.gravatar.com/avatar/0f853835235e953443da153de79ca631?d=404",
              "phone": "",
              "civil_state": "",
              "nationality_country_code": "",
              "gender": "",
              "bank_account_iban": "",
              "emergency_contact": {
                  "name": "",
                  "relation": "",
                  "phone": ""
              },
              "address": {
                  "line_1": "Acaciastraat 82",
                  "line_2": "",
                  "zipcode": "3500",
                  "city": "Hasselt",
                  "state": "",
                  "country_code": "BE"
              },
              "team": null,
              "current_role": {
                  "name": "Front-end Developer",
                  "start_date": "2018-03-11"
              },
              "current_reports_to": null,
              "custom_fields": []
          }
        }
      }
    })
    // expect the data object to have been assigned to personDetails
    expect(wrapper.vm.personDetails).toEqual(request.response.data.data)
  })
})
