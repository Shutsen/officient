<template>
  <div>
    <h3>Transit Travel Time</h3>
    Please select your destination:
    <select v-model="travelTo" id="get-destination">
      <option value="WORK">WORK</option>
      <option value="HOME">HOME</option>
    </select>
    Please select your travel mode:
    <select v-model="travelMode" id="travel-mode">
      <option value="TRANSIT">TRANSIT</option>
      <option value="DRIVING">DRIVING</option>
    </select>
    <br>
    <p><strong>You chose to travel to {{travelTo | lowercase}} by {{travelMode | lowercase}}</strong> <br><span class="small">(From: {{getTravelDirection.from}}, To: {{getTravelDirection.to}})</span></p>
    <div class="google-map" :id="mapName"></div>
    <div id="right-panel"><h4>Details</h4></div>
  </div>
</template>

<script>
export default {
  // TODO 1: Make things pretty?
  name: 'google-map',
  props: ['name', 'homeAddress'],
  data () {
    return {
      mapName: this.name + '-map',
      workAddress: 'Kortrijksesteenweg 181, 9000 Gent',
      travelTo: 'WORK',
      travelMode: 'TRANSIT'
    }
  },
  computed: {
    getTravelDirection () {
      if (this.travelTo === 'WORK') {
        return {
          from: this.homeAddress,
          to: this.workAddress
        }
      } else if (this.travelTo === 'HOME') {
        return {
          from: this.workAddress,
          to: this.homeAddress
        }
      }
    }
  },
  filters: {
    lowercase (value) {
      if (!value) return ''
      return value.toLowerCase()
    }
  },
  mounted () {
    // TODO 2: add select functionality to either go to Work or to return Home
    // TODO 3: change departureTime to arrivalTime for each day of the week
    const calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
      directionsService.route({
        origin: this.getTravelDirection.from,
        destination: this.getTravelDirection.to,
        travelMode: this.travelMode,
        provideRouteAlternatives: true,
        transitOptions: {
          departureTime: new Date(),
          routingPreference: 'FEWER_TRANSFERS'
        }
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response)
          console.log(response)
        } else {
          window.alert('Directions request failed due to ' + status)
        }
      })
    }

    const initMap = () => {
      // eslint-disable-next-line
      let directionsDisplay = new window.google.maps.DirectionsRenderer
      // eslint-disable-next-line
      let directionsService = new window.google.maps.DirectionsService
      // eslint-disable-next-line
      let map = new window.google.maps.Map(document.getElementById(this.mapName), {
        zoom: 10,
        center: {lat: 51.039718, lng: 3.716947}
      })
      directionsDisplay.setMap(map)
      directionsDisplay.setPanel(document.getElementById('right-panel'))

      calculateAndDisplayRoute(directionsService, directionsDisplay)

      let onChangeHandler = () => {
        calculateAndDisplayRoute(directionsService, directionsDisplay)
      }
      document.getElementById('travel-mode').addEventListener('change', onChangeHandler)
      document.getElementById('get-destination').addEventListener('change', onChangeHandler)
    }
    initMap()
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.google-map {
  width: 70%;
  min-height: 600px;
  float: left;
  background: gray;
}

#right-panel {
  width: 30%;
  min-height: 600px;
  max-height: 600px;
  float: left;
  background-color: white;
  padding-left: 10px;
  overflow: scroll;
}

.small {
  font-size: 12px;
}
</style>
