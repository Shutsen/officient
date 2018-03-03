const request = require('request')

Date.prototype.getUnixTime = function () { return this.getTime()/1000|0 }
if (!Date.now) Date.now = function () { return new Date() }
Date.time = function () { return Date.now().getUnixTime() }

let getDirections = (departurePosition, arrivalTime) => {
  return new Promise((resolve, reject) => {
    let encodedAddress = encodeURIComponent(departurePosition)
    let encodedDestination = encodeURIComponent('Kortrijksesteenweg 181 9000 Gent')
    request({
      url: `https://maps.googleapis.com/maps/api/directions/json?origin=${encodedAddress}&destination=${encodedDestination}&mode=transit&traffic_model=pessimistic&arrival_time=${arrivalTime}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        Promise.reject(new Error('Unable to connect to Google servers.'))
      } else if (body.status === 'ZERO_RESULTS') {
        Promise.reject(new Error('Unable to find the address'))
      } else if (body.status === 'OK') {
        resolve({
          departure_time: body.routes[0].legs[0].departure_time.text,
          arrival_time: body.routes[0].legs[0].arrival_time.text,
          distance: body.routes[0].legs[0].distance.text,
          duration: body.routes[0].legs[0].duration.text
        })
      }
    })
  })
}

let someDate = new Date('Mon, 5 Mar 2018 08:45:00 GMT+0100')
let theUnixTime = someDate.getUnixTime()

getDirections('acaciastraat 82 3500 Hasselt', theUnixTime).then((response) => {
  console.log(response)
})

module.exports = {getDirections}
