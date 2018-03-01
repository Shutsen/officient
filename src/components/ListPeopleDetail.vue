<template>
  <div>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
    <h2>Detailed page of the employee you are interested in will be displayed over here.</h2>
  </div>
</template>

<script>
export default {
  name: 'ListPeopleDetail',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  loading: true,
  created () {
    // fetchPersonDetails(this.id)
    this.loading = false
  }
}
</script>

<style>

</style>
