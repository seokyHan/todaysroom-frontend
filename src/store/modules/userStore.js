import {userLogin, userTest} from '@/api/auth';

const userStore = {
	namespaced: true,
	state: {
		accessToken: '',
		refreshToken: '',
		id: '',
		nickname: '',
		recentSearch: '',
		authority: '',
	},
	getters: {
		isLogin() {
			// return state.accressToken !== '';
			return true;
		},
		getToken(state) {
			return state.accessToken;
		},
		getRtk(state) {
			return state.refreshToken;
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
			console.log(data);
			commit('SET_TOKEN', data.accessToken);
			commit('SET_RTK', data.refreshToken);
		},
		async TEST() {
			const t = await userTest();
			console.log(t);
		},
	},
};

export default userStore;
