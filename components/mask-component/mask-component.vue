<template>
	<view class="out" @click="clickClone">
		<view class="box">
			<view class="window" @click.stop>
				<view class="title">
					<view class="left"></view>
					<view class="middle">
						<view class="text">
							<slot name="titleText"></slot>
						</view>
					</view>
					<view class="right">
						<view class="image" @click="clickClone">
							<image src="../../static/images/cloneIcon.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				
				<view class="content">
					<slot name="content"></slot>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {ref, defineEmits} from 'vue';
	const emit = defineEmits(['cloneMask']);
	const clickClone = ()=>{
		emit('cloneMask');
	}
</script>
<style lang="scss" scoped>
	.out{
		font-family: 'AlibabaPuHuiTi-3-65-Medium';
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		background-color: rgba(0, 0, 0, 0.4);
		padding-top: 25vh;
		z-index: 20;
		.box{
			position: absolute;
			top: 530rpx;
			width: 100%;
			padding: 0 35rpx;
			.window{
				margin: auto;
				border-radius: 20rpx;
				padding-bottom: 50rpx;
				width: 100%;
				min-height: 200rpx;
				background-color: white;
				.title{
					// z-index: 21;
					display: grid;
					grid-template-columns: 1fr 2fr 1fr;
					height: 100rpx;
					&>view{
						height: 100%;
					}
					.left{
					}
					.middle{
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						.text{
							font-family: 'AlibabaPuHuiTi-3-55-Regular';
							font-size: 1.1rem;
						}
					}
					.right{
						padding-right: 40rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: end;
						.image{
							height: 22rpx;
							width: 22rpx;
							display: flex;
							flex-direction: column;
							align-items: center;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
				}
				.content{
					background-color: white;
					padding: 0 40rpx;
				}
			}
		}
	}
</style>

