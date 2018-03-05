<template>
  <div>
    <input v-model="name" placeholder="How may we call you?">
    <p v-if="name !== ''">Well, hello {{name}}! It's so nice to have you here!</p>
    <h2>{{msg}}</h2>
    <p>Officient helps HR and management reduce personnel administration. Integrate all employee data in one application, streamline common HR tasks and discover new insights related to your workforce.</p>
    <p>If you fancy, you can check out some of our employees here: <router-link :to="{name: 'ListPeople'}">List of people</router-link></p>
  </div>
</template>

<script>
// TODO 1: Make things pretty?
export default {
  name: 'WelcomeHome',
  data () {
    return {
      msg: 'Paperless, not peopleless.',
      name: ''
    }
  }
}
</script>

<style>

</style>
