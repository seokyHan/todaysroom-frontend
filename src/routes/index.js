import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	scrollBehavior() {
		return {
			y: 0,
		};
	},
	routes: [
		{
			path: '/',
			component: () => import('@/views/MainPage.vue'),
		},
		{
			path: '/login',
			component: () => import('@/views/LoginPage.vue'),
		},
		{
			path: '/signup',
			component: () => import('@/views/SignupPage.vue'),
		},
	],
});
