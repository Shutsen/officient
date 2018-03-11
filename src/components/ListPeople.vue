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
          <td>{{person.email}}</td>
          <td>{{person.role_name}}</td>
          <td><router-link :to="{name: 'ListPeopleDetail', params: {id: person.id}}">Show me</router-link></td>
        </tr>
      </tbody>
    </table>
    <br>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ListPeople',
  data () {
    return {
      people: [],
      loading: true
    }
  },
  mounted () {
    const getPeopleList = async () => {
      try {
        // TODO 1: make token dynamic and extract it for security
        const token = 'dc082b83a92ac24783dd038569b5fd4a7144f0c3'
        const proxyurl = 'https://cors-anywhere.herokuapp.com/'
        const target = 'https://api.officient.io/1.0/people/list'
        const url = proxyurl + target
        const response = await axios({ method: 'get', url: url, headers: {'Authorization': 'Bearer ' + token} })
        this.people = response.data.data
        this.loading = false
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

  a {
    color: rgba(0, 217, 181, 1.0);
  }

  a:hover {
    color: rgb(144, 247, 229);
  }
</style>
