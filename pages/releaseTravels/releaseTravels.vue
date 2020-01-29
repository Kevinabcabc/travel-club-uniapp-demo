<template>
	<view class="releaseTravels">
		<view @tap="pushAction" class="newTravelBox">
			<image src="../../static/plane.svg" mode=""></image>
			<view class="">发布一条旅行</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				
			};
		},
		components:{
			uniIcons 
		},
		methods:{
			pushAction(){
				uni.navigateTo({
					url:'../newTravel/newTravel'
				})	
			}
		}
	}
</script>

<style lang="scss">
.releaseTravels{
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	padding: 15rpx;
	padding-top: 30rpx;
	.newTravelBox{
		height: 270rpx;
		width: 100%;
		border-radius: 15rpx;
		box-shadow: 0 0 15rpx #ddd;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			height: 100rpx;
			width: 100rpx;
		}
		view{
			font-size: 30rpx;
			color:#999;
		}
	}
}
	
</style>
