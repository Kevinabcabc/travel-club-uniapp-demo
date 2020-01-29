<template>
	<view class="content">
		<button type="primary" @click="addAction">{{addres}}</button>
		<view class="">
			stoe data  : {{demodata}}
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				addres: 0
			}
		}, 
		computed: mapState(['demodata']),
		onLoad() {

		},
		methods: {
			addAction(){
				wx.cloud.callFunction({
					  name:'add',
					  data:{
						a:3,
						b:5
					  },  
					  success:(res)=>{
						console.log(res.result);
						this.addres = res.result;
					  }
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
