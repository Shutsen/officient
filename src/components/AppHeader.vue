<template>
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Officient
        </h1>
        <h2 class="subtitle">
          Front-end Coding Test
        </h2>
      </div>
    </div>
    <div class="hero-head">
      <nav class="tabs">
        <div class="container">
          <div class="officient-menu">
            <ul>
              <li v-on:click="setActive('home')" :class="{ active: isActive('home') }"><router-link to='/'>Home</router-link></li>
              <li v-on:click="setActive('employees')" :class="{ active: isActive('employees') }"><router-link to='/people'>Employees</router-link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return { activeItem: 'home' }
  },
  methods: {
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    }
  },
  created () {
    Event.$on('makeActive', () => {
      this.setActive('employees')
    })
  }
}
</script>

<style scoped>
  .officient-menu {
    display: table;
    margin: 0 auto;
  }

  ul li.active {
    background-color: white;
    color: black;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-weight: bold;
  }
</style>
