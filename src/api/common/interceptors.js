import store from '@/store/index';
import {reissue} from '../auth';

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
		(success) => {
			return success;
		},
		async (error) => {
			const errorCode = error.response.data.code;
			if (errorCode === 'I-AUT-0002') {
				const {data} = await reissue();
				store.commit('userStore/SET_TOKEN', data.accessToken);
				error.config.headers.Authorization = `${process.env.VUE_APP_API_TOKEN_PREFIX} ${store.getters['userStore/getToken']}`;

				return instance(error.config);
			}
			return Promise.reject(error);
		},
	);

	return instance;
}
