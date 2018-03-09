<template>
 <div>
    <div class="container padding">
      <p class="title is-3">Weekly Travel Time</p>
      <table>
        <tr>
          <th>Travel Time</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Total by week</th>
        </tr>
        <tr>
          <td class="tooltip is-tooltip-primary is-tooltip-right" data-tooltip="Arriving at 08:45">To Work</td>
          <td>{{dailyArrivals[0].text}}</td>
          <td>{{dailyArrivals[1].text}}</td>
          <td>{{dailyArrivals[2].text}}</td>
          <td>{{dailyArrivals[3].text}}</td>
          <td>{{dailyArrivals[4].text}}</td>
          <td><strong>{{totalPerWeekWork}}</strong></td>
        </tr>
        <tr>
          <td class="tooltip is-tooltip-primary is-tooltip-right" data-tooltip="Leaving at 17:15">To Home</td>
          <td>{{dailyDepartures[0].text}}</td>
          <td>{{dailyDepartures[1].text}}</td>
          <td>{{dailyDepartures[2].text}}</td>
          <td>{{dailyDepartures[3].text}}</td>
          <td>{{dailyDepartures[4].text}}</td>
          <td><strong>{{totalPerWeekHome}}</strong></td>
        </tr>
        <tr>
          <td><strong>Total by day</strong></td>
          <td><strong>{{totalPerDay[0]}}</strong></td>
          <td><strong>{{totalPerDay[1]}}</strong></td>
          <td><strong>{{totalPerDay[2]}}</strong></td>
          <td><strong>{{totalPerDay[3]}}</strong></td>
          <td><strong>{{totalPerDay[4]}}</strong></td>
          <td><strong>{{grandTotal}}</strong></td>
        </tr>
      </table>
    </div>
 </div>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
export default {
  props: ['homeAddress'],
  data () {
    return {
      workDays: ['Monday', 'Tuesday', 'WednesDay', 'Thursday', 'Friday'],
      dailyArrivals: [],
      dailyDepartures: []
    }
  },
  computed: {
    totalPerWeekWork () {
      let total = 0
      for (let i = 0; i < this.dailyArrivals.length; i++) {
        total += this.dailyArrivals[i].value
      }
      let hours = Math.floor(total / 3600)        
      let mins = Math.floor(total % 3600 / 60)
      return `${hours} hours ${mins} mins` 
      
    },
    totalPerWeekHome () {
      let total = 0
      for (let i = 0; i < this.dailyDepartures.length; i++) {
        total += this.dailyDepartures[i].value
      }
      let hours = Math.floor(total / 3600)        
      let mins = Math.floor(total % 3600 / 60)
      return `${hours} hours ${mins} mins` 
    },
    totalPerDay () {
      let totalPerDay = []
      for (let i = 0; i < this.dailyDepartures.length; i++) {
        let total = this.dailyDepartures[i].value + this.dailyArrivals[i].value
        let hours = Math.floor(total / 3600)        
        let mins = Math.floor(total % 3600 / 60)
        let output = `${hours} hours ${mins} mins` 
        totalPerDay.push(output)
      }
      return totalPerDay
    },
    grandTotal () {
      let total = 0
      for (let i = 0; i < this.dailyDepartures.length; i++) {
        total += this.dailyDepartures[i].value + this.dailyArrivals[i].value
      }
      let hours = Math.floor(total / 3600)        
      let mins = Math.floor(total % 3600 / 60)
      return `${hours} hours ${mins} mins` 
    }
  },
  created () {
    const initializeMap = () => {
      let bounds = new google.maps.LatLngBounds

      let origin1 = this.homeAddress
      let origin2 = 'Kortrijksesteenweg 181, 9000 Gent'
      let destinationA = 'Kortrijksesteenweg 181, 9000 Gent'
      let destinationB = this.homeAddress

      this.workDays.forEach((workDay) => {
        let day = moment().isoWeekday(workDay)
        let arriveAt = new Date(moment.utc(day).set({'hour': 7, 'minute': 45}).format())
        let service = new google.maps.DistanceMatrixService
        service.getDistanceMatrix({
          origins: [origin1, origin2],
          destinations: [destinationA, destinationB],
          travelMode: 'TRANSIT',
          transitOptions: {
            arrivalTime: new Date(arriveAt),
            routingPreference: 'FEWER_TRANSFERS'
          },
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, (response, status) => {
          if (status !== 'OK') {
            alert('Error was: ' + status)
          } else {
            this.dailyArrivals.push({
              text: response.rows[1].elements[1].duration.text,
              value: response.rows[1].elements[1].duration.value
            })
          }
        })
      })

      this.workDays.forEach((workDay) => {
        let day = moment().isoWeekday(workDay)
        let departAt = new Date(moment.utc(day).set({'hour': 17, 'minute': 15}).format())
        let service = new google.maps.DistanceMatrixService
        service.getDistanceMatrix({
          origins: [origin1, origin2],
          destinations: [destinationA, destinationB],
          travelMode: 'TRANSIT',
          transitOptions: {
            departureTime: new Date(departAt),
            routingPreference: 'FEWER_TRANSFERS'
          },
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, (response, status) => {
          if (status !== 'OK') {
            alert('Error was: ' + status)
          } else {
            this.dailyDepartures.push({
              text: response.rows[1].elements[1].duration.text,
              value: response.rows[1].elements[1].duration.value
            })
          }
        })
      })
    }
    initializeMap()
  }
}
</script>

<style scoped>
  html {
      overflow: -moz-scrollbars-vertical;
      overflow: scroll;
  }
  
  .padding {
    padding: 40px 0 20px;
  }

  #right-panel {
    font-family: 'Roboto','sans-serif';
    line-height: 30px;
    padding-left: 10px;
  }

  #right-panel select, #right-panel input {
    font-size: 15px;
  }

  #right-panel select {
    width: 100%;
  }

  #right-panel i {
    font-size: 12px;
  }

  #distance-map {
    min-height: 400px;
    width: 50%;
  }

  #right-panel {
    float: right;
    width: 48%;
    padding-left: 2%;
  }

  #output {
    font-size: 11px;
  }

  table {
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
</style>
