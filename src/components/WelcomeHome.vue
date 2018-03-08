<template>
  <div class="welcome-home padding">
    <div class="img">
      <figure class="image is-200x200 animated infinite pulse">
        <img src="../assets/officient.jpg">
      </figure>
    </div>
    <p class="catch-line title is-3">{{msg}}</p>
    <div class="field">
      <div class="control">
        <input v-model="name" class="input is-primary is-rounded" type="text" placeholder="How may we call you?">
      </div>
    </div>
    <p class="welcome-msg title is-5" v-if="name !== ''">Well, hello {{name}}! It's so nice to have you here!</p>
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent is-8">
          <article class="tile is-child notification has-text-left">
            <p class="title is-4">What we do and why we do it</p>
            <p>Officient helps HR and management reduce personnel administration. Integrate all employee data in one application, streamline common HR tasks and discover new insights related to your workforce.</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification has-text-left">
              <p class="title is-4">Our awesome team</p>
              <p>If you fancy, you can check out some of our employees here: <span class="link" @click="navigate"><router-link :to="{name: 'ListPeople'}">List of people</router-link></span></p>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeHome',
  data () {
    return {
      msg: 'Paperless, not peopleless.',
      name: ''
    }
  },
  methods: {
    navigate () {
      Event.$emit('makeActive')
    }
  }
}
</script>

<style scoped>
  .padding {
    padding: 40px 0 20px;
  }

  .img {
    width: 200px;
    margin: 0 auto 40px;
  }

  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  .animated.infinite {
    animation-iteration-count: infinite;
  }

  @keyframes pulse {
    from {
      transform: scale3d(1, 1, 1);
    }

    50% {
      transform: scale3d(1.05, 1.05, 1.05);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }

  .pulse {
    animation-name: pulse;
  }

  .field {
    width: 400px;
    margin: 25px auto;
  }

  input {
    text-align: center;
    color: black;
  }

  a {
    color: rgba(0, 217, 181, 1.0);
  }

  a:hover {
    color: rgb(144, 247, 229);
  }
</style>
