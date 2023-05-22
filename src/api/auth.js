import {instance} from '@/api/index';

function userLogin(userData) {
	return instance.post('/users/login', userData);
}

function reissue() {
	return instance.post('/users/reissue');
}

function userTest() {
	return instance.post('/users/test');
}

export {userLogin, reissue, userTest};
