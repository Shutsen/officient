<template>
  <div class="container padding">
    <p class="title is-3">List of Employees</p>
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Contact</th>
          <th>Role</th>
          <th>More info</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in people" :key="person.id">
          <td>{{person.name}}</td>
          <td><span class="icon"><i class="fas fa-envelope"></i></span><a :href="`mailto:${person.email}`">{{person.email}}</a></td>
          <td>{{person.role_name}}</td>
          <td><router-link :to="{name: 'ListPeopleDetail', params: {id: person.id}}">Show me</router-link></td>
        </tr>
      </tbody>
    </table>
    <br>
    <img class="loading" v-if="isLoading" src="https://i.imgur.com/JfPpwOA.gif">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ListPeople',
  data () {
    return {
      people: [],
      isLoading: true
    }
  },
  mounted () {
    const getPeopleList = async () => {
      try {
        // TODO 1: make token dynamic and extract it for security
        // ADD TEMPORARY TOKEN!
        // Get the temporary token via your officient account and REPLACE below:
        const token = 'c7f08dde5d74d600ff61db20897dab486b844295'
        const proxyurl = 'https://cors-anywhere.herokuapp.com/'
        const target = 'https://api.officient.io/1.0/people/list'
        const url = proxyurl + target
        const response = await axios({ method: 'get', url: url, headers: {'Authorization': 'Bearer ' + token} })
        this.people = response.data.data
        // when API request is complete - hide the loading gif
        this.isLoading = false
      } catch (e) {
        console.log(`Can't access the response. Blocked by browser`)
      }
    }
    getPeopleList()
  }
}
</script>

<style scoped>
  .container {
    min-height: 100%;
  }

  .padding {
    padding: 50px 0;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
  }

  tr:nth-child(even) {
      background-color: #dddddd;
  }

  span.icon {
    margin-right: 5px;
  }

  a {
    color: rgba(0, 217, 181, 1.0);
  }

  a:hover {
    color: rgb(144, 247, 229);
  }
</style>
