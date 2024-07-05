import {instance, instanceWithAuth} from '@/api/index';

function signupUser(userData) {
	return instance.post('/users/signup', userData);
}

function checkDuplicate(email) {
	return instance.get('/users/email-check', {params: email});
}

function userLogin(userData) {
	// 다른 도메인에 요청과 응답에 쿠키를 허용하려면 withCredentials true 설정(로컬 개발 테스트용)
	// 쿠키와 같은 인증과 관련된 데이터를 함부로 요청 데이터에 담지 않도록 되어서 withCredentials은 나중에 수정(backend도 포함)
	return instance.post('/users/login', userData);
}

function reissue() {
	return instance.post('/users/reissue');
}

function userLogOut() {
	return instanceWithAuth.post('/users/logout');
}

function userTest() {
	return instanceWithAuth.post('/users/test');
}

export {signupUser, checkDuplicate, userLogin, reissue, userLogOut, userTest};
