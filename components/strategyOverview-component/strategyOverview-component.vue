<template>
	<view class="out">
		<view class="box" @click="goStrategyDetails">
			<view class="card">
				<view class="top">
					<view class="left">
						<view class="text" @click="goStrategyDetails">
							<slot name="strategyName"></slot>
						</view>
					</view>
					<view class="right" @click="goStrategyDetails">
						<view class="text" :style="{'color':colors[colorNumber]}">
							<slot name="trend"></slot>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="left">
						<view class="text">
							<slot name="summary"></slot>
						</view>
					</view>
					<view class="right" @click="goStrategyDetails">
						<view class="image">
							<image src="../../static/images/rightIcon.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import { defineEmits, defineProps, ref } from 'vue';
	
	const props = defineProps({
	  colorNumber: {
	    type: Number,
	    default: '0'
	  }
	});
	
	const colors = ref(['#DE433F', '#5B9244']);

	const emit = defineEmits(['goStrategyDetailsEvent']);
	const goStrategyDetails = ()=>{
		emit('goStrategyDetailsEvent');
	}
</script>
<style lang="scss" scoped>
	@import url("../../uni.scss");
	.out{
		.box{
			padding-top: 20rpx;
			width: 100%;
			min-height: 240rpx;
			.card{
				background-color: white;
				border-radius: 20rpx;
				width: 100%;
				height: 100%;
				display: grid;
				grid-template-rows: 1fr 2fr;
				&>view{
					width: 100%;
					.left{
					}
					.right{
					}
				}
				.top{
					display: grid;
					grid-template-columns: 5fr 1fr;
					padding-top: 35rpx;
					.left{
						padding-left: 40rpx;
						.text{
							font-size: 28rpx;
							font-family: 'AlibabaPuHuiTi-3-65-Medium';
							height: 100%;
							display: flex;
							flex-direction: row;
							align-items: center;
						}
					}
					.right{
						padding-right: 40rpx;
						.text{
							font-size: 28rpx;
							font-family: 'AlibabaPuHuiTi-3-55-Regular';
							height: 100%;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: end;
						}
					}
				}
				.bottom{
					display: grid;
					grid-template-columns: 10fr 1fr;
					.left{
						padding: 15rpx 40rpx;
						.text{
							font-size: 24rpx;
							color: #767676;
							letter-spacing: 2rpx;
							overflow: hidden;
						}
					}
					.right{
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: end;
						padding-right: 40rpx;
						position: relative;
						.image{
							position: absolute;
							bottom: 22px;
							width: 20rpx;
							height: 20rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>

