<template>
	<li class="list__item">
		<div class="item__info">
			<div class="info__image">
				<template v-if="isLogin">
					<AIcon
						v-if="apt.likedStatus"
						@click="removeLikedItem(index, apt.aptCode)"
						type="heart"
						theme="filled"
						style="color: #f6685e"
					/>
					<AIcon
						v-else
						@click="addLikedItem(index, apt.aptCode)"
						type="heart"
						style="color: #f6685e"
					/>
				</template>
				<img :src="`${getImgPath}${apt.image}`" :alt="apt.aptName" />
			</div>
			<div class="info__desc" @click="SELECT_ITEM(apt)">
				<p class="desc__price">매매 {{ apt.convertAmount }}</p>
				<h1 class="desc__title">아파트 · {{ apt.aptName }}</h1>
				<p class="desc__sub-desc">건축연도: {{ apt.buildYear }}년</p>
				<p class="desc__sub-desc">{{ apt.gugunName }} {{ apt.dongName }}</p>
				<div class="desc__badges">
					<p class="badges__confirm-status">
						확인 {{ apt.year }}.{{ apt.month }}.{{ apt.day }}.
					</p>
					<p
						class="badges__lowest-price"
						v-if="
							getLowestPrice !== getHighestPrice &&
							apt.amount === getLowestPrice
						"
					>
						최저가 검색 매물
					</p>
					<p
						class="badges__highest-price"
						v-if="
							getLowestPrice !== getHighestPrice &&
							apt.amount === getHighestPrice
						"
					>
						최고가 검색 매물
					</p>
				</div>
			</div>
		</div>
	</li>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {postLikedItem, deletedLikedItem} from '@/api/user';

export default {
	props: {
		apt: {
			type: Object,
			default: () => ({}),
		},
		liked: {
			typs: Boolean,
			default: false,
		},
		index: {
			type: Number,
		},
	},
	computed: {
		...mapState('userStore', ['likedAptCodes']),
		...mapGetters('searchStore', [
			'getLowestPrice',
			'getHighestPrice',
			'getSelectedItem',
		]),
		...mapGetters('userStore', ['isLogin', 'getId', 'getImgPath']),
	},
	methods: {
		...mapMutations('searchStore', ['SELECT_ITEM', 'ON_LIKED', 'OFF_LIKED']),
		...mapActions('userStore', ['ADD_LIKED_APT_CODES']),
		async addLikedItem(index, aptCode) {
			const aptData = {
				userId: this.getId,
				aptCode: aptCode,
			};

			this.ON_LIKED(index);
			await postLikedItem(aptData);
		},
		async removeLikedItem(index, aptCode) {
			const aptData = {
				userId: this.getId,
				aptCode: aptCode,
			};

			this.OFF_LIKED(index);
			await deletedLikedItem(aptData);
		},
	},
};
</script>

<style lang="scss" scoped>
@import './scss/aptItem.scss';
</style>
