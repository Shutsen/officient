<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'
import 'bulma-tooltip/dist/bulma-tooltip.min.css'
import AppFooter from './components/AppFooter'
import AppHeader from './components/AppHeader'
export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app img {
  border-radius: 50%;
  margin-bottom: 30px;
}
</style>
