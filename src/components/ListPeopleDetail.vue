<template>
  <div class="person-details">
    <div class="container">
      <p class="title is-3">Details Employee</p>
      <div v-if="isLoading"><img class="loading" src="https://i.imgur.com/JfPpwOA.gif"></div>
      <div v-if="!isLoading">
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
                <article class="contact tile is-child notification has-text-left">
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
                    <li><u>Loves:</u> A challenge, boardgames, football, travel, climbing trees and sunflower seeds</li>
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
        <get-directions name="directions" :homeAddress="homeAddress"></get-directions>
        <distance-matrix :homeAddress="homeAddress"></distance-matrix>
      </div>
    </div>
  </div>
</template>

<script>
import token from '../token'
import axios from 'axios'
import TimeEngagement from './TimeEngagement'
import GetDirections from './GetDirections'
import DistanceMatrix from './DistanceMatrix'
import ListSkills from './ListSkills'
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
    ListSkills
  },
  data () {
    return {
      homeAddress: '',
      personDetails: {},
      isLoading: true
    }
  },
  filters: {
    lowercase (value) {
      if (!value) return ''
      return value.toLowerCase()
    }
  },
  created () {
    const getPersonDetails = async (id) => {
      try {
        // proxyurl: to enable cross-origin requests to anywhere (the server would not allow access bc of authorization otherwise)
        const proxyurl = 'https://cors-anywhere.herokuapp.com/'
        const target = `https://api.officient.io/1.0/people/${id}/detail`
        const url = proxyurl + target
        const response = await axios({ method: 'get', url: url, headers: { 'Authorization': 'Bearer ' + token } })
        this.personDetails = response.data.data
        this.homeAddress = `${this.personDetails.address.line_1}, ${this.personDetails.address.zipcode} ${this.personDetails.address.city}`
        // when API request is complete - hide the loading gif
        this.isLoading = false
      } catch (e) {
        console.log(`Can't access the response. Blocked by browser`)
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
