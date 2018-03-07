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
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'ListPeople',
  data () {
    return {
      people: []
    }
  },
  mounted () {
    const getPeopleList = async () => {
      try {
        // TODO 1: solve the authorization
        // TODO 2: make token dynamic and extract it for security

        // const token = 'bd6ad762f364ef73642631ee5224859372a6e8f7'
        // const response = await axios({ method: 'get', url: `https://api.officient.io/1.0/people/list`, headers: { 'Authorization': 'Bearer ' + token } })

        // postman does hit the api when passing the Bearer token into the authorization header:
        const postmanResponse = {'data': [{ 'id': 3061, 'name': 'Charlize Theron', 'email': 'charlizetheron@example.com', 'role_name': 'Geerts Assistant' },
          { 'id': 3060, 'name': 'David Gilmour', 'email': 'davidgilmour@example.com', 'role_name': 'Sales Manager' },
          { 'id': 3059, 'name': 'Barry White', 'email': 'barrywhite@example.com', 'role_name': 'Accountant' },
          // { 'id': 3054, 'name': 'Geert Van Campenhout', 'email': 'vancampenhoutgeert@gmail.com', 'role_name': 'Front End Developer' },
          // { 'id': 3054, 'name': 'Geert Van Campenhout', 'email': 'vancampenhoutgeert@gmail.com', 'role_name': 'Front End Developer' },
          // { 'id': 3054, 'name': 'Geert Van Campenhout', 'email': 'vancampenhoutgeert@gmail.com', 'role_name': 'Front End Developer' },
          // { 'id': 3054, 'name': 'Geert Van Campenhout', 'email': 'vancampenhoutgeert@gmail.com', 'role_name': 'Front End Developer' },
          // { 'id': 3054, 'name': 'Geert Van Campenhout', 'email': 'vancampenhoutgeert@gmail.com', 'role_name': 'Front End Developer' },
          // { 'id': 3054, 'name': 'Geert Van Campenhout', 'email': 'vancampenhoutgeert@gmail.com', 'role_name': 'Front End Developer' },
          // { 'id': 3054, 'name': 'Geert Van Campenhout', 'email': 'vancampenhoutgeert@gmail.com', 'role_name': 'Front End Developer' },
          // { 'id': 3054, 'name': 'Geert Van Campenhout', 'email': 'vancampenhoutgeert@gmail.com', 'role_name': 'Front End Developer' },
          { 'id': 3054, 'name': 'Geert Van Campenhout', 'email': 'vancampenhoutgeert@gmail.com', 'role_name': 'Front End Developer' }],
        'total_record_count': 4 }
        this.people = postmanResponse.data
      } catch (e) {
        console.log(e)
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
