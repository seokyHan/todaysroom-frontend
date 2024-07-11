import {
	fetchSidoList,
	fetchGugunList,
	fetchDongList,
	fetchHouseListByGugun,
	fetchHouseListByDong,
	fetchHouseListBySearch,
	fetchHouseListByGugunWithAuth,
	fetchHouseListByDongWithAuth,
	fetchHouseListBySearchWithAuth,
} from '@/api/search';

const searchStore = {
	namespaced: true,
	// state
	state: {
		appKey: process.env.VUE_APP_KAKAO_APP_KEY,
		searchDongName: '',
		sidoList: [{code: 0, sidoName: '선택하세요'}],
		gugunList: [{code: 0, gugunName: '선택하세요'}],
		dongList: [{code: 0, dongName: '선택하세요'}],
		aptList: [],
		selectedItem: {},
		isSelected: false,
		roadViewStatus: false,
		loading: false,
	},
	// getters
	getters: {
		getAppKey(state) {
			return state.appKey;
		},
		getAptList(state) {
			return state.aptList;
		},
		getLowestPrice(state) {
			const priceList = state.aptList.map((apt) => apt.amount);

			priceList.sort(
				(a, b) =>
					parseInt(a.replace('억', '').replace(' ', '')) -
					parseInt(b.replace('억', '').replace(' ', '')),
			);

			return priceList[0];
		},
		getHighestPrice(state) {
			const priceList = state.aptList.map((apt) => apt.amount);

			priceList.sort(
				(a, b) =>
					parseInt(b.replace('억', '').replace(' ', '')) -
					parseInt(a.replace('억', '').replace(' ', '')),
			);

			return priceList[0];
		},
		getSelectedItem(state) {
			return state.selectedItem;
		},
		getAptListPositions(state) {
			return state.aptList.map((apt) => [apt.lat, apt.lng]);
		},
	},
	// mutations
	mutations: {
		SET_SEARCH_DONG_NAME(state, searchDongName) {
			state.searchDongName = searchDongName;
		},
		SET_SIDO_LIST(state, sidoListData) {
			sidoListData.forEach((sido) => {
				state.sidoList.push({code: sido.sidoCode, sidoName: sido.sidoName});
			});
		},
		SET_GUGUN_LIST(state, gugunListData) {
			gugunListData.forEach((gugun) => {
				state.gugunList.push({
					code: gugun.guGunCode,
					gugunName: gugun.guGunName,
				});
			});
		},
		SET_DONG_LIST(state, dongListData) {
			dongListData.forEach((dong) => {
				state.dongList.push({
					code: dong.dongCode,
					dongName: dong.dongName,
				});
			});
		},
		SET_APT_LIST(state, aptList) {
			state.aptList = aptList;
		},
		CLEAR_SIDO_LIST(state) {
			state.sidoList = [{code: 0, sidoName: '선택하세요'}];
		},
		CLEAR_GUGUN_LIST(state) {
			state.gugunList = [{code: 0, gugunName: '선택하세요'}];
		},
		CLEAR_DONG_LIST(state) {
			state.dongList = [{code: 0, dongName: '선택하세요'}];
		},
		CLEAR_APT_LIST(state) {
			state.aptList = [];
			state.selectedItem = {};
			state.isSelected = false;
			state.roadViewStatus = false;
			state.loading = false;
		},
		CLEAR_SEARCH_DATA(state) {
			state.aptList = [];
		},
		SELECT_ITEM(state, itemObject) {
			state.isSelected = true;
			state.selectedItem = itemObject;
		},
		BACK_TO_ITEM_LIST(state) {
			state.selectedItem = {};
			state.isSelected = false;
			state.roadViewStatus = false;
		},
		ON_ROAD_VIEW(state) {
			state.roadViewStatus = true;
		},
		OFF_ROAD_VIEW(state) {
			state.roadViewStatus = false;
		},
		ON_LOADING(state) {
			state.loading = true;
		},
		OFF_LOADING(state) {
			state.loading = false;
		},
		ON_LIKED(state, index) {
			state.aptList[index].likedStatus = true;
		},
		OFF_LIKED(state, index) {
			state.aptList[index].likedStatus = false;
		},
	},
	// actions
	actions: {
		async GET_SIDO_LIST({commit}) {
			const {data} = await fetchSidoList();
			commit('SET_SIDO_LIST', data);
		},
		async GET_GUGUN_LIST({commit}, sidoData) {
			const {data} = await fetchGugunList(sidoData);
			commit('SET_GUGUN_LIST', data);
		},
		async GET_DONG_LIST({commit}, gugunData) {
			const {data} = await fetchDongList(gugunData);
			commit('SET_DONG_LIST', data);
		},
		async GET_APT_LIST_BY_GUGUN({commit}, dongData) {
			commit('ON_LOADING');
			const {data} = await fetchHouseListByGugun(dongData);
			commit('SET_APT_LIST', data);
			commit('OFF_LOADING');
		},
		async GET_APT_LIST_BY_DONG({commit}, dongData) {
			commit('ON_LOADING');
			const {data} = await fetchHouseListByDong(dongData);
			commit('SET_APT_LIST', data);
			commit('OFF_LOADING');
		},
		async GET_APT_LIST_BY_SEARCH({commit}, searchData) {
			commit('ON_LOADING');
			const {data} = await fetchHouseListBySearch(searchData);
			commit('SET_APT_LIST', data);
			commit('SET_SEARCH_DONG_NAME', searchData.dongName);
			commit('OFF_LOADING');
		},
		async GET_APT_LIST_BY_GUGUN_WITH_AUTH({commit}, dongData) {
			commit('ON_LOADING');
			const {data} = await fetchHouseListByGugunWithAuth(dongData);
			commit('SET_APT_LIST', data);
			commit('OFF_LOADING');
		},
		async GET_APT_LIST_BY_DONG_WITH_AUTH({commit}, dongData) {
			commit('ON_LOADING');
			const {data} = await fetchHouseListByDongWithAuth(dongData);
			commit('SET_APT_LIST', data);
			commit('OFF_LOADING');
		},
		async GET_APT_LIST_BY_SEARCH_WITH_AUTH({commit}, searchData) {
			commit('ON_LOADING');
			const {data} = await fetchHouseListBySearchWithAuth(searchData);
			commit('SET_APT_LIST', data);
			commit('SET_SEARCH_DONG_NAME', searchData.dongName);
			commit('OFF_LOADING');
		},
	},
};

export default searchStore;
