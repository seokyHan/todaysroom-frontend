import {instance, instanceWithAuth} from '@/api/index';

function fetchSidoList() {
	return instance.get('/map/sido');
}

function fetchGugunList(sidoData) {
	return instance.get('/map/gugun', {params: sidoData});
}

function fetchDongList(gugunData) {
	return instance.get('/map/dong', {params: gugunData});
}

function fetchHouseListByGugun(gugunData) {
	return instance.get('/map/gugun/house', {params: gugunData});
}

function fetchHouseListByDong(dongData) {
	return instance.get('/map/dong/house', {params: dongData});
}

function fetchHouseListBySearch(searchDate) {
	return instance.get('/map/dong-search', {params: searchDate});
}

function fetchHouseListByGugunWithAuth(gugunData) {
	return instanceWithAuth.get('/map/gu/liked', {params: gugunData});
}

function fetchHouseListByDongWithAuth(dongData) {
	return instanceWithAuth.get('/map/dong/liked', {params: dongData});
}

function fetchHouseListBySearchWithAuth(searchDate) {
	return instanceWithAuth.get('/map/dong-search/user', {params: searchDate});
}

function fetchRecommendations(recentSearchData) {
	return instance.get('/map/recommend', {params: recentSearchData});
}

function fetchRecommendationsByDong(recentSearchData) {
	return instanceWithAuth.get('/map/recommend', {params: recentSearchData});
}

export {
	fetchSidoList,
	fetchGugunList,
	fetchDongList,
	fetchHouseListByGugun,
	fetchHouseListByDong,
	fetchHouseListBySearch,
	fetchHouseListByGugunWithAuth,
	fetchHouseListByDongWithAuth,
	fetchHouseListBySearchWithAuth,
	fetchRecommendations,
	fetchRecommendationsByDong,
};
