const moment = require('moment')

let workDays = ['Monday', 'Tuesday', 'WednesDay', 'Thursday', 'Friday']

workDays.forEach((workDay) => {
  let day = moment().isoWeekday(workDay)
  console.log(moment.utc(day).set({'hour': 8, 'minute': 45}).format())
})
