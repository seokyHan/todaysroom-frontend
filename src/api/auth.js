import {instance} from '@/api/index';

function userLogin(userData) {
	instance.post('/users/login', userData);
}

export {userLogin};
