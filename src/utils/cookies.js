function saveAuthToCookie(value) {
	document.cookie = `auth=${value}`;
}

function saveUserToCookie(value) {
	document.cookie = `nickname=${value}`;
}

function saveIdToCookie(value) {
	document.cookie = `id=${value}`;
}

function saveUserEmailToCookie(value) {
	document.cookie = `userEmail=${value}`;
}

function saveRecentSearchToCookie(value) {
	document.cookie = `recentSearch=${encodeURI(value)}`;
}

function saveAuthoritiesToCookie(value) {
	document.cookie = `authority=${value}`;
}

function saveisLogin(value) {
	localStorage.setItem('isLogin', value);
}

function getOauthFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)oauth2\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function getUserFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)nickname\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function getIdFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)id\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function getRecentSearchFromCookie() {
	return decodeURIComponent(
		document.cookie.replace(
			/(?:(?:^|.*;\s*)recentSearch\s*=\s*([^;]*).*$)|^.*$/,
			'$1',
		),
	);
}

function getUserEmailFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)userEmail\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function getIsSocialLoginFirst() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)isFirst\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function getAuthoritiesFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)authority\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function getIsLogin() {
	return localStorage.getItem('isLogin');
}

function getAuthFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function deleteIsLogin() {
	localStorage.removeItem('isLogin');
}

function deleteCookie(value) {
	document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function clearAllCookies() {
	deleteCookie('auth');
	deleteCookie('id');
	//deleteCookie('userEmail');
	deleteCookie('nickname');
	deleteCookie('recentSearch');
	deleteCookie('authority');
}

export {
	saveAuthToCookie,
	saveUserToCookie,
	saveIdToCookie,
	saveUserEmailToCookie,
	saveRecentSearchToCookie,
	saveAuthoritiesToCookie,
	saveisLogin,
	getOauthFromCookie,
	getUserFromCookie,
	getIdFromCookie,
	getUserEmailFromCookie,
	getIsSocialLoginFirst,
	getRecentSearchFromCookie,
	getAuthoritiesFromCookie,
	getIsLogin,
	getAuthFromCookie,
	deleteIsLogin,
	deleteCookie,
	clearAllCookies,
};
