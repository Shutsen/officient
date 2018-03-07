<template>
  <div class="get-directions">
    <div class="padding">
      <p class="title is-3">Work Commuting</p>
      Please select your destination:
      <div class="select is-small is-rounded is-primary">
        <select v-model="travelTo" id="get-destination">
          <option value="WORK">WORK</option>
          <option value="HOME">HOME</option>
        </select>
      </div>
      Please select your travel mode:
      <div class="select is-small is-rounded is-primary">
        <select v-model="travelMode" id="travel-mode">
          <option value="TRANSIT">TRANSIT</option>
          <option value="DRIVING">DRIVING</option>
        </select>
      </div>
      <br>
      <p><strong>You chose to travel <span class="accent">to {{travelTo | lowercase}} by {{travelMode | lowercase}}</span></strong> <br><span class="small">(From: {{getTravelDirection.from}}, To: {{getTravelDirection.to}})</span></p>
    </div>
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent is-8">
          <article class="tile is-child">
            <div class="google-map" :id="mapName"></div>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child">
            <div class="content" id="right-panel"></div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
export default {
  name: 'google-map',
  props: ['name', 'homeAddress'],
  data () {
    return {
      mapName: this.name + '-map',
      workAddress: 'Kortrijksesteenweg 181, 9000 Gent',
      travelTo: 'WORK',
      travelMode: 'TRANSIT',
      workDays: ['Monday', 'Tuesday', 'WednesDay', 'Thursday', 'Friday']
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
    // TODO 1: add select functionality to either go to Work or to return Home
    // TODO 2: change departureTime to arrivalTime for each day of the week
    // this.workDays.forEach((workDay) => {
      let day = moment().isoWeekday('Monday')
      let arriveAt = moment(day).set({'hour': 8, 'minute': 45})
      const calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
        directionsService.route({
          origin: this.getTravelDirection.from,
          destination: this.getTravelDirection.to,
          travelMode: this.travelMode,
          provideRouteAlternatives: true,
          transitOptions: {
            arrivalTime: new Date('2018-03-07T06:45:30.911Z'),
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
    // })
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.padding {
  padding: 40px 0 20px;
}

.accent {
  color: rgba(0, 217, 181, 1.0);
}

.google-map {
  width: 100%;
  min-height: 400px;
}

#right-panel {
  width: 100%;
  min-height: 400px;
  max-height: 400px;
  float: left;
  background-color: white;
  padding-left: 10px;
  overflow: scroll;
}

.small {
  font-size: 12px;
}
</style>
