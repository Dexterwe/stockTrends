<template>
	<view class="main">
		<view class="box">
			<view class="left">
				<view class="image" @click="clickRegain">
					<image src="../../static/images/leftIcon.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="middle">
					<slot name="text"></slot>
				
			</view>
			<view class="right"></view>
		</view>
	</view>
</template>
<script setup>
	import { defineEmits } from 'vue';
	
	const emit = defineEmits(['clickRegain']);
	const clickRegain = ()=>{
		emit('clickRegain');
	}
</script>

<style lang="scss" scoped>
	.main{
		.box{
			width: 100%;
			height: 80rpx;
			display: grid;
			grid-template-columns: 1fr 2fr 1fr;
			background-color: white;
			&>view{
				width: 100%;
				height: 100%;
				// display: flex;
			}
			.left{
				display: flex;
				flex-direction: row;
				align-items: center;
				padding-left: 40rpx;
				.image{
					width: 25rpx;
					height: 25rpx;
						image{
							width: 120%;
							height: 120%;
						}
				}
			}
			.middle{
				width: 11rem;
				font-family: 'AlibabaPuHuiTi-3-65-Medium';
				font-size: 1.1rem;
				text-align: center;
				line-height: 2.3rem;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
