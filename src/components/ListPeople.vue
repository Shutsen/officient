<template>
  <div>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
    <h1>Soooo, hereby we present to you, the list op people that work for our amazing company!</h1>
    <ul>
      <li v-for="person in people" :key="person.id">
        {{person.firstName}} is {{person.age}} years old. Click <router-link :to="{name: 'ListPeopleDetail', params: {id: person.id}}"> this link </router-link> for more information.
      </li>
    </ul>
  </div>
</template>

<script>
// import {people} from '@/api/people-list'
export default {
  name: 'ListPeople',
  data () {
    return {
      loading: true,
      people: [
        {id: 1, firstName: 'Geert', lastName: 'Van Campenhout', age: 31},
        {id: 2, firstName: 'Wim', lastName: 'Van Campenhout', age: 36},
        {id: 3, firstName: 'Karolien', lastName: 'Van Campenhout', age: 32},
        {id: 4, firstName: 'Guy', lastName: 'Van Campenhout', age: 62}
      ]
    }
  },
  created () {
    // fetchPeoplesList()
    this.loading = false
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>
