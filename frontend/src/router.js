import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/views/Home';
import CreateComponent from '@/components/appoitment/Create';
import AppoitmentComponent from '@/components/appoitment/Appoitment';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: HomeComponent },
    { path: '/create', name: 'Create', component: CreateComponent },
    { path: '/appoitment/:id', name: 'Appoitment', component: AppoitmentComponent },
  ]
});