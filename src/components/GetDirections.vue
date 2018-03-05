<template>
  <div>
    <h3>Transit Travel Time</h3>
    <p class="directions"><strong>From: </strong><span id="start">{{departure}}</span></p>
    <p class="directions"><strong>To: </strong><span id="end">{{destination}}</span></p>
    <select id="travelMode">
      <option value="TRANSIT">TRANSIT</option>
      <option value="DRIVING">DRIVING</option>
    </select>
    <br>
    <div class="google-map" :id="mapName"></div>
    <div id="right-panel"><h4>Details</h4></div>
  </div>
</template>
<script>

export default {
  // TODO 1: Make things pretty?
  name: 'google-map',
  props: ['name', 'departure'],
  data () {
    return {
      mapName: this.name + '-map',
      destination: 'Kortrijksesteenweg 181, 9000 Gent'
    }
  },
  mounted () {
    // TODO 2: add select functionality to either go to Work or to return Home
    // TODO 3: change departureTime to arrivalTime for each day of the week
    const calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
      let travelMode = document.getElementById('travelMode').value
      directionsService.route({
        origin: this.departure,
        destination: this.destination,
        travelMode: travelMode,
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
      document.getElementById('travelMode').addEventListener('change', onChangeHandler)
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

.directions {
  margin: 5px 0
}
</style>
