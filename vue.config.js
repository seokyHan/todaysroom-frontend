const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		client: {
			overlay: false, // overlay: false 오류를 더이상 화면에 표시하지 않음.
		},
	},
});
