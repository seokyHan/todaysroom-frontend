import store from '@/store/index';
import {reissue} from '../auth';
import {saveAuthToCookie} from '@/utils/cookies';

export function setInterceptors(instance) {
	instance.interceptors.request.use(
		(config) => {
			const token = store.getters['userStore/getToken'];
			if (token) {
				config.headers.Authorization =
					process.env.VUE_APP_API_TOKEN_PREFIX + ' ' + token;
			}

			if (config.isFileUploadRequest) {
				config.headers['Content-Type'] = 'multipart/form-data';
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

			if (errorCode === 'I-AUT-0002') {
				await reissue()
					.then((result) => {
						// 토큰 재발급 후 저장
						store.commit('userStore/SET_TOKEN', result.data.accessToken);
						saveAuthToCookie(result.data.accessToken);
					})
					.catch((error) => {
						// 에러났을 경우
						console.log(error);
					});
				return Promise.reject(error);
			}
			return Promise.reject(error);
		},
	);

	return instance;
}
