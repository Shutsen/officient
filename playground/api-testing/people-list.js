var request = require('request')

var accessToken = 'ec12784f7b275a003a9c6d177c9a2c1159115aed'

var options = { method: 'GET',
  url: 'https://api.officient.io/1.0/people/list',
  auth: {'bearer': accessToken} }

const people = request(options, function (error, response, body) {
  if (error) throw new Error(error)
  let result = JSON.parse(body)
  result.data.forEach((person) => {
    console.log(person.name)
  })
})

module.exports = {people}
