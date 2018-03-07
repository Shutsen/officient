<template>
  <div class="person-details">
    <div class="container">
      <p class="title is-3">Details Employee</p>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical has-text-left">
              <article class="tile is-child notification">
                <article class="media">
                  <figure class="media-left">
                    <p class="image is-64x64">
                      <img :src="personDetails.avatar">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <p class="title is-5">{{personDetails.name}}</p>
                      <p>Current Role: {{personDetails.current_role.name}}</p>
                       <p>With us since: {{personDetails.current_role.start_date}}</p>
                    </div>
                  </div>
                </article>
              </article>
              <article class="tile is-child notification has-text-left">
                <p class="title is-5">Contact Information</p>
                <p><span class="icon"><i class="fas fa-envelope"></i></span><a :href="`mailto:${personDetails.email}`">{{personDetails.email}}</a></p>
                <p><span class="icon"><i class="fas fa-home"></i></span>{{personDetails.address.line_1 | lowercase}}</p>
                <p><span class="icon"><i class="fas fa-info-circle"></i></span>{{personDetails.address.zipcode}} {{personDetails.address.city}}, Belgium</p>
              </article>
            </div>
            <div class="tile is-parent has-text-left">
              <article class="tile is-child notification">
                <p class="title is-5">About</p>
                <ul>
                  <li><u>Born:</u> Yes. 09/08/1986 in Hasselt</li>
                  <li><u>Education:</u> MBA in Entrepreneurship and Innovation. Selfstudy code</li>
                  <li><u>Work:</u> Part-time Developer, part-time Assistant Manager at Lekker Limburgs</li>
                  <li><u>Prefers:</u> A Full-time Developer job and to work in a team again</li>
                  <li><u>Loves:</u> A challenge, boardgames, football, travel and sunflower seeds</li>
                  <li><u>Keywords:</u> Teamplayer, self-motivated, enthusiastic, eager to learn</li>
                </ul>
              </article>
            </div>
          </div>
          <div class="tile is-parent has-text-left">
            <article class="tile is-child notification">
              <list-skills></list-skills>
            </article>
          </div>
        </div>
        <div class="tile is-parent has-text-left">
          <article class="tile is-child notification">
            <div class="content">
              <p class="title is-5">Daily Time Engagement</p>
              <time-engagement :id="this.id"></time-engagement>
            </div>
          </article>
        </div>
      </div>
    </div>
    <get-directions name="directions" :homeAddress="homeAddress"></get-directions>
    <distance-matrix :homeAddress="homeAddress"></distance-matrix>
  </div>
</template>

<script>
// import axios from 'axios'
import TimeEngagement from './TimeEngagement'
import GetDirections from './GetDirections'
import DistanceMatrix from './DistanceMatrix'
import ListSkills from './ListSkills'
import SubLevel from './SubLevel'
export default {
  name: 'ListPeopleDetail',
  props: {
    id: {
      required: true
    }
  },
  components: {
    TimeEngagement,
    GetDirections,
    DistanceMatrix,
    ListSkills,
    SubLevel
  },
  data () {
    return {
      personAddress: '',
      personDetails: {}
    }
  },
  filters: {
    lowercase (value) {
      if (!value) return ''
      return value.toLowerCase()
    }
  },
  computed: {
    homeAddress () {
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
      } catch (e) {
        console.log(e)
      }
    }
    getPersonDetails(this.id)
  }
}
</script>

<style scoped>
  .person-details {
    margin-top: 40px;
  }

  span.icon {
    margin-right: 5px;
  }
</style>
