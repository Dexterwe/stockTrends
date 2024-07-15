<template>
	<view class="out">
		<mask-component @cloneMask="clickCloneButton">
			<template v-slot:titleText>
				提示
			</template>
			<template v-slot:content>
				<view class="mask-component-content">
					
					<view class="top">
						<view class="image" :animation="animationData">
							<image src="../../static/images/loadingGif.gif" mode="aspectFit"></image>
						</view>
						<view class="text">
							正在更新...
						</view>
					</view>
					<view class="bottom">
						<view class="text">
							正在为您更新历史入选的股票，请稍等。
							更新完成后，会通过短信通知您。
						</view>
					</view>
					
				</view>
			</template>
		</mask-component>
	</view>
</template>
<script setup>
	import {ref, defineEmits, onMounted} from 'vue';
	const emits = defineEmits(['clonNowRenewHistory'])
	const clickCloneButton = ()=>{
		emits('clonNowRenewHistory');
	}
	
</script>

<style lang="scss" scoped>
	.mask-component-content{
		font-family: 'AlibabaPuHuiTi-3-55-Regular';
		&>view{
			width: 100%;
			padding: 10rpx 0;
			&>view{
				display: flex;
				flex-direction: row;
			}
		}
		.top{
			height: 160rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.text{
				padding-top: 30rpx;
				font-size: 1rem;
				color: black;
				line-height: 35rpx;
				font-family: 'AlibabaPuHuiTi-3-85-Bold';
			}
			.image{
				width: 130rpx;
				height: 130rpx;
				image{
					width: 130%;
					height: 130%;
				}
			}
		}
		.bottom{
			height: 120rpx;
			padding: 30rpx 40rpx;
			.text{
				font-family: 'AlibabaPuHuiTi-3-55-Regular';
				font-size: 0.9rem;
				color: $uni-text-color-grey;
			}
		}
		.center{
			display: flex;
			align-items: center;
			justify-content: center;			
		}
	}
</style>