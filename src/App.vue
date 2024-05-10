<template>
	<div id="app">
		<Header v-if="this.mountHeader" />
		<div class="app__contents">
			<RouterView />
		</div>
		<Footer v-if="this.mountFooter" />
	</div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';

export default {
	name: 'App',
	components: {
		Header,
		Footer,
	},
	computed: {
		mountHeader() {
			return this.$route.name !== 'NotFound';
		},
		mountFooter() {
			return (
				this.$route.fullPath !== '/search' && this.$route.name !== 'NotFound'
			);
		},
	},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
@import './scss/antDesign.scss';
@import './scss/reset.scss';
@import './scss/common.scss';
</style>
