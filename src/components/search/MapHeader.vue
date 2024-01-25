<template>
	<div class="map__header">
		<div class="map__search">
			<div class="search__form">
				<input
					type="text"
					v-model="searchDong"
					@keyup.enter.prevent="searchAptListByDong"
					placeholder="동 이름을 검색하세요."
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
export default {};
</script>

<style lang="scss" scoped>
@import './scss/mapHeader.scss';
</style>
