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
						<image  src="../../static/images/renewIcon.png" mode="aspectFit"></image>
					</view>
					<view class="text">更新</view>
				</view>
				
				<view class="box" @click="exportFun">
					<view class="icon">
						<image  src="../../static/images/exportIcon.png" mode="aspectFit"></image>
					</view>
					<view class="text">导出</view>
				</view>
				
			</view>
		</view>
		
		<!-- 卡片 -->
		<historicalCard-component 
			v-if="historicalSelectionList.length>0"
			:entityList="item.symbols" 
			:time="item.touch_date"
			v-for="item in historicalSelectionList"
			@clickRenew="renewFun(item.id)" 
			@clickExport="exportFun(item.id)">
		</historicalCard-component>
		<view style="width: 100%;height: 50vh; display: flex;align-items: center; justify-content: center;" v-else-if="showNoData">
			<view class="">
				暂无数据
			</view>
		</view>
		
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
	import {onLoad, onReachBottom} from '@dcloudio/uni-app';
	import {requestFun} from '@/static/js/common.js'
	
	// 计算头部高度
	const BarHeight = ref(0);
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
	BarHeight.value = statusBarHeight + uni.rpx2px(80);
	// 
	const ltitle = ref('');
	
	let lToken = '';
	
	let lId = '';
	
	let page = 1;
	
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
	
	
	
	onReachBottom(()=>{
		page++;
		loadHistoricalSelectionList();
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
			url:'/pages/strategyDetails/strategyDetails' + '?id=' + lId 
		})
	}
	const showNoData = ref(false);
	onLoad((options)=>{
		uni.setNavigationBarTitle({title: '历史回测入选'})
		const {id, token, title} = options;
		ltitle.value = title;
		lId = id;
		lToken = token;
		
		if ( uni.getStorageSync('token')){
			lToken = uni.getStorageSync('token');
			loadHistoricalSelectionList()
		}else{
			uni.showToast({
				title:'无法获取数据',
				icon:'error'
			})
			uni.navigateTo({url:'/pages/index/index'})
		}
		
	})
	
	
	
	setTimeout(() => {
		uni.hideLoading()
	}, 1500)
	
	const loadHistoricalSelectionList = () => {
		uni.showToast({
			title:'加载中',
			icon:'loading',
			duration:500
		})
		const obj = {
			header_:{
				Authorization:lToken
			},
			data_:{
				page
			},
			method_:'GET',
			url_:'/symbols/list/days/' + lId
		}
		
		requestFun(obj).then(res => {
			const {statusCode} = res;
			showNoData.value = true
			if (statusCode != 200){
				uni.showToast({
					title:'无法获取数据',
					icon:'error'
				})
				return;
			}
			historicalSelectionList.value = historicalSelectionList.value.concat(res.data.data.list);
			// historicalSelectionList.value = res.data.data.list;
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
						position: relative;
						width: 22rpx;
						height: 22rpx;
						image{
							position: absolute;
							top: 6rpx;
							left: 3rpx;
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



