<template>
  <div>
    <div v-if="isLoading"><img class="loading" src="https://i.imgur.com/JfPpwOA.gif"></div>
    <div v-if="!isLoading">
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>{{wageDetails.weekly_time_engagement_minutes.monday / 60}} hours</td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>{{wageDetails.weekly_time_engagement_minutes.tuesday / 60}} hours</td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>{{wageDetails.weekly_time_engagement_minutes.wednesday / 60}} hours</td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>{{wageDetails.weekly_time_engagement_minutes.thursday / 60}} hours</td>
          </tr>
          <tr>
            <td>Friday</td>
            <td>{{wageDetails.weekly_time_engagement_minutes.friday / 60}} hours</td>
          </tr>
        </tbody>
      </table>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At non, architecto modi repudiandae, dolores quos omnis quaerat beatae</p>
    </div>
  </div>
</template>

<script>
import token from '../token'
import axios from 'axios'
export default {
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      wageDetails: {},
      isLoading: true
    }
  },
  created () {
    // eslint-disable-next-line
    const getWageDetails = async (id) => {
      // proxyurl: to enable cross-origin requests to anywhere (the server would not allow access bc of authorization otherwise)
      const proxyurl = 'https://cors-anywhere.herokuapp.com/'
      const target = `https://api.officient.io/1.0/wages/${id}/current`
      const url = proxyurl + target
      const response = await axios({ method: 'get', url: url, headers: {'Authorization': 'Bearer ' + token} })
      this.wageDetails = response.data.data
      this.isLoading = false
    }
    getWageDetails(this.id)
  }
}
</script>

<style scoped>
  table {
    color: black;
  }
</style>
