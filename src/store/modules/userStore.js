import {userLogin, userTest} from '@/api/auth';
import {
	getAuthFromCookie,
	getUserFromCookie,
	getIdFromCookie,
	getRecentSearchFromCookie,
	//getAuthorityFromCookie,
	saveAuthToCookie,
	saveUserToCookie,
	saveIdToCookie,
	saveRecentSearchToCookie,
	//saveAuthorityToCookie,
} from '@/utils/cookies';

const userStore = {
	namespaced: true,
	state: {
		accessToken: getAuthFromCookie() || '',
		id: getIdFromCookie() || '',
		nickname: getUserFromCookie() || '',
		recentSearch: getRecentSearchFromCookie() || '',
		likedAptCodes: [],
		authority: '',
	},
	getters: {
		isLogin(state) {
			return state.accessToken !== '';
		},
		getToken(state) {
			return state.accessToken;
		},
		getId(state) {
			return state.id;
		},
		getNickname(state) {
			return state.nickname;
		},
		getRecentSearch(state) {
			return state.recentSearch;
		},
		getAuthority(state) {
			return state.authority;
		},
	},
	mutations: {
		SET_TOKEN(state, accessToken) {
			state.accessToken = accessToken;
		},
		SET_RTK(state, refreshToken) {
			state.refreshToken = refreshToken;
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
		SET_AUTHORITY(state, authority) {
			state.authority = authority;
		},
	},
	actions: {
		async LOGIN({commit}, loginUserData) {
			const {data} = await userLogin(loginUserData);

			commit('SET_TOKEN', data.accessToken);
			commit('SET_ID', data.id);
			commit('SET_NICKNAME', data.nickname);
			commit('SET_RECENT_SEARCH', data.recentSearch);

			saveAuthToCookie(data.accessToken);
			saveIdToCookie(data.id);
			saveUserToCookie(data.nickname);
			saveRecentSearchToCookie(data.recentSearch);
			//saveAuthorityToCookie(data.authority);
		},
		async TEST() {
			const t = await userTest();
			console.log(t);
		},
	},
};

export default userStore;
