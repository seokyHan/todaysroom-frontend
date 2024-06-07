<template>
	<div class="inquiry-container">
		<div class="inquiry-form">
			<div class="inquiry-form__desc">
				<p>오늘의 부동산에 궁금하신 점을 문의해주세요.</p>
				<p>
					문의내용과 답변은 <strong>'1:1 문의내역'</strong>에서 확인하실 수
					있습니다.
				</p>
			</div>
			<ul class="inquiry-form__list">
				<li class="inquiry-form__item">
					<div class="item__title">문의유형</div>
					<template v-if="!onEdit">
						<select
							name="type"
							id="inquiry-type-select"
							v-model="inquiry.inquiryType"
						>
							<option value="">선택</option>
							<option value="일반문의">일반문의</option>
							<option value="허위매물 신고">허위매물 신고</option>
							<option value="이벤트 문의">이벤트 문의</option>
						</select>
					</template>
					<template v-else>
						<select
							name="type"
							id="inquiry-type-select"
							v-model="editInquiry.inquiryType"
						>
							<option value="">선택</option>
							<option value="일반문의">일반문의</option>
							<option value="허위매물 신고">허위매물 신고</option>
							<option value="이벤트 문의">이벤트 문의</option>
						</select>
					</template>
				</li>
				<li class="inquiry-form__item">
					<div class="item__title">제목</div>
					<template v-if="!onEdit">
						<input type="text" class="item__input" v-model="inquiry.title" />
					</template>
					<template v-else>
						<input
							type="text"
							class="item__input"
							v-model="editInquiry.title"
						/>
					</template>
				</li>
				<li class="inquiry-form__item">
					<div class="item__title">문의내용</div>
					<template v-if="!onEdit">
						<textarea
							name="content"
							type="content"
							class="item__textarea"
							placeholder="내용을 입력하세요."
							v-model="inquiry.content"
						></textarea>
					</template>
					<template v-else>
						<textarea
							name="content"
							type="content"
							class="item__textarea"
							placeholder="내용을 입력하세요."
							v-model="editInquiry.content"
						></textarea>
					</template>
				</li>
				<li class="inquiry-form__item">
					<div class="item__title">사진</div>
					<div class="item__uploader">
						<div
							class="item__uploader__input"
							@dragover="onDragOver"
							@drop="onDrop"
						>
							<AIcon type="camera" />
							<input
								type="file"
								accept="image/*"
								class="inquiry_file"
								@change="onChangeFiles"
								multiple
							/>
						</div>
						<template
							v-if="inquiry.fileList.length || editInquiry.fileList.length"
						>
							<div
								class="file-upload-list__item__btn-all-remove"
								@click="deleteAllFile()"
							>
								전체 삭제
							</div>
						</template>

						<template v-if="inquiry.fileList.length > 0">
							<div class="file-upload-list">
								<div
									class="file-upload-list__item"
									v-for="(file, index) in inquiry.fileList"
									:key="index"
								>
									<div class="file-upload-list__item__data">
										<img
											class="file-upload-list__item__data-thumbnail"
											:src="file.src"
										/>
										<div class="file-upload-list__item__data-name">
											{{ file.name }}
										</div>
									</div>
									<AIcon
										type="close"
										class="file-upload-list__item__btn-remove"
										@click="deleteFile(index)"
									/>
								</div>
							</div>
						</template>

						<template v-if="editInquiry.fileList.length > 0">
							<div class="file-upload-list">
								<div
									class="file-upload-list__item"
									v-for="(file, index) in editInquiry.fileList"
									:key="index"
								>
									<div class="file-upload-list__item__data">
										<img
											class="file-upload-list__item__data-thumbnail"
											:src="`${getImgPath}/upload-dir/Inquiry/${file.fileName}`"
										/>
										<div class="file-upload-list__item__data-name">
											{{ file.originalFilename }}
										</div>
									</div>
									<AIcon
										type="close"
										class="file-upload-list__item__btn-remove"
										@click="deleteByFileId(index)"
									/>
								</div>
							</div>
						</template>

						<div class="item__uploader__desc">
							<p>- 카메라 이미지 클릭 및 사진을 드래그 하여 업로드 해주세요.</p>
							<p>- 사진 용량은 10MB 까지 등록이 가능합니다.</p>
							<p>- 사진은 최대 5장까지 등록이 가능합니다.</p>
						</div>
					</div>
				</li>
			</ul>
			<template v-if="!onEdit">
				<div class="inquiry-form__footer">
					<button
						type="submit"
						class="inquiry-form__submit-btn"
						@click.prevent="submitInquiry"
					>
						문의하기
					</button>
				</div>
			</template>
			<template v-else>
				<div class="inquiry-form__footer">
					<button
						type="submit"
						class="inquiry-form__cancel-btn"
						@click="cancelEdit"
					>
						취소
					</button>
					<button
						type="submit"
						class="inquiry-form__edit-btn"
						@click="updateInquiryItem"
					>
						수정하기
					</button>
				</div>
			</template>
		</div>
		<div class="contact-info">
			<p>고객센터 : <strong>02-1234-5678</strong></p>
			<p>평일 10:00 ~ 18:30 (토, 일요일, 공휴일 휴무)</p>
		</div>
	</div>
</template>

<script>
import {
	registerInquiry,
	getInquiryItemDetail,
	updateInquiry,
} from '@/api/inquiry';
import {mapGetters} from 'vuex';
import {showAlert} from '@/utils/alertUtils';

export default {
	data() {
		return {
			inquiry: {
				inquiryType: '',
				title: '',
				content: '',
				fileList: [],
			},
			editInquiry: {
				inquiryType: '',
				title: '',
				content: '',
				fileList: [],
			},
			deleteFileList: [],
			onEdit: false,
			editInquiryId: '',
		};
	},
	computed: {
		...mapGetters('userStore', ['isLogin', 'getImgPath']),
	},
	created() {
		if (!isNaN(this.$route.params.id)) {
			this.initEditForm();
			this.onEdit = true;
		}
	},
	methods: {
		async submitInquiry() {
			if (!this.isLogin) {
				showAlert('로그인 후 이용해주세요.', 'info', 1500);
				this.$router.push('/login');
				return;
			}

			try {
				const inquiryData = {
					userId: this.$store.getters['userStore/getId'],
					inquiryType: this.inquiry.inquiryType,
					title: this.inquiry.title,
					content: this.inquiry.content,
				};

				let formData = new FormData();
				this.inquiry.fileList.forEach((file) =>
					formData.append('fileList', file),
				);
				formData.append(
					'inquiryRequestDto',
					new Blob([JSON.stringify(inquiryData)], {type: 'application/json'}),
				);

				await registerInquiry(formData);
				this.initForm();

				showAlert('1대1 문의 등록 완료.', 'success', 1500);

				this.$router.push('/account/inquiry-list');
			} catch (error) {
				showAlert('필수 입력 사항을 모두 입력하세요.', 'error', 1500);
			}
		},
		async initEditForm() {
			try {
				this.editInquiryId = this.$route.params.id;
				const {data} = await getInquiryItemDetail(this.editInquiryId);
				this.editInquiry = data;
			} catch (error) {
				const errorMessage = error.data;

				showAlert(`${errorMessage}`, 'error', 1500);
			}
		},
		initForm() {
			this.inquiry.inquiryType = '';
			this.inquiry.title = '';
			this.inquiry.content = '';
			this.inquiry.fileList = [];

			this.editInquiry.inquiryType = '';
			this.editInquiry.title = '';
			this.editInquiry.content = '';
			this.editInquiry.fileList = [];
		},
		cancelEdit() {
			this.$router.push('/account/inquiry-list');
		},
		async updateInquiryItem() {
			try {
				const updatedInquiryData = {
					id: this.editInquiryId,
					userId: this.$store.getters['userStore/getId'],
					inquiryType: this.editInquiry.inquiryType,
					title: this.editInquiry.title,
					content: this.editInquiry.content,
					deleteFileList: this.deleteFileList,
				};

				let formData = new FormData();
				this.inquiry.fileList.forEach((file) =>
					formData.append('fileList', file),
				);
				formData.append(
					'inquiryUpdateDto',
					new Blob([JSON.stringify(updatedInquiryData)], {
						type: 'application/json',
					}),
				);

				await updateInquiry(formData);
				this.initForm();

				showAlert('1대1 문의 수정 완료', 'success', 1500);

				this.$router.push('/account/inquiry-list');
			} catch (error) {
				const errorMessage = error.data;

				showAlert(`${errorMessage}`, 'error', 1500);
			}
		},
		// FileReader를 통해 파일을 읽어 thumbnail 영역의 src 값으로 셋팅
		async readFiles(files) {
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onload = async (e) => {
					resolve(e.target.result);
				};
				reader.readAsDataURL(files);
			});
		},
		async addFiles(files) {
			const fileLenth =
				this.inquiry.fileList.length + this.editInquiry.fileList.length;
			if (fileLenth >= 5) {
				showAlert('이미지는 최대 5장까지 등록 가능합니다.', 'warning', 1500);
				return;
			}
			for (const file of files) {
				const src = await this.readFiles(file);
				file.src = src;
				this.inquiry.fileList.push(file);
			}
		},
		onDragOver(e) {
			e.preventDefault();
		},
		deleteFile(index) {
			this.inquiry.fileList.splice(index, 1);
		},
		deleteAllFile() {
			this.editInquiry.fileList.forEach((file, index) => {
				this.deleteByFileId(index);
			});
			this.editInquiry.fileList = [];
			this.inquiry.fileList = [];
		},
		deleteByFileId(index) {
			this.deleteFileList.push(this.editInquiry.fileList[index].id);
			this.editInquiry.fileList.splice(index, 1);
		},
		onChangeFiles(e) {
			const files = e.target.files;
			this.addFiles(files);
		},
		onDrop(e) {
			e.preventDefault();
			const files = e.dataTransfer.files;
			this.addFiles(files);
		},
	},
};
</script>

<style lang="scss" scoped>
@import './scss/inquiryForm.scss';
</style>
