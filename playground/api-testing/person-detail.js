const request = require('request')

const accessToken = 'b1147d40a45a7d678521d27291dacb759c7a3d66'

let personDetail = (id) => {
  return new Promise((resolve, reject) => {
    let options = { method: 'GET',
      url: `https://api.officient.io/1.0/people/${id}/detail`,
      auth: {'bearer': accessToken} }

    request(options, function (error, response, body) {
      if (error) throw new Error(error)

      let result = JSON.parse(body)
      console.log(result.data)
    })
  })
}

personDetail(3054)

module.exports = {personDetail}
