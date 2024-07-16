<template>
	<view class="out">
		<view class="head">
			<stateBar-component></stateBar-component>
			<titleBar-component @clickRegain="regainPage">
				<template v-slot:text>
					我的策略
				</template>
			</titleBar-component>
		</view>
		<view class="pass" :style="{height: BarHeight + 'px'}"></view>
		
		<customerService-mask-component @cloneCustomerServiceMask="isMaskShow = !isMaskShow" v-show="isMaskShow">
		</customerService-mask-component>
		
		<customerServiceButton-component @customerService="isMaskShow = !isMaskShow">
		</customerServiceButton-component>
		
		<view class="content">
			
			<strategyOverview-component v-for="item in strategyList"
				v-if="strategyList.length>0"
				@goStrategyDetailsEvent="goStrategyDetails(item.id)"
				:colorNumber="item.tag == '强势' ? 0 : 1">
				
				<template v-slot:strategyName>
					{{item.title}}
				</template>
				
				<template v-slot:trend class="trend">
					{{item.tag}}
				</template>
				
				<template v-slot:summary>
					{{item.description}}
				</template>
			</strategyOverview-component>
			<view class="passBotton" v-else-if="showNoData">
				<view class="">
					暂无数据
				</view>
			</view>
			
			<!-- <view class="passBotton"></view> -->
		</view>
				
	</view>
</template>
<script setup>
	import {ref, onMounted} from 'vue';
	import {onLoad, onReachBottom} from '@dcloudio/uni-app';
	import {requestFun} from '@/static/js/common.js';
	
	
	// 
	const BarHeight = ref(0);
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
	BarHeight.value = statusBarHeight + uni.rpx2px(80);
	//
	
	let lToken = '';
	
	let page = 1;
	
	const strategyList = ref([]);
	
	const isMaskShow = ref(false);
	const goStrategyDetails = (id)=>{
		uni.navigateTo({
			url:'/pages/strategyDetails/strategyDetails' + '?id=' + id
		})
	}
	
	const regainPage = ()=>{
		uni.navigateTo({
			url:'/pages/index/index'
		})
	}
	
	onReachBottom(()=>{
		page++;
		loadData();
	})
	
	onMounted(()=>{
	})
	
	onLoad((options)=>{
		uni.setNavigationBarTitle({title: '策略中心'})
		const {token} = options;
		if (uni.getStorageSync('token')){
			lToken = uni.getStorageSync('token');
			loadData(uni.getStorageSync('token'))
		}else{
			uni.showToast({
				title:'无法获取数据',
				icon:'error'
			})
			uni.navigateTo({url:'/pages/index/index'})
		}
		
	})
	const showNoData = ref(false)
	const loadData = ()=>{
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
			url_:'/strategy/list/'
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
			const {list} = res.data.data;
			strategyList.value = strategyList.value.concat(list);
		})
	}
	
</script>

<style lang="scss" scoped>
	.out{
		.head{
			position: fixed;
			z-index: 1000;
		}
		.content{
			width: 100%;
			min-height: 300rpx;
			background-color: #F6F6F6;
			.trend{
				color: red;
			}
		}
		.passBotton{
			width: 100%;
			min-height: 100vh;
			// background-color: #F6F6F6;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>







