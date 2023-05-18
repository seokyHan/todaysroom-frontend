import {instance} from '@/api/index';

function userLogin(userData) {
	return instance.post('/users/login', userData);
}

function reissue() {
	return instance.post('/users/reissue');
}

export {userLogin, reissue};
