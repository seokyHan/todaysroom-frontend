import {instanceWithAuth} from '@/api/index';

function putRecentSearch(recentSearchData) {
	return instanceWithAuth.put('/users/recent-search', recentSearchData);
}

function postLikedItem(aptData) {
	return instanceWithAuth.post('/liked-apt-codes', aptData);
}

function fetchLikedAptCodes(userData) {
	return instanceWithAuth.get('/liked-apt-codes', {params: userData});
}

function deletedLikedItem(aptData) {
	return instanceWithAuth.delete('/liked-apt-codes', {params: aptData});
}

function fetchLikedAptList(userData) {
	return instanceWithAuth.get('/liked-apt-codes', {params: userData});
}

export {
	putRecentSearch,
	postLikedItem,
	fetchLikedAptCodes,
	deletedLikedItem,
	fetchLikedAptList,
};
