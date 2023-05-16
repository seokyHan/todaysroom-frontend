import {userLogin} from '@/api/auth';

const userStore = {
	namespaced: true,
	state: {
		accressToken: '',
		refreshToken: '',
		id: '',
		nickname: '',
		recentSearch: '',
		authority: '',
	},
	getters: {
		isLogin(state) {
			return state.accressToken !== '';
		},
		getToken(state) {
			return state.token;
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
		SET_TOKEN(state, token) {
			state.token = token;
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
			commit('SET_TOKEN', data.token);
		},
	},
};

export default userStore;
