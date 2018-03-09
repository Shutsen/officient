const moment = require('moment')

let workDays = ['Monday', 'Tuesday', 'WednesDay', 'Thursday', 'Friday']

// workDays.forEach((workDay) => {
//   let day = moment().isoWeekday(workDay)
//   let arriveAt = moment.utc(day).set({'hour': 7, 'minute': 45}).format()
//   console.log(arriveAt)
// })

let day = moment().isoWeekday(moment().format('E'))
let arriveAt = new Date(moment.utc(day).set({'hour': 9, 'minute': 45}).format())
console.log(arriveAt)