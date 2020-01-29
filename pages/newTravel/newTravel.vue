<template>
	<view class="newTravel">
		<view class="upload" v-if="imgFilePath===''" @tap="uploadImgAction">
			<view class="add">+</view>
			<view class="intro">添加一张图片</view>
		</view>	
		<view class="upload" v-else  @tap="uploadImgAction">
			<image lazy-load="{true}" :src="imgFilePath" mode=""></image>
		</view>
		
		<view class="contentBox">
			<view class="title">添加描述</view>
			<textarea @input="textareaAction" value="" placeholder=" 输入想说的话" />
		</view>
		<view class="timeBox">
			<view class="title">出发时间</view>
			<view class="pickerBox">
				<view class="desc">当前时间：</view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{date}}</view>
				</picker>
			</view>
		</view>
		<button @tap="smtAction" class="smtBtn" type="primary">立即发布</button>
	</view>
</template>

<script>
	import {
		mapState,  
		mapMutations  
	} from 'vuex';  
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				imgFilePath:'',
				fileID:'',
				date: currentDate,
				content:''
			};
		},
		computed: {
			...mapState(['islogin','userInfo']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		watch:{
			fileID(newVal,oldVal){
				wx.cloud.getTempFileURL({
					fileList:[newVal],
					success:(res)=>{
						this.imgFilePath = res.fileList[0].tempFileURL;
					}
				})
			}
		},
		methods:{
			uploadImgAction(){
				uni.chooseImage({ 
					success:(res)=>{	
						console.log(this)
						const path = res.tempFilePaths[0];
						console.log(path)
						wx.cloud.uploadFile({
						  cloudPath:'travelIMG/code.png',
						  filePath:path
						})
						.then((res)=>{
						  console.log('成功了');
						  console.log(res.fileID);
						  this.fileID = res.fileID;
						})
						.catch(()=>{
						  console.log('失败了');
						})
					}
				})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			smtAction(){
				console.log(this.islogin)
				console.log(this.userInfo)
				wx.cloud.callFunction({
					name:'releaseTravel',
					data:{
						content:this.content,
						data:this.data,
						fileID:this.fileID
					},
					success:(res)=>{
						console.log(res)
					},
					fail:(res)=>{
						console.log(res)
					}
				})
			},
			textareaAction(e){
				this.content = e.detail.value;
			}
		}
	}
</script>

<style lang="scss">
	.newTravel{
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		padding: 15rpx;
		padding-top: 30rpx;
		.upload{
			height: 300rpx;
			width: 300rpx;
			border: 1rpx solid #ddd;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #ddd;
			image{
				height: 300rpx;
				width: 300rpx;
			}
			.add{
				font-size: 100rpx;
			}	
		}
		.contentBox{
			textarea{
				width: 100%;
				background: #eee;
				padding: 15rpx;
				box-sizing: border-box;
			}
		}
		.timeBox{
			.pickerBox{
				background: #eee;
				height: 60rpx;
				display: flex;
				justify-content: left;
				align-items: center;
				box-sizing: border-box;
				padding: 0 15rpx;
				.desc{
					padding-right: 15rpx;
				}
			}
		}
		.smtBtn{
			margin-top: 30rpx;
		}
	}
	
	.title{
		line-height: 70rpx;
		font-weight: bolder;
	}
</style>
