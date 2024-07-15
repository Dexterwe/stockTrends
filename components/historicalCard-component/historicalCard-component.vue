<template>
	<view  class="out">
		<view class="box">
			<view class="title">
				<view class="left">
					<view class="text">
						{{time}} 入选{{entityList.length}}支
					</view>
				</view>
				<view class="right">
					<view class="box">
						<view class="icon">
							<!-- <image src="../../static/images/renewIcon.png" mode="aspectFit"></image> -->
						</view>
						<view class="text"></view>
					</view>
					
					<view class="box">
						<view class="icon">
							<!-- <image src="../../static/images/exportIcon.png" mode="aspectFit"></image> -->
						</view>
						<view class="text"></view>
					</view>
					
				</view>
			</view>
			<!--  -->
			<view class="tableHead">
				<view class="field">股票简称</view>
				<view class="field">开盘</view>
				<view class="field">收盘</view>
				<view class="field">涨幅</view>
				<view class="field">成交</view>
			</view>
			<view class="tableData">
				
				<view class="entity" v-for="item in entityList">
					
					<view class="field share">
						<view class="name">
							{{item.name}}
						</view>
						<view class="code">
							{{item.symbol}}
						</view>
					</view>
					
					<view class="field" :style="{color: (item.pct_chg < 0) ? '#5B9244' : '#DE433F'}">
						{{Number(item.open).toFixed(2)}}
					</view>
					
					<view class="field" :style="{color: (item.pct_chg < 0) ? '#5B9244' : '#DE433F'}">
						{{Number(item.close).toFixed(2)}}
					</view>
					
					<view class="field" :style="{color: (item.pct_chg < 0) ? '#5B9244' : '#DE433F'}">	
						{{item.pct_chg > 0 ? '+' : (item.pct_chg < 0 ? '-' : '')}}{{item.pct_chg}}%
					</view>
					<view class="field">{{item.vol}}万</view>
				</view>						
			</view>
		</view>
	</view>
</template>
<script setup>
	import {ref, defineProps, defineEmits, onMounted} from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	
	const stockInfo = ref({});
	
	const props = defineProps({
		entityList: Object,
		time:String,
		id:String
	});
	
</script>

<style lang="scss" scoped>
	.box{
		width: 100vw;
		padding-bottom: 20rpx;
		&>view{
				background-color: white;
		}
		.tableData{
			.entity{
				height: 100rpx;
				width: 100vw;
				display: grid;
				grid-template-columns: 1.5fr 1fr 1fr 2fr 2fr;
				.field{
					font-size: 26rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.share{
					display: flex;
					flex-direction: column;
					padding-left: 25rpx;
					
					display: flex;
					align-items: start;
					justify-content: center;
					
					.code{
						font-size: 22rpx;
						color: $uni-text-color-grey;
					}
					.name{
						
					}
				}				
			}

		}
		
		.tableHead{
			position: relative;
			height: 80rpx;
			width: 100vw;
			display: grid;
			// grid-template-columns: repeat(5, 1fr);
			grid-template-columns: 1.5fr 1fr 1fr 2fr 2fr;
			.field{
				font-size: 26rpx;
				color: $uni-text-color-grey;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.tableHead::after {
		  content: '';
		  position: absolute;
		  left: 2vw;
		  bottom: 0;
		  width: 92vw;
		  height: 1rpx; 
		  background-color: $uni-border-color;
		}
		.tableHead::before {
		  content: '';
		  position: absolute;
		  left: 2vw;
		  top: 0;
		  width: 92vw;
		  height: 1rpx;
		  background-color: $uni-border-color; 
		}
		
		.title{
			display: grid;
			grid-template-columns: 2fr 1fr;
			padding: 0 30rpx;
			height: 100rpx;
			font-family: 'AlibabaPuHuiTi-3-55-Regular';
			&>view{
				display: flex;
				flex-direction: row;
			}
			
			.left{
				align-items: center;
				justify-content: start;
				.text{
					font-size: 28rpx;
				}
			}
			.right{
				align-items: end;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: end;
				&>view{
					width: auto;
					height: 35rpx;
					padding-left: 20rpx;
					font-family: 'AlibabaPuHuiTi-3-55-Regular';
					font-size: 24rpx;
					display: flex;
					flex-direction: row;
					.icon{
						width: 22rpx;
						height: 22rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.text{
						padding-left: 5rpx;
					}
				}
			}
		}
	}
</style>