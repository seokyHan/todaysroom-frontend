import {userLogOut, userLogin, socialUserSignup} from '@/api/auth';
import {
	getUserFromCookie,
	getIdFromCookie,
	getUserEmailFromCookie,
	getRecentSearchFromCookie,
	getAuthoritiesFromCookie,
	getOauthFromCookie,
	getIsLogin,
	saveUserToCookie,
	saveIdToCookie,
	saveisLogin,
	saveRecentSearchToCookie,
	saveAuthoritiesToCookie,
} from '@/utils/cookies';

const userStore = {
	namespaced: true,
	state: {
		imgPath: process.env.VUE_APP_IMG_DIR_PATH,
		accessToken: '',
		id: getIdFromCookie() || '',
		userEmail: getUserEmailFromCookie() || '',
		nickname: getUserFromCookie() || '',
		recentSearch: getRecentSearchFromCookie() || '',
		likedAptCodes: [],
		authorities: getAuthoritiesFromCookie() || [],
	},
	getters: {
		getImgPath(state) {
			return state.imgPath;
		},
		isLogin() {
			return getIsLogin() !== '';
		},
		isOauth() {
			return getOauthFromCookie() !== '';
		},
		getToken(state) {
			return state.accessToken;
		},
		getId(state) {
			return state.id;
		},
		getNickname(state) {
			return decodeURI(state.nickname);
		},
		getRecentSearch(state) {
			return state.recentSearch;
		},
		getAuthorities(state) {
			return state.authorities;
		},
	},
	mutations: {
		SET_TOKEN(state, accessToken) {
			state.accessToken = accessToken;
		},
		SET_USEREMAIL(state, userEmail) {
			state.userEmail = userEmail;
		},
		SET_ID(state, id) {
			state.id = id;
		},
		SET_NICKNAME(state, nickname) {
			state.nickname = nickname;
		},
		SET_RECENT_SEARCH(state, recentSearch) {
			state.recentSearch = recentSearch;
		},
		SET_AUTHORITIES(state, authorities) {
			state.authorities = authorities;
		},
		CLEAR_ALL(state) {
			state.accessToken = '';
			state.id = '';
			state.userEmail = '';
			state.nickname = '';
			state.recentSearch = '';
			state.likedAptCodes = [];
		},
	},
	actions: {
		async LOGIN({commit}, loginUserData) {
			const {data} = await userLogin(loginUserData);

			commit('SET_TOKEN', data.accessToken);
			commit('SET_ID', data.id);
			commit('SET_USEREMAIL', data.userEmail);
			commit('SET_NICKNAME', data.nickname);
			commit('SET_RECENT_SEARCH', data.recentSearch);
			commit('SET_AUTHORITIES', data.authorities);

			saveIdToCookie(data.id);
			saveUserToCookie(data.nickname);
			saveRecentSearchToCookie(data.recentSearch);
			saveAuthoritiesToCookie(data.authorities);
			saveisLogin();
		},
		async LOGOUT({commit}, logoutUserData) {
			await userLogOut(logoutUserData);

			commit('CLEAR_ALL');
		},
		async SOCIALSIGNUP({commit}) {
			const {data} = await socialUserSignup();

			commit('SET_ID', data.id);
			commit('SET_USEREMAIL', data.userEmail);
			commit('SET_NICKNAME', data.nickname);
			commit('SET_RECENT_SEARCH', data.recentSearch);

			saveIdToCookie(data.id);
			saveUserToCookie(data.nickname);
			saveRecentSearchToCookie(data.recentSearch);
		},
	},
};

export default userStore;
