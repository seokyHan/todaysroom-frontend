import {instance} from '@/api/index';

function userLogin(userData) {
	return instance.post('/users/login', userData);
}

export {userLogin};
