import Vue from 'vue'
import Router from 'vue-router'
import WelcomeHome from '@/components/WelcomeHome'
import ListPeople from '@/components/ListPeople'
import ListPeopleDetail from '@/components/ListPeopleDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WelcomeHome',
      component: WelcomeHome
    },
    {
      path: '/people',
      name: 'ListPeople',
      component: ListPeople
    },
    {
      path: '/people/:id',
      name: 'ListPeopleDetail',
      component: ListPeopleDetail,
      props: true
    }
  ]
})
