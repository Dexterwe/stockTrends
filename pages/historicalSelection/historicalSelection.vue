<template>
	<view class="out">
		
		<view class="head">
			<stateBar-component></stateBar-component>
			<titleBar-component @clickRegain="clickRegain">
				<template v-slot:text>
					{{ltitle}}
				</template>
			</titleBar-component>
		</view>
		<view class="pass" :style="{height: BarHeight + 'px'}"></view>
		<view class="background"></view>
		
		<view class="title">
			<view class="left"></view>
			<view class="right">
				<view class="box" @click="renewFun">
					<view class="icon">
						<image src="../../static/images/renewIcon.png" mode="aspectFit"></image>
					</view>
					<view class="text">更新</view>
				</view>
				
				<view class="box" @click="exportFun">
					<view class="icon">
						<image src="../../static/images/exportIcon.png" mode="aspectFit"></image>
					</view>
					<view class="text">导出</view>
				</view>
				
			</view>
		</view>
		
		<!-- 卡片 -->
		<historicalCard-component 
			:entityList="item.symbols" 
			:time="item.touch_date"
			v-for="item in historicalSelectionList"
			@clickRenew="renewFun(item.id)" 
			@clickExport="exportFun(item.id)">
		</historicalCard-component>
		
		
		<!-- 右下角按钮 -->
		<customerServiceButton-component @customerService="isMaskShow = !isMaskShow">
		</customerServiceButton-component>
		
		<!-- 联系客服 -->
		<customerService-mask-component @cloneCustomerServiceMask="isMaskShow = !isMaskShow" v-show="isMaskShow">
		</customerService-mask-component>
		
		<!-- 导出历史 -->
		<exportHistory-mask-component v-show="isExportHistoryMask"
			@clonExportHistoryMask="isExportHistoryMask = !isExportHistoryMask"
			@sendMailbox="sendMailbox">
		</exportHistory-mask-component>
		
		<!-- 更新入选 -->
		<renewHistory-component v-show="isRenewHistoryMask"
			@clonRenewHistoryMask="isRenewHistoryMask = !isRenewHistoryMask"
			@clickRenew="renewPanel">
		</renewHistory-component>
		
		<!-- 立刻更新历史 -->
		<nowRenewHistory-component v-show="isNowRenewHistoryShow"
			@clonNowRenewHistory="isNowRenewHistoryShow = !isNowRenewHistoryShow">
		</nowRenewHistory-component>
		
	</view>
</template>
<script setup>
	import {onMounted, ref} from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	import {requestFun} from '@/static/js/common.js'
	
	// 计算头部高度
	const BarHeight = ref(0);
	let statusBarHeight = 0;
	let tmp = uni.getSystemInfoSync().statusBarHeight
	statusBarHeight = (tmp == 0 ? 35 : tmp)
	BarHeight.value = statusBarHeight + uni.rpx2px(80);
	// 
	const ltitle = ref('');
	
	let lToken = '';
	
	let lId = '';
	
	const historicalSelectionList = ref([]);
	
	// 导出遮罩
	const isExportHistoryMask = ref(false);
	
	// 更新历史遮罩
	const isRenewHistoryMask = ref(false);
	
	// 立刻更新遮罩
	const isNowRenewHistoryShow = ref(false);
	
	// 联系客服遮罩
	const isMaskShow = ref(false);
	
	let currentlyId = '';
	
	onMounted(()=>{

	})
		
	// 关闭 RenewHistory 打开 NowRenewHistoryShow
	const renewPanel = ()=>{
		isNowRenewHistoryShow.value  = !isNowRenewHistoryShow.value;
		isRenewHistoryMask.value = !isRenewHistoryMask.value;
		// 
		const obj = {
			header_:{
				Authorization:lToken
			},
			method_:'GET',
			url_:'/symbols/update/' + lId + '/history'
		}
		requestFun(obj)
	}
	
	// 发送邮箱
	const sendMailbox = (mailbox)=>{
		const obj = {
			header_:{
				Authorization:lToken
			},
			method_:'GET',
			url_:'/symbols/exportMail/days/' + currentlyId +'/' + mailbox,
			// /symbols/exportMail/days/555389754959597568/aaa@gmail.com
		}
		requestFun(obj)
		uni.showToast({
			title:'发送成功!'
		})
	}
	const renewFun = (id) => {
		currentlyId = id
		isRenewHistoryMask.value = !isRenewHistoryMask.value
	}
	const exportFun = (id) => {
		currentlyId = id
		isExportHistoryMask.value = !isExportHistoryMask.value
	}
	
	const clickRegain = ()=>{
		uni.navigateTo({
			url:'/pages/strategyDetails/strategyDetails' + '?id=' + lId + '&token=' + lToken
		})
	}
	
	onLoad((options)=>{
		const {id, token, title} = options;
		ltitle.value = title;
		lId = id;
		if (token){
			lToken = uni.getStorageSync('token');
			uni.showLoading({
				title:'加载中'
			})
			loadHistoricalSelectionList(id, uni.getStorageSync('token'))
		}else{
			uni.showToast({
				title:'无法获取数据',
				icon:'error'
			})
		}
	})
	
	setTimeout(() => {
		uni.hideLoading()
	}, 1500)
	
	const loadHistoricalSelectionList = (id, token) => {
		const obj = {
			header_:{
				Authorization:token
			},
			method_:'GET',
			url_:'/symbols/list/days/' + id
		}
		
		requestFun(obj).then(res => {
			const {statusCode} = res;
			if (statusCode != 200){
				uni.showToast({
					title:'无法获取数据',
					icon:'error'
				})
				return;
			}
			historicalSelectionList.value = res.data.data.list;
		})
	}
</script>
<style lang="scss" scoped>
	.out{
		.head{
			position: fixed;
			z-index: 100;
		}
		.background{
			width: 100vw;
			height: 100vh;
			position: fixed;z-index: -10;
			background-color: #F6F6F6;
		}
		.head{
			position: fixed;
			z-index: 1000;
		}
		
		.title{
			background-color: white;
			display: grid;
			grid-template-columns: 2fr 1fr;
			padding: 0 30rpx;
			height: 40rpx;
			font-family: 'AlibabaPuHuiTi-3-65-Medium';
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



