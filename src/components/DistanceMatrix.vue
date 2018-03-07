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
          <td>To Work</td>
          <td>{{toWork.text}}</td>
          <td>{{toWork.text}}</td>
          <td>{{toWork.text}}</td>
          <td>{{toWork.text}}</td>
          <td>{{toWork.text}}</td>
          <td><strong>{{totalPerWeekWork}}</strong></td>
        </tr>
        <tr>
          <td>To Home</td>
          <td>{{toHome.text}}</td>
          <td>{{toHome.text}}</td>
          <td>{{toHome.text}}</td>
          <td>{{toHome.text}}</td>
          <td>{{toHome.text}}</td>
          <td><strong>{{totalPerWeekHome}}</strong></td>
        </tr>
        <tr>
          <td><strong>Total by day</strong></td>
          <td><strong>{{totalPerDay}}</strong></td>
          <td><strong>{{totalPerDay}}</strong></td>
          <td><strong>{{totalPerDay}}</strong></td>
          <td><strong>{{totalPerDay}}</strong></td>
          <td><strong>{{totalPerDay}}</strong></td>
          <td><strong>{{grandTotal}}</strong></td>
        </tr>
      </table>
    </div>
 </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ['homeAddress'],
  data () {
    return {
      toHome: {},
      toWork: {}
    }
  },
  computed: {
    totalPerDay () {
      let totalMin = this.toHome.value + this.toWork.value
      let hours = Math.floor( totalMin / 3600)          
      let mins = Math.floor(totalMin % 3600 / 60)
      return `${hours} hours ${mins} mins`
    },
    totalPerWeekWork () {
      let totalMin = this.toWork.value * 5
      let hours = Math.floor( totalMin / 3600)        
      let mins = Math.floor(totalMin % 3600 / 60)
      return `${hours} hours ${mins} mins`
    },
    totalPerWeekHome () {
      let totalMin = this.toHome.value * 5
      let hours = Math.floor( totalMin / 3600)          
      let mins = Math.floor(totalMin % 3600 / 60)
      return `${hours} hours ${mins} mins`
    },
    grandTotal () {
      let totalMin = this.toWork.value * 5 + this.toWork.value * 5
      let hours = Math.floor( totalMin / 3600)          
      let mins = Math.floor(totalMin % 3600 / 60)
      return `${hours} hours ${mins} mins`
    }
  },
  created () {
    const initializeMap = () => {
      let bounds = new google.maps.LatLngBounds
      let markersArray = []

      let origin1 = 'Acaciastraat 82, 3500 Hasselt'
      let origin2 = 'Kortrijksesteenweg 181, 9000 Gent'
      let destinationA = 'Kortrijksesteenweg 181, 9000 Gent'
      let destinationB = 'Acaciastraat 82, 3500 Hasselt'

      // let destinationIcon = 'https://chart.googleapis.com/chart?' +
          // 'chst=d_map_pin_letter&chld=D|FF0000|000000'
      // let originIcon = 'https://chart.googleapis.com/chart?' +
          // 'chst=d_map_pin_letter&chld=O|FFFF00|000000'
      // let map = new google.maps.Map(document.getElementById('distance-map'), {
      //   center: {lat: 51.039718, lng: 3.716947},
      //   zoom: 10
      // })
      // let geocoder = new google.maps.Geocoder

      let service = new google.maps.DistanceMatrixService
      service.getDistanceMatrix({
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB],
        travelMode: 'TRANSIT',
        transitOptions: {
          arrivalTime: new Date('2018-03-07T06:45:30.911Z'),
          routingPreference: 'FEWER_TRANSFERS'
        },
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, (response, status) => {
        if (status !== 'OK') {
          alert('Error was: ' + status)
        } else {
          // console.log('this is the response:', response)
          // let originList = response.originAddresses
          // let destinationList = response.destinationAddresses
          // let outputDiv = document.getElementById('output')
          // outputDiv.innerHTML = ''
          // deleteMarkers(markersArray)

          // let showGeocodedAddressOnMap = (asDestination) => {
          //   let icon = asDestination ? destinationIcon : originIcon
          //   return (results, status) => {
          //     if (status === 'OK') {
          //       map.fitBounds(bounds.extend(results[0].geometry.location))
          //       markersArray.push(new google.maps.Marker({
          //         map: map,
          //         position: results[0].geometry.location,
          //         icon: icon
          //       }))
          //     } else {
          //       alert('Geocode was not successful due to: ' + status)
          //     }
          //   }
          // }
          this.toHome = {
            text: response.rows[0].elements[0].duration.text,
            value: response.rows[0].elements[0].duration.value
          }
          this.toWork = {
            text: response.rows[1].elements[1].duration.text,
            value: response.rows[1].elements[1].duration.value
          }

          // for (let i = 0; i < originList.length; i++) {
          //   let results = response.rows[i].elements
          //   geocoder.geocode({'address': originList[i]},
          //       showGeocodedAddressOnMap(false))
          //   for (let j = 0; j < results.length; j++) {
          //     geocoder.geocode({'address': destinationList[j]},
          //         showGeocodedAddressOnMap(true))
          //     outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
          //         ': ' + results[j].distance.text + ' in ' +
          //         results[j].duration.text + '<br>'
          //   }
          // }
        }
      })
    }

    // const deleteMarkers = (markersArray) => {
    //   for (let i = 0; i < markersArray.length; i++) {
    //     markersArray[i].setMap(null)
    //   }
    //   markersArray = []
    // }
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
