const request = require('request')

const accessToken = 'ec12784f7b275a003a9c6d177c9a2c1159115aed'

// TO BE DONE: make id dynamic
let id = 3054
let options = { method: 'GET',
  url: `https://api.officient.io/1.0/people/${id}/detail`,
  auth: {'bearer': accessToken} }

let personDetail = request(options, function (error, response, body) {
  if (error) throw new Error(error)

  let result = JSON.parse(body)
  console.log(result.data)
})

module.exports = {personDetail}
