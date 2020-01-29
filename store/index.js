import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		islogin: false,
		userInfo:{
			avatarUrl:'',
			city:'',
			gender:'',
			nickName:'',
		}
	},
	mutations: {
		setLoginStatus(state) {
			state.islogin = true;
		},
		setUserInfo(state, info) {
			state.userInfo = info;
		},
		// setUserInfo(state, userInfo) {
		// 	state.userInfo = userInfo;
		// },
		// setFileID(state, fileID) {
		// 	state.fileID = fileID;
		// },
		// setCloudPath(state, cloudPath) {
		// 	state.cloudPath = cloudPath;
		// },
		// setImagePath(state, imagePath) {
		// 	state.imagePath = imagePath;
		// },
	}
})

export default store
