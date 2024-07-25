<template>
	<div class="map_wrap">
		<div
			id="map"
			style="width: 100%; height: 100%; position: relative; overflow: hidden"
		></div>
		<ul id="category">
			<li id="BK9" data-order="0" @click="onClickCategory('BK9', 'bank')">
				<span class="category_bg bank"></span>
				은행
			</li>
			<li id="MT1" data-order="1" @click="onClickCategory('MT1', 'mart')">
				<span class="category_bg mart"></span>
				마트
			</li>
			<li id="PM9" data-order="2" @click="onClickCategory('PM9', 'pharmacy')">
				<span class="category_bg pharmacy"></span>
				약국
			</li>
			<li id="OL7" data-order="3" @click="onClickCategory('OL7', 'gasStation')">
				<span class="category_bg oil"></span>
				주유소
			</li>
			<li id="CE7" data-order="4" @click="onClickCategory('CE7', 'cafe')">
				<span class="category_bg cafe"></span>
				카페
			</li>
			<li
				id="CS2"
				data-order="5"
				@click="onClickCategory('CS2', 'convenienceStore')"
			>
				<span class="category_bg store"></span>
				편의점
			</li>
		</ul>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import EventBus from '@/utils/eventBus';

export default {
	name: 'KakaoMap',
	data() {
		return {
			map: null,
			mapTypeControl: null,
			zoomControl: null,
			placeOverlay: null,
			contentNode: null,
			markers: [],
			aptMarkers: [],
			currCategory: '',
			infowindow: null,
			ps: null,
			overlay: null,
			categories: [
				'bank',
				'mart',
				'pharmacy',
				'gasStation',
				'cafe',
				'convenienceStore',
			],
			categoryStatus: {
				bank: 'off',
				mart: 'off',
				pharmacy: 'off',
				gasStation: 'off',
				cafe: 'off',
				convenienceStore: 'off',
			},
		};
	},
	computed: {
		...mapGetters('userStore', ['getImgPath']),
		...mapGetters('searchStore', [
			'getAptListPositions',
			'getAptList',
			'getAppKey',
		]),
	},
	created() {
		EventBus.$on('displayKakaoMapMarker', () => {
			this.displayMarker(this.getAptListPositions);
		});
	},
	mounted() {
		if (window.kakao && window.kakao.maps) {
			this.initKakaoMap();
		} else {
			const script = document.createElement('script');

			/* global kakao */
			script.onload = () => kakao.maps.load(this.initKakaoMap);
			script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${this.getAppKey}&libraries=services`;
			document.head.appendChild(script);
		}
	},
	beforeDestroy() {
		EventBus.$off('displayKakaoMapMarker');
	},
	methods: {
		initKakaoMap() {
			const mapContainer = document.getElementById('map');
			const mapOptions = {
				center: new kakao.maps.LatLng(37.5403169, 126.99526),
				level: 7,
			};

			this.placeOverlay = new kakao.maps.CustomOverlay({zIndex: 1});
			this.map = new kakao.maps.Map(mapContainer, mapOptions);
			this.mapTypeControl = new kakao.maps.MapTypeControl();
			this.zoomControl = new kakao.maps.ZoomControl();
			this.ps = new kakao.maps.services.Places(this.map);
			this.contentNode = document.createElement('div');
			kakao.maps.event.addListener(this.map, 'idle', this.searchPlaces);
			this.map.addControl(
				this.mapTypeControl,
				kakao.maps.ControlPosition.TOPRIGHT,
			);
			this.map.addControl(this.zoomControl, kakao.maps.ControlPosition.RIGHT);

			this.contentNode.className = 'placeinfo_wrap';
			this.addEventHandle(
				this.contentNode,
				'mousedown',
				kakao.maps.event.preventMap,
			);
			this.addEventHandle(
				this.contentNode,
				'touchstart',
				kakao.maps.event.preventMap,
			);
			this.placeOverlay.setContent(this.contentNode);
			this.displayMarker(this.getAptListPositions);
		},
		addEventHandle(target, type, callback) {
			if (target.addEventListener) {
				target.addEventListener(type, callback);
			} else {
				target.attachEvent('on' + type, callback);
			}
		},
		searchPlaces() {
			if (!this.currCategory) {
				return;
			}

			this.placeOverlay.setMap(null);
			this.removeMarker();
			this.ps.categorySearch(this.currCategory, this.placesSearchCB, {
				useMapBounds: true,
			});
		},
		placesSearchCB(data, status) {
			if (status === kakao.maps.services.Status.OK) {
				this.displayPlaces(data);
			}
		},
		displayPlaces(places) {
			const kakaoMap = this;
			const order = document
				.getElementById(this.currCategory)
				.getAttribute('data-order');

			for (let i = 0; i < places.length; i++) {
				const marker = this.addMarker(
					new kakao.maps.LatLng(places[i].y, places[i].x),
					order,
				);

				(function (marker, place) {
					kakao.maps.event.addListener(marker, 'click', function () {
						kakaoMap.displayPlaceInfo(place);
					});
				})(marker, places[i]);
			}
		},
		addMarker(position, order) {
			const imageSrc =
					'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png',
				imageSize = new kakao.maps.Size(27, 28),
				imgOptions = {
					spriteSize: new kakao.maps.Size(72, 208),
					spriteOrigin: new kakao.maps.Point(46, order * 36),
					offset: new kakao.maps.Point(11, 28),
				},
				markerImage = new kakao.maps.MarkerImage(
					imageSrc,
					imageSize,
					imgOptions,
				),
				marker = new kakao.maps.Marker({
					position: position,
					image: markerImage,
				});

			marker.setMap(this.map);
			this.markers.push(marker);

			return marker;
		},
		removeMarker() {
			for (let i = 0; i < this.markers.length; i++) {
				this.markers[i].setMap(null);
			}
			this.markers = [];
		},
		displayPlaceInfo(place) {
			let content =
				'<div class="placeinfo">' +
				'   <a class="title" href="' +
				place.place_url +
				'" target="_blank" title="' +
				place.place_name +
				'">' +
				place.place_name +
				'</a>';

			if (place.road_address_name) {
				content +=
					'    <span title="' +
					place.road_address_name +
					'">' +
					place.road_address_name +
					'</span>' +
					'  <span class="jibun" title="' +
					place.address_name +
					'">(지번 : ' +
					place.address_name +
					')</span>';
			} else {
				content +=
					'    <span title="' +
					place.address_name +
					'">' +
					place.address_name +
					'</span>';
			}

			content +=
				'    <span class="tel">' +
				place.phone +
				'</span>' +
				'</div>' +
				'<div class="after"></div>';

			this.contentNode.innerHTML = content;
			this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
			this.placeOverlay.setMap(this.map);
		},
		onClickCategory(selectedId, key) {
			const id = selectedId;

			if (this.categoryStatus[key] === 'off') {
				this.offAllCategoryStatus();
				this.categoryStatus[key] = 'on';
			} else {
				this.categoryStatus[key] = 'off';
			}

			this.placeOverlay.setMap(null);

			if (this.categoryStatus[key] === 'on') {
				this.currCategory = id;
				this.searchPlaces();
			} else {
				this.currCategory = '';
				this.removeMarker();
			}
		},
		offAllCategoryStatus() {
			this.categories.forEach((category) => {
				this.categoryStatus[category] = 'off';
			});
		},
		removeDuplicatesLatLng(data) {
			const uniqueMap = new Map();
			data.forEach((item) => {
				const key = `${item.La},${item.Ma}`;
				if (!uniqueMap.has(key)) {
					uniqueMap.set(key, item);
				}
			});

			return Array.from(uniqueMap.values());
		},
		removeDuplicatesApt(data) {
			const uniqueMap = new Map();
			data.forEach((item) => {
				const key = `${item.lat},${item.lng}`;
				if (!uniqueMap.has(key)) {
					uniqueMap.set(key, item);
				}
			});

			return Array.from(uniqueMap.values());
		},
		displayMarker(markerPositions) {
			document.querySelectorAll('.wrap').forEach((e) => e.remove());
			if (this.aptMarkers.length > 0) {
				this.aptMarkers.forEach((marker) => marker.setMap(null));
				this.aptMarkers = [];
			}

			const map = this.map;
			let positions = markerPositions.map(
				(position) => new kakao.maps.LatLng(...position),
			);
			positions = this.removeDuplicatesLatLng(positions);
			const aptList = this.removeDuplicatesApt(this.getAptList);

			if (positions.length > 0) {
				this.aptMarkers = positions.map(
					(position) =>
						new kakao.maps.Marker({
							map: map,
							position,
						}),
				);

				this.aptMarkers.forEach((marker, index) => {
					const content = document.createElement('div');
					content.classList.add('wrap');

					const info = document.createElement('div');
					info.classList.add('info');

					const title = document.createElement('div');
					title.classList.add('title');

					const aptName = document.createElement('div');
					aptName.textContent = aptList[index].aptName;

					const closeBtn = document.createElement('div');
					closeBtn.classList.add('close');
					closeBtn.setAttribute('title', '닫기');
					closeBtn.textContent = 'X';

					title.appendChild(aptName);
					title.appendChild(closeBtn);

					const body = document.createElement('div');
					body.classList.add('body');

					const imgContainer = document.createElement('div');
					imgContainer.classList.add('img');

					const img = document.createElement('img');
					img.src = `${this.getImgPath}${aptList[index].image}`;
					img.width = 73;
					img.height = 70;

					imgContainer.appendChild(img);

					const desc = document.createElement('div');
					desc.classList.add('desc');

					const price = document.createElement('div');
					price.classList.add('price');
					price.textContent = aptList[index].convertAmount;

					const address = document.createElement('div');
					address.classList.add('address');

					const addressInfo = document.createElement('span');
					addressInfo.classList.add('address__info');
					addressInfo.textContent = `${aptList[index].locationOfAgency} ${aptList[index].legal}`;

					address.appendChild(addressInfo);

					desc.appendChild(price);
					desc.appendChild(address);

					body.appendChild(imgContainer);
					body.appendChild(desc);

					info.appendChild(title);
					info.appendChild(body);

					content.appendChild(info);

					const overlay = new kakao.maps.CustomOverlay({
						content: content,
						map: map,
						position: marker.getPosition(),
					});

					kakao.maps.event.addListener(marker, 'click', function () {
						overlay.setMap(map);
					});

					closeBtn.onclick = function () {
						overlay.setMap(null);
					};
				});

				const bounds = positions.reduce(
					(bounds, latlng) => bounds.extend(latlng),
					new kakao.maps.LatLngBounds(),
				);

				this.map.setBounds(bounds);
			}
		},
	},
};
</script>

<style lang="scss">
@import './scss/kakaoMap.scss';
</style>
