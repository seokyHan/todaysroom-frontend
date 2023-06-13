import {instance, instanceWithAuth} from '@/api/index';
// import {instanceWithAuth} from '@/api/index';

function userLogin(userData) {
	// 다른 도메인에 요청과 응답에 쿠키를 허용하려면 withCredentials true 설정(로컬 개발 테스트용)
	// 쿠키와 같은 인증과 관련된 데이터를 함부로 요청 데이터에 담지 않도록 되어서 withCredentials은 나중에 수정(backend도 포함)
	return instance.post('/users/login', userData);
}

function reissue() {
	return instance.post('/users/reissue');
}

function userTest() {
	return instanceWithAuth.post('/users/test');
}

export {userLogin, reissue, userTest};
