const request = require('request')

// POST credentials to get token and store it in a variable for export purposes
const token = request({
  url: 'https://api.officient.io/1.0/token',
  method: 'POST',
  auth: {
    user: '504584',
    pass: 'I9Xp62rW7PJYg4PaB7cHKGrQ5BAbfhxi7N3T3MkiuF9nbroS0Y'
  },
  form: {
    'grant_type': 'client_credentials'
  }
}, function (err, res) {
  if (err) {
    console.log(err)
  }
  var json = JSON.parse(res.body)
  console.log('Access Token:', json.access_token)
  return json.access_token
})

module.exports = {token}
