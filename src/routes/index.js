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
		{
			path: '/news',
			component: () => import('@/views/NewsPage.vue'),
		},
		{
			path: '/service/inquiry',
			component: () => import('@/views/service/ServiceInquiryPage.vue'),
		},
		{
			path: '/service/inquiry/:id',
			component: () => import('@/views/service/ServiceInquiryPage.vue'),
		},
		{
			path: '/account/inquiry-list',
			component: () => import('@/views/account/AccountInquiryPage.vue'),
		},
		{
			path: '/account/inquiry-list/detail/:id',
			component: () => import('@/views/account/AccountInquiryDetailPage.vue'),
		},
	],
});
