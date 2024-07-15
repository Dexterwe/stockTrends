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
			
			
			<!-- <view class="passBotton"></view> -->
		</view>
				
	</view>
</template>
<script setup>
	import {ref, onMounted} from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	import {requestFun} from '@/static/js/common.js';
	
	// 
	const BarHeight = ref(0);
	let statusBarHeight = 0;
	let tmp = uni.getSystemInfoSync().statusBarHeight
	statusBarHeight = (tmp == 0 ? 35 : tmp)
	BarHeight.value = statusBarHeight + uni.rpx2px(80);
	//
	
	let lToken = '';
	
	const strategyList = ref([]);
	
	const isMaskShow = ref(false);
	const goStrategyDetails = (id)=>{
		uni.navigateTo({
			url:'/pages/strategyDetails/strategyDetails' + '?id=' + id + '&token=' + lToken
		})
	}
	
	const regainPage = ()=>{
		uni.navigateTo({
			url:'/pages/index/index'
		})
	}
	
	// setTimeout(() => {
	// 	// uni.hideLoading()
	// }, 1000)
	
	onMounted(()=>{
		uni.showToast({
			title:'加载中',
			icon:'loading'
		})
	})
	
	onLoad((options)=>{
		const {token} = options;
		if (uni.getStorageSync('token')){
			lToken = uni.getStorageSync('token');
			loadData(uni.getStorageSync('token'))
		}else{
			uni.showToast({
				title:'无法获取数据',
				icon:'error'
			})
		}
		
	})
	
	const loadData = (token)=>{
		const obj = {
			header_:{
				Authorization:token
			},
			method_:'GET',
			url_:'/strategy/list/'
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
			const {list} = res.data.data;
			strategyList.value = list
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
			background-color: #F6F6F6;
		}
	}
</style>







