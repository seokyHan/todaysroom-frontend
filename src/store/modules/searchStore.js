import {
	fetchSidoList,
	fetchGugunList,
	fetchDongList,
	fetchAptListByGugun,
	fetchAptListByDong,
	fetchAptListBySearch,
	fetchAptListByGugunWithAuth,
	fetchAptListByDongWithAuth,
	fetchAptListBySearchWithAuth,
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
			const priceList = state.aptList.map((apt) => apt.recentPrice);

			priceList.sort(
				(a, b) => parseInt(a.replace(',', '')) - parseInt(b.replace(',', '')),
			);

			const lowestPrice = priceList[0];

			return lowestPrice;
		},
		getHighestPrice(state) {
			const priceList = state.aptList.map((apt) => apt.recentPrice);

			priceList.sort((a, b) =>
				parseInt(b.replace(',', '') - parseInt(a.replace(',', ''))),
			);

			const highestPrice = priceList[0];

			return highestPrice;
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
				state.sidoList.push[{code: sido.sidoCode, sidoName: sido.sidoName}];
			});
		},
		SET_GUGUN_LIST(state, gugunListData) {
			gugunListData.forEach((gugun) => {
				state.gugunList.push({
					code: gugun.gugunCode,
					gugunName: gugun.gugunName,
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
			const {data} = await fetchAptListByGugun(dongData);
			commit('SET_APT_LIST', data);
			commit('OFF_LOADING');
		},
		async GET_APT_LIST_BY_DONG({commit}, dongData) {
			commit('ON_LOADING');
			const {data} = await fetchAptListByDong(dongData);
			commit('SET_APT_LIST', data);
			commit('OFF_LOADING');
		},
		async GET_APT_LIST_BY_SEARCH({commit}, searchData) {
			commit('ON_LOADING');
			const {data} = await fetchAptListBySearch(searchData);
			commit('SET_APT_LIST', data);
			commit('SET_SEARCH_DONG_NAME', searchData.dongName);
			commit('OFF_LOADING');
		},
		async GET_APT_LIST_BY_GUGUN_WITH_AUTH({commit}, dongData) {
			commit('ON_LOADING');
			const {data} = await fetchAptListByGugunWithAuth(dongData);
			commit('SET_APT_LIST', data);
			commit('OFF_LOADING');
		},
		async GET_APT_LIST_BY_DONG_WITH_AUTH({commit}, dongData) {
			commit('ON_LOADING');
			const {data} = await fetchAptListByDongWithAuth(dongData);
			commit('SET_APT_LIST', data);
			commit('OFF_LOADING');
		},
		async GET_APT_LIST_BY_SEARCH_WITH_AUTH({commit}, searchData) {
			commit('ON_LOADING');
			const {data} = await fetchAptListBySearchWithAuth(searchData);
			commit('SET_APT_LIST', data);
			commit('SET_SEARCH_DONG_NAME', searchData.dongName);
			commit('OFF_LOADING');
		},
	},
};

export default searchStore;
