<template>
  <div>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
    <h2>Detailed page of the employee you are interested in will be displayed over here.</h2>
    <div class="contain">
      <div class="avatar">
        <img :src="personDetails.avatar">
      </div>
      <div class="details">
        <div class="name">{{personDetails.name}}</div>
        <p>{{personDetails.email}}</p>
        <p>{{personDetails.address.line_1}}</p>
        <p>{{personDetails.address.zipcode}} {{personDetails.address.city}}</p>
        <p>Current Role: {{personDetails.current_role.name}}</p>
        <p>With us since: {{personDetails.current_role.start_date}}</p>
      </div>
    </div>
    <time-engagement :id="this.id"></time-engagement>
    <google-map name="directions" :departure="departure"></google-map>
  </div>
</template>

<script>
// import axios from 'axios'
import TimeEngagement from './TimeEngagement'
import GoogleMap from './GoogleMap'
export default {
  name: 'ListPeopleDetail',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    GoogleMap,
    TimeEngagement
  },
  data () {
    return {
      loading: true,
      personAddress: '',
      personDetails: {},
      wageDetails: {}
    }
  },
  computed: {
    departure () {
      return `${this.personDetails.address.line_1}, ${this.personDetails.address.zipcode} ${this.personDetails.address.city}`
    }
  },
  created () {
    const getPersonDetails = async (id) => {
      try {
        // TODO 1: solve the authorization
        // TODO 2: make token dynamic and extract it for security

        // const token = 'bd6ad762f364ef73642631ee5224859372a6e8f7'
        // const response = await axios({ method: 'get', url: `https://api.officient.io/1.0/people/${id}/detail`, headers: { 'Authorization': 'Bearer ' + token } })
        // OR
        // const response = await axios.get(`https://api.officient.io/1.0/people/${id}/detail`, {headers: {'Authorization': `Bearer ${token}`}})

        // postman does hit the api when passing the Bearer token into the authorization header:
        const postmanResponse = {
          'data': {
            'id': 3054,
            'deleted': 0,
            'name': 'Geert Van Campenhout',
            'email': 'vancampenhoutgeert@gmail.com',
            'personal_email': '',
            'social_security_nr': '',
            'birthdate': '',
            'avatar': 'https://www.gravatar.com/avatar/0f853835235e953443da153de79ca631?d=404',
            'phone': '',
            'civil_state': '',
            'nationality_country_code': '',
            'gender': '',
            'bank_account_iban': '',
            'emergency_contact': {
              'name': '',
              'relation': '',
              'phone': ''
            },
            'address': {
              'line_1': 'Acaciastraat 82',
              'line_2': '',
              'zipcode': '3500',
              'city': 'Hasselt',
              'state': '',
              'country_code': 'BE'
            },
            'team': null,
            'current_role': {
              'name': 'Freelancer',
              'start_date': '2018-03-01'
            },
            'current_reports_to': null,
            'custom_fields': []
          }
        }
        this.personDetails = postmanResponse.data
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    }
    getPersonDetails(this.id)
  }
}
</script>

<style scoped>
  .avatar img {
    border-radius: 50%;
  }
</style>
