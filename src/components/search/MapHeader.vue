<template>
	<div class="map__header">
		<div class="map__search">
			<div class="search__form">
				<input
					type="text"
					v-model="searchDong"
					@keyup.enter.prevent="searchAptListByDong"
					placeholder="시와 동 이름을 검색하세요."
				/>
			</div>
		</div>
		<div class="map__filters">
			<div class="filters__select">
				<ASelect
					v-model="selectedSidoCode"
					@change="selectSido"
					style="
						position: relative;
						z-index: 30;
						width: 220px;
						height: 34px;
						margin-right: 8px;
					"
				>
					<ASelectOption v-for="sido in sidoList" :key="sido.code">
						{{ sido.sidoName }}
					</ASelectOption>
				</ASelect>
				<ASelect
					v-model="selectedGugunCode"
					@change="selectGugun"
					style="
						position: relative;
						z-index: 30;
						width: 220px;
						height: 34px;
						margin-right: 8px;
					"
				>
					<ASelectOption v-for="gugun in gugunList" :key="gugun.code">
						{{ gugun.gugunName }}
					</ASelectOption>
				</ASelect>
				<ASelect
					v-model="selectedDongCode"
					@change="selectDong"
					style="
						position: relative;
						z-index: 30;
						width: 220px;
						height: 34px;
						margin-right: 8px;
					"
				>
					<ASelectOption v-for="dong in dongList" :key="dong.code">
						{{ dong.dongName }}
					</ASelectOption>
				</ASelect>
			</div>
			<div class="filters__btns">
				<button>
					<a-icon type="control" />
				</button>
				<button class="btns__clear-btn" @click="clearSearch">
					<a-icon type="sync" />
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {putRecentSearch} from '@/api/user';
import EventBus from '@/utils/eventBus';
import {showAlert} from '@/utils/alertUtils';

export default {
	data() {
		return {
			searchDong: this.searchDong,
			selectedSidoCode: '시를 선택하세요',
			selectedGugunCode: '구를 선택하세요',
			selectedDongCode: '동을 선택하세요',
		};
	},
	created() {
		this.getSidoList();
	},
	computed: {
		...mapState('searchStore', [
			'searchDongName',
			'sidoList',
			'gugunList',
			'dongList',
		]),
		...mapGetters('userStore', ['isLogin', 'getId']),
	},
	methods: {
		...mapMutations('userStore', ['SET_RECENT_SEARCH']),
		...mapMutations('searchStore', [
			'CLEAR_SIDO_LIST',
			'CLEAR_GUGUN_LIST',
			'CLEAR_DONG_LIST',
			'CLEAR_APT_LIST',
			'BACK_TO_ITEM_LIST',
			'OFF_ROAD_VIEW',
		]),
		...mapActions('searchStore', [
			'GET_SIDO_LIST',
			'GET_GUGUN_LIST',
			'GET_DONG_LIST',
			'GET_APT_LIST_BY_GUGUN',
			'GET_APT_LIST_BY_DONG',
			'GET_APT_LIST_BY_SEARCH',
			'GET_APT_LIST_BY_GUGUN_WITH_AUTH',
			'GET_APT_LIST_BY_DONG_WITH_AUTH',
			'GET_APT_LIST_BY_SEARCH_WITH_AUTH',
		]),
		async getSidoList() {
			try {
				await this.GET_SIDO_LIST();
			} catch (error) {
				showAlert(error, 'error', 1500);
			}
		},
		async getList(action, data) {
			try {
				await this[action](data);
			} catch (error) {
				showAlert(error, 'error', 1500);
			}
		},
		async getAptList(action, data) {
			try {
				if (this.isLogin) {
					data.userId = this.getId;
					await this[`${action}_WITH_AUTH`](data);
				} else {
					await this[action](data);
				}
				this.BACK_TO_ITEM_LIST();
			} catch (error) {
				showAlert(error, 'error', 1500);
			}
		},
		async getGugunList(sidoCode) {
			await this.getList('GET_GUGUN_LIST', {sidoCode: sidoCode});
		},
		async getDongList() {
			const sido = this.sidoList.find(
				(sido) => sido.code === this.selectedSidoCode,
			);
			const gugun = this.gugunList.find(
				(gugun) => gugun.code === this.selectedGugunCode,
			);

			await this.getList('GET_DONG_LIST', {
				sidoName: sido.sidoName,
				gugunName: gugun.gugunName,
			});
		},
		async getAptListByGugun() {
			const sido = this.sidoList.find(
				(sido) => sido.code === this.selectedSidoCode,
			);
			const gugun = this.gugunList.find(
				(gugun) => gugun.code === this.selectedGugunCode,
			);
			await this.getAptList('GET_APT_LIST_BY_GUGUN', {
				sidoName: sido.sidoName,
				gugunName: gugun.gugunName,
			});
		},
		async getAptListByDong() {
			const sido = this.sidoList.find(
				(sido) => sido.code === this.selectedSidoCode,
			);
			const gugun = this.gugunList.find(
				(gugun) => gugun.code === this.selectedGugunCode,
			);
			const dong = this.dongList.find(
				(dong) => dong.code === this.selectedDongCode,
			);
			await this.getAptList('GET_APT_LIST_BY_DONG', {
				sidoName: sido.sidoName,
				gugunName: gugun.gugunName,
				dongName: dong.dongName,
			});
		},
		async searchAptListByDong() {
			const searchData = {
				dongName: this.searchDong,
			};

			try {
				await this.getAptList('GET_APT_LIST_BY_SEARCH', searchData);
				this.CLEAR_GUGUN_LIST();
				this.CLEAR_DONG_LIST();
				this.selectedSidoCode = '시를 선택하세요';
				this.selectedGugunCode = '구를 선택하세요';
				this.selectedDongCode = '동을 선택하세요';
				EventBus.$emit('displayKakaoMapMarker');
				this.BACK_TO_ITEM_LIST();

				if (this.isLogin) {
					const recentSearchData = {
						id: this.getId,
						recentSearch: searchData.dongName,
					};
					putRecentSearch(recentSearchData);
					this.SET_RECENT_SEARCH(searchData.dongName);
				}
			} catch (error) {
				showAlert(error, 'error', 1500);
			}
		},
		selectSido() {
			this.CLEAR_GUGUN_LIST();
			this.CLEAR_DONG_LIST();
			this.selectedGugunCode = '구를 선택하세요';
			this.selectedDongCode = '동을 선택하세요';

			if (!isNaN(this.selectedSidoCode)) {
				this.getGugunList(this.selectedSidoCode);
			}
		},
		async selectGugun() {
			this.CLEAR_DONG_LIST();
			this.selectedDongCode = '동을 선택하세요';

			if (!isNaN(this.selectedGugunCode)) {
				this.getDongList();
				await this.getAptListByGugun();
			}
		},
		async selectDong() {
			if (!isNaN(this.selectedDongCode)) {
				await this.getAptListByDong(this.selectedDongCode);
				EventBus.$emit('displayKakaoMapMarker');
			}
		},
		clearSearch() {
			this.CLEAR_APT_LIST();
			this.selectedSidoCode = '시를 선택하세요';
			this.selectedGugunCode = '구를 선택하세요';
			this.selectedDongCode = '동을 선택하세요';
		},
	},
};
</script>

<style lang="scss" scoped>
@import './scss/mapHeader.scss';
</style>
