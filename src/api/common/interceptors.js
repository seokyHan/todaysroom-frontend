import store from '@/store/index';
import router from '@/routes/index';
import {reissue} from '../auth';
import {showAlert} from '@/utils/alertUtils';
import {deleteIsLogin} from '@/utils/cookies';

export function setInterceptors(instance) {
	instance.interceptors.request.use(
		async (config) => {
			if (!store.getters['userStore/getToken']) {
				const {data} = await reissue();
				store.commit('userStore/SET_TOKEN', data.accessToken);
			}
			config.headers.Authorization = `${process.env.VUE_APP_API_TOKEN_PREFIX} ${store.getters['userStore/getToken']}`;

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
		(response) => response,
		async (error) => {
			const errorCode = error.response.data.code;
			if (errorCode === 'I-AUT-0002') {
				error.config.sent = true;
				const {data} = await reissue();

				store.commit('userStore/SET_TOKEN', data.accessToken);
				error.config.headers.Authorization = `${process.env.VUE_APP_API_TOKEN_PREFIX} ${store.getters['userStore/getToken']}`;

				return instance(error.config);
			} else if (errorCode === 'I-AUT-0006') {
				showAlert('세션이 만료 되었습니다.', 'warning', 1500);
				deleteIsLogin();
				router.push('/login').catch(() => {});
			}
			return Promise.reject(error);
		},
	);

	return instance;
}
