<template>
	<div class="signup-form">
		<h1 class="signup-form__title">회원정보 입력</h1>
		<h2 class="signup-form__desc">
			오늘의 부동산 서비스 이용을 위해 사용하실 닉네임을 입력해주세요.
		</h2>
		<div class="signup-form__input">
			<label for="signup-nickname-input">닉네임</label>
			<div class="signup-form__input__main">
				<input
					type="text"
					id="signup-nickname-input"
					placeholder="한글 또는 영문만 가능"
					v-model="nickname"
				/>
			</div>
		</div>
		<button
			type="submit"
			class="signup-form__submit-btn"
			@click.prevent="submitSignupForm"
		>
			확인
		</button>
	</div>
</template>

<script>
import {showAlert} from '@/utils/alertUtils';
import {deleteCookie} from '@/utils/cookies';
export default {
	data() {
		return {
			nickname: '',
		};
	},
	methods: {
		async submitSignupForm() {
			if (this.nickname === '') {
				showAlert('닉네임을 입력하세요.', 'warning', 1500);
				return;
			}
			try {
				const signupUserData = {
					nickname: this.nickname,
				};

				await this.$store.dispatch('userStore/SOCIALSIGNUP', signupUserData);
				deleteCookie('oauth2');
				showAlert('회원가입 완료', 'success', 1500);
				this.$router.push('/');
			} catch (error) {
				const errorMessage = error.data;
				showAlert(errorMessage, 'error', 1500);
			} finally {
				this.nickname = '';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import './scss/signupForm.scss';
</style>
