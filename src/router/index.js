import Vue from 'vue'
import Router from 'vue-router'
import Singer from '../components/singer/singer.vue'
import Rank from '../components/rank/rank.vue'
import Search from '../components/search/search.vue'
import Recommend from '../components/recommend/recommend.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/singer',
      component: Singer
    }, {
      path: '/rank',
      component: Rank
    }, {
      path: '/search',
      component: Search
    }, {
      path: '/recommend',
      component: Recommend
    }
  ]
})
