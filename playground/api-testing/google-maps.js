const request = require('request')

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address)

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        Promise.reject(new Error('Unable to connect to Google servers.'))
      } else if (body.status === 'ZERO_RESULTS') {
        Promise.reject(new Error('Unable to find the address'))
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      }
    })
  })
}

geocodeAddress('Acaciastraat 82, 3500 Hasselt').then((response) => {
  console.log(response)
})

module.exports = {geocodeAddress}
