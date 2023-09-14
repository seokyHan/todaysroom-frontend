<template>
	<div class="signup-container">
		<TermsForm @submitTerms="passSignupForm" v-if="!isCheckedTerms" />
		<SignupForm v-else />
		<!-- <OuathSignupForm v-else /> -->
	</div>
</template>

<script>
import TermsForm from '@/components/user/TermsForm.vue';
import SignupForm from '@/components/user/SignupForm.vue';
// import OuathSignupForm from '@/components/user/OauthSignupForm.vue';

export default {
	components: {
		TermsForm,
		SignupForm,
		// OuathSignupForm,
	},
	data() {
		return {
			isCheckedTerms: false,
			// isOauth: false,
		};
	},
	methods: {
		passSignupForm() {
			this.isCheckedTerms = true;
			// this.isOauth = oauthStatus === true ? true : false;
		},
	},
};
</script>

<style lang="scss" scoped>
@import './scss/signupPage.scss';
</style>
