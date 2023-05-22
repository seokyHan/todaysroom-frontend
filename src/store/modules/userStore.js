import {userLogin, userTest} from '@/api/auth';

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
			return state.accressToken;
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
		SET_TOKEN(state, accressToken) {
			state.accressToken = accressToken;
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
			commit('SET_TOKEN', data.accressToken);
		},
		async TEST(state) {
			const t = await userTest();
			console.log('key ' + state.accressToken);
			console.log(t);
		},
	},
};

export default userStore;
