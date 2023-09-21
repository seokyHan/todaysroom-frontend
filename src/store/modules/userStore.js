import {userLogOut, userLogin, userTest, socialUserSignup} from '@/api/auth';
import {
	getAuthFromCookie,
	getUserFromCookie,
	getIdFromCookie,
	getUserEmailFromCookie,
	getRecentSearchFromCookie,
	//getAuthorityFromCookie,
	getOauthFromCookie,
	saveAuthToCookie,
	saveUserToCookie,
	saveIdToCookie,
	//saveUserEmailToCookie,
	saveRecentSearchToCookie,
	//saveAuthorityToCookie,
} from '@/utils/cookies';

const userStore = {
	namespaced: true,
	state: {
		accessToken: getAuthFromCookie() || '',
		id: getIdFromCookie() || '',
		userEmail: getUserEmailFromCookie() || '',
		nickname: getUserFromCookie() || '',
		recentSearch: getRecentSearchFromCookie() || '',
		likedAptCodes: [],
		authority: '',
	},
	getters: {
		isLogin(state) {
			return state.accessToken !== '';
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
		getAuthority(state) {
			return state.authority;
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
		SET_AUTHORITY(state, authority) {
			state.authority = authority;
		},
		CLEAR_ALL(state) {
			state.token = '';
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

			saveAuthToCookie(data.accessToken);
			saveIdToCookie(data.id);
			//saveUserEmailToCookie(data.userEmail);
			saveUserToCookie(data.nickname);
			saveRecentSearchToCookie(data.recentSearch);
			//saveAuthorityToCookie(data.authority);
		},
		async LOGOUT({commit}, logoutUserData) {
			await userLogOut(logoutUserData);

			commit('CLEAR_ALL');
		},
		async TEST() {
			const t = await userTest();
			console.log(t);
		},
		async SOCIALSIGNUP({commit}) {
			const {data} = await socialUserSignup();

			console.log(data);

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
