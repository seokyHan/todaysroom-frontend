import store from '@/store/index';

export function setInterceptors(instance) {
	instance.interceptors.request.use(
		function (config) {
			const token = store.getters['userStore/getToken'];
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		function (error) {
			return Promise.reject(error);
		},
	);

	instance.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			return Promise.reject(error);
		},
	);

	return instance;
}
