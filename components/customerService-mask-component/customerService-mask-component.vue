<template>
	<view class="out">
		<mask-component @cloneMask="clickCloneButton">
			<template v-slot:titleText>
				联系客服
			</template>
			<template v-slot:content>
				<view class="mask-component-content">
					<view class="top">
						新加策略,修改策略,咨询其他,请添加下方微信
					</view>
					<view class="botton">
						<view class="image">
							<image src="../../static/images/QRcode0.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</template>
		</mask-component>
	</view>
</template>

<script setup>
	import {ref, defineEmits} from 'vue';
	const emits = defineEmits(['cloneCustomerServiceMask'])
	const clickCloneButton = ()=>{
		emits('cloneCustomerServiceMask');
	}
</script>

<style lang="scss" scoped>
.mask-component-content{
			&>view{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.top{
				width: 100%;
				height: 100rpx;
				font-family: 'AlibabaPuHuiTi-3-55-Regular';
				font-size: 24rpx;
				color: #999999;
			}
			.botton{
				width: 100%;
				height: 400rpx;
				.image{
					width: 280rpx;
					height: 280rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
</style>