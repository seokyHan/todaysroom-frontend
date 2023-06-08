import store from '@/store/index';
import {reissue} from '../auth';

export function setInterceptors(instance) {
	instance.interceptors.request.use(
		function (config) {
			const token = store.getters['userStore/getToken'];
			console.log('헤더에 심는 토큰 ' + token);
			if (token) {
				config.headers.Authorization =
					process.env.VUE_APP_API_TOKEN_PREFIX + ' ' + token;
			}
			return config;
		},
		function (error) {
			return Promise.reject(error);
		},
	);

	instance.interceptors.response.use(
		(success) => success,
		async (error) => {
			const errorCode = error.response.data.code;

			if (errorCode === 'TOKEN-0001') {
				console.log('결과2 ' + error);
				console.log('코드2 ' + errorCode);
				console.log('메세지2 ' + error.response.data.message);
				await reissue()
					.then((result) => {
						// 토큰 재발급 후 저장
						store.commit('userStore/SET_TOKEN', result.data.accessToken);
						console.log('결과3 ' + result.data.accessToken);
						console.log('코드3 ' + errorCode);
						console.log('메세지3 ' + error.response.data.message);
						console.log('토큰 ' + store.getters['userStore/getToken']);
					})
					.catch((error) => {
						// 에러났을 경우
						console.log(error);
					});
				return Promise.reject(error);
			}
		},
	);

	return instance;
}
