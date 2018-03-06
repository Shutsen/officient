<template>
  <div>
    <h3>Daily time engagement (hrs)</h3>
    <p>{{wageDetails.start_date}}</p>
    <table>
      <tr>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
      </tr>
      <tr>
        <td>{{wageDetails.weekly_time_engagement_minutes.monday / 60}}</td>
        <td>{{wageDetails.weekly_time_engagement_minutes.tuesday / 60}}</td>
        <td>{{wageDetails.weekly_time_engagement_minutes.wednesday / 60}}</td>
        <td>{{wageDetails.weekly_time_engagement_minutes.thursday / 60}}</td>
        <td>{{wageDetails.weekly_time_engagement_minutes.friday / 60}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// TODO 1: Check for further improvements
// TODO 2: Make things pretty?
export default {
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      wageDetails: {}
    }
  },
  created () {
    // eslint-disable-next-line
    const getWageDetails = async (id) => {
      // const token = 'bd6ad762f364ef73642631ee5224859372a6e8f7'
      // const response = await axios.get(`https://api.officient.io/1.0/wages/${id}/current`, {headers: {'Authorization': `Bearer ${token}`}})
      const postmanResponse = {
        'data': {
          'start_date': '2018-03-01',
          'estimated_monthly_total': 73000,
          'currency': 'EUR',
          'type': 'employee_paid_monthly',
          'rate': 50000,
          'registration_country_code': 'BE',
          'estimated_monthly_cost': {
            'base_components': {
              'base_rate': 50000,
              'social_contributions': 15000,
              'end_of_year_bonus': 4166.67,
              'retirement_plan': 0,
              'holiday_pay': 3833.33,
              'hospitalization_insurance': 0,
              'net_allowance': 0,
              'car': 0
            },
            'custom_components': []
          },
          'weekly_time_engagement_minutes': {
            'monday': 456,
            'tuesday': 456,
            'wednesday': 456,
            'thursday': 456,
            'friday': 456,
            'saturday': 0,
            'sunday': 0
          }
        }
      }
      this.wageDetails = postmanResponse.data
    }
    getWageDetails(this.id)
  }
}
</script>

<style scoped>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
      border: 1px solid #dddddd;
      text-align: center;
      padding: 8px;
  }

  tr:nth-child(even) {
      background-color: #dddddd;
  }
</style>
