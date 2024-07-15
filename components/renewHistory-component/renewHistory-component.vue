<template>
	<view class="out">
		<mask-component @cloneMask="clickCloneButton">
			<template v-slot:titleText>
				更新历史入选
			</template>
			<template v-slot:content>
				<view class="mask-component-content">
					
					<view class="top">
						<view class="text">
							对于14天以上没有打开的策略，系统会停止跟踪历史股票。
							<br>
							您可以手动更新，通常需要10分钟时间。更新成功后，会通过短信通知您。
						</view>
					</view>
					<view class="bottom">
						<view class="button center" @click="clickRenew">立刻更新</view>
					</view>
					
				</view>
			</template>
		</mask-component>
	</view>
</template>

<script setup>
	import {ref, defineEmits, onMounted} from 'vue';
	const emits = defineEmits(['clonRenewHistoryMask', 'clickRenew'])
	const mailbox = ref('');
	const clickCloneButton = ()=>{
		mailbox.value = '';
		emits('clonRenewHistoryMask');
	}
	const clickRenew = ()=>{
		emits('clickRenew');
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
		padding-bottom: 25rpx;
		.top{
			height: 160rpx;
			.text{
				font-size: 24rpx;
				color: $uni-text-color-grey;
				line-height: 40rpx;
				padding-bottom: 30rpx;
			}
		}
		.bottom{
			padding-top: 65rpx;
			// padding-bottom: 30rpx;
			height: 100rpx;
			.button{
				height: 80rpx;
				background-color: $uni-color-theme;
				color: white;
				font-size: 26rpx;
				border-radius: 10rpx;
			}
		}
		.center{
			display: flex;
			align-items: center;
			justify-content: center;			
		}
	}
</style>