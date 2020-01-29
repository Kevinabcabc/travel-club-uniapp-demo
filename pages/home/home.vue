<template>
	<view class="home">
		<view   class="userInfo-box">
			<view class="avatarUrlBox">
				<image v-if="avatarUrl" :src="avatarUrl"  mode="widthFix"></image>
			</view>
			<view class="infoBox">
				<view class="nickname">{{nickName?nickName:'加载中'}}</view>
				<view class="genderAndCity">
					<view class="gender">
						性别：{{gender===2?'正在辨认性别':gender===1?'男':'女'}}
					</view>
					<view class="city">
						所在地：{{city?city:'查地图中'}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {  
		mapState,  
		mapMutations  
	} from 'vuex';  
	export default {
		data() {
			return {
				ifLoadUserInfo:false,
				avatarUrl:String,
				city:String,
				gender:2,
				nickName:String
			}
		},
		methods: {  
			...mapMutations(['setLoginStatus','setUserInfo'])  
		},
		watch:{
			ifLoadUserInfo(newval,oldval){
				if(newval){
					wx.cloud.callFunction({
						name:'checkUserID',
						success:(res)=>{
							if(res.result.length===0){
								wx.cloud.callFunction({
									name:'addUser',
									data:{
										time: new Date(),
										nickName:this.nickName,
										gender:this.gender,
										city:this.city,
										avatarUrl:this.avatarUrl
									},
									success:(res)=>{
										console.log(res);
									}
								})
							}
						},
						fail:(res)=>{
							console.log(res)
						}
					})
				}
			}
		},
		onLoad() {
			uni.login({
			  provider: 'weixin',
			  success:(loginRes)=>{
			    // 获取用户信息
			    uni.getUserInfo({
			      provider: 'weixin',
			      success: (infoRes)=> {
					  console.log(infoRes.userInfo.avatarUrl)
					this.setLoginStatus();
					this.setUserInfo({
						avatarUrl:infoRes.userInfo.avatarUrl,
						city:infoRes.userInfo.city,
						gender:infoRes.userInfo.gender,
						nickName:infoRes.userInfo.nickName
					})
			        // console.log('用户昵称为：' + infoRes.userInfo.nickName);
					this.avatarUrl = infoRes.userInfo.avatarUrl;
					this.nickName = infoRes.userInfo.nickName;
					this.city = infoRes.userInfo.city;
					this.gender = infoRes.userInfo.gender;
					this.ifLoadUserInfo=true;
			      }
			    });
			  }
			});
		}
	}
</script>

<style lang="scss">
.home{
	box-sizing: border-box;
	padding: 15rpx;
	.userInfo-box{
		height: 150rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		.avatarUrlBox{
			image{	
				height: 150rpx;
				width: 150rpx;
			}
		}
		.infoBox{
			width: 550rpx;
			.nickname{
				line-height: 80rpx;
			}
			.genderAndCity{
				display: flex;
				justify-content: space-between;
			}
		}
	}
}
</style>
