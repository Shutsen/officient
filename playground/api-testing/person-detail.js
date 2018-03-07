const request = require('request')

const accessToken = '1d2e5904745fe53013b75cdd3bae091899f32e32'

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
