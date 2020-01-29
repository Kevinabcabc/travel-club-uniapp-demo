<template>
	<view class="findTravels">
			<travelInfo :datad="datad">
			</travelInfo>
	</view>
</template>

<script>
	import travelInfo from '@/components/travelInfo/travelInfo.vue'
	export default {
		data() {
			return {
				datad:123
			};
		},
		components:{
			travelInfo
		}
	}
</script>

<style lang="scss">
.findTravels{
	box-sizing: border-box;
	padding: 15rpx ;
}
</style>
