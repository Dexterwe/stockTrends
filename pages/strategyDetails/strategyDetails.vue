<template>
	<view class="out">
		<view class="head">
			<stateBar-component></stateBar-component>
			<titleBar-component @clickRegain="regainPage">
				<template v-slot:text>
					{{headObj.title}}
				</template>
			</titleBar-component>
		</view>
		<view class="pass" :style="{height: BarHeight + 'px'}"></view>
		

		<view class="content">
			
			<customerServiceButton-component @customerService="isMaskShow = !isMaskShow">
			</customerServiceButton-component>
			
			<customerService-mask-component @cloneCustomerServiceMask="isMaskShow = !isMaskShow" v-show="isMaskShow">
			</customerService-mask-component>
			
			<view class="top">
				<view class="up">
					<view class="left">
						<view class="icon">
							<image src="../../static/images/lampBulb.png" mode="aspectFit">
								
							</image>
						</view>
						<view class="strategyName">
							{{headObj.title}}
						</view>
						<view :class="{strategicTrendsText:true, TrendsTextborder:headObj.tag}">
							{{headObj.tag}}
						</view>
					</view>
					<view class="right">
						<view class="modifyStrategyButtom">
							<view class="modifyIcon">
								<image src="../../static/images/modifyIcon.png" mode="aspectFit"></image>
							</view>
							<view class="modifyText" @click="isMaskShow = !isMaskShow">
								修改策略
							</view>
						</view>
					</view>
				</view>
				<view class="text">{{headObj.description}}</view>
			</view>
			<view class="botton">
				
				<view class="cardTop">
					
					<view class="cardTopBox">
						<view class="left">
							<view class="title">实时入选{{selectedList ? selectedList.length : '0'}}只</view>
							<view class="countdown" @click="clickRefresh">{{timer}}秒后刷新</view>
						</view>
					
						<view class="right">
							<view class="box">
								<view class="promptText" @click="goHistoricalSelection(headObj.id)">历史入选</view>
								<view class="icon" @click="goHistoricalSelection(headObj.id)">
									<image src="../../static/images/rightIcon.png" mode="aspectFit"></image>
								</view>								
							</view>

						</view>
					</view>
					
				</view>
				
				<view class="stockTable">
					<view class="leftTable">
						<view class="tableHead">
							<view class="stockAbbreviation">
								股票简称
								<view class="rightIcon">
									<image src="../../static/images/rightIcon.png" mode="aspectFit">
									</image>
								</view>								
							</view>
							

						</view>
						
						<!-- 循环股票名 -->
						<view class="stockAbbreviationList" v-for="item in selectedList">
							<view class="stockAbbreviation">
								<view class="top">{{item.name}}</view>
								<view class="bottom">{{item.id}}</view>
							</view>
						</view>
						
					</view>
					<scroll-view class="rightTable" scroll-x="true" :show-scrollbar="false">
						<view class="tableHead">
							<view class="fieldList">
								<view class="field"></view>
								<view class="field">价格</view>
								<view class="field">涨幅</view>
								<view class="field">成交量</view>
								<view class="field">成交额</view>
								<view class="field">最高</view>
								<view class="field">最低</view>
								<view class="field">换手</view>
								<view class="field">昨收</view>
							</view>
							
							<!-- 循环表数据 -->
							<view class="fieldList" v-for="item in selectedList">
								<!-- 可视化 -->
								<view class="field">
									<div 
										class="echartsBox" 
										style="width: 120rpx; height: 70rpx;"
										:id="'k' + item.id">
									</div>
								</view>
								
								<!-- 价格 -->
								<view class="field from-content"
									:style="{color: item.realtime.pct_chg < 0 ? '#5B9244' : '#DE433F'}">
									{{item.realtime.close}}
								</view>
								
								<!-- 涨幅 -->
								<view class="field from-content" 
									:style="{color: item.realtime.pct_chg < 0 ? '#5B9244' : '#DE433F'}">
										
									{{item.realtime.pct_chg > 0 ? '+' : (item.realtime.pct_chg < 0 ? '-' : '')}}
									{{item.realtime.pct_chg}}%
									
								</view>
								
								<!-- 成交量 -->
								<view class="field from-content" :style="{color: item.realtime.pct_chg < 0 ? '#5B9244' : '#DE433F'}">>{{item.realtime.vol}}万</view>
								
								<!-- 成交额 -->
								<view class="field from-content" 
									:style="{color: item.realtime.pct_chg < 0 ? '#5B9244' : '#DE433F'}">
									{{(item.realtime.amount / 100000000).toFixed(2)}}亿
								</view>
								
								<!-- 最高 -->
								<view class="field from-content" 
									:style="{color: item.realtime.pct_chg < 0 ? '#5B9244' : '#DE433F'}">
									{{item.realtime.high}}
								</view>
								
								<!-- 最低 -->
								<view class="field from-content"
									:style="{color: item.realtime.pct_chg < 0 ? '#5B9244' : '#DE433F'}">
									{{item.realtime.low}}
								</view>
								
								<!-- 换手 -->
								<view class="field from-content"
									:style="{color: item.realtime.pct_chg < 0 ? '#5B9244' : '#DE433F'}">
									{{item.realtime.tor}}
								</view>
								
								<!-- 昨收 -->
								<view class="field from-content"
									:style="{color: item.realtime.pct_chg < 0 ? '#5B9244' : '#DE433F'}">
									{{item.realtime.pre_close}}
								</view>
							</view>
							
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		
	</view>

</template>
<script setup>
	import {ref, onMounted, watch, onUnmounted} from 'vue';
	import * as echarts from 'echarts';
	import {onLoad} from '@dcloudio/uni-app';
	import {requestFun} from '@/static/js/common.js';
	
	// 
	const BarHeight = ref(0);
	let statusBarHeight = 0;
	let tmp = uni.getSystemInfoSync().statusBarHeight
	statusBarHeight = (tmp == 0 ? 35 : tmp)
	BarHeight.value = statusBarHeight + uni.rpx2px(80);
	// 
		
	const isMaskShow = ref(false);
	
	let lToken = '';
	
	let lId = '';
	
	const headObj = ref({});
	
	const selectedList = ref([]);
	
	const timer = ref(30);
	
	let echartsListData = [];
	
	
	let timer_ = ref(null);
	
	const startTimer = () => {
	  if (!timer_.value) {
		timer_.value = setInterval(() => {
			timer.value--;
			if (timer.value == 0){
				timer.value = 30;
				
				// uni.reLaunch({
				//   url:'/pages/strategyDetails/strategyDetails' + '?id=' + lId 
				// });
				init()
				countNum.value++
				startTimer();
			}
		}, 1000)
		
	  }
	};
	
	onMounted(()=>{
		startTimer();
	})

	const clearTimer = () => {
	  if (timer_.value) {
		clearInterval(timer_.value);
		timer_.value = null;
	  }
	};
	
	
  onUnmounted(() => {
    clearTimer();
  });
  
	setTimeout(() => {
		echartsListData.forEach(item => {
			const chartDom = document.getElementById('k' + item.id);
			drawEcharts(generateKLineData(item.klines), chartDom);
		})
		
		uni.hideLoading()
	}, 2000)
		
	const clickRefresh = ()=>{
		countNum.value = 0
		init()
	}
	const goHistoricalSelection = (id)=>{
		clearTimer();
		uni.navigateTo({
			url:'/pages/historicalSelection/historicalSelection' + '?id=' + lId + '&token=' + lToken + '&title=' + headObj.value.title
		})
	}	
	
	const regainPage = ()=>{
		clearTimer();
		uni.navigateTo({
			url:'/pages/strategyList/strategyList' + '?token=' + lToken
		})
	}
	
	function drawEcharts(data, node) {
	  if (node) {
	    const chart = echarts.init(node);
	    const option = {
	      xAxis: {
			show:false,
			data: data.categoryData,
	      },
	      yAxis: {
			show:false,
	      },
	      series: [
	        {
				type: 'candlestick',
				data: data.values,
				itemStyle: {
				  color: '#DE433F', // Up color
				  color0: '#5B9244', // Down color
				  borderColor: '#DE433F', // Up border color
				  borderColor0: '#5B9244', // Down border color
				  borderWidth:2,
				},
				barWidth: '4rpx',
				categoryGap:'100'
	        },
	      ],
		  
	    };
	    chart.setOption(option);
		
	  }
	}
	
	// 
	
	function generateKLineData(data) {
	  const categoryData = []; 
	  const values = [];
	  for (let i = 0; i < data.length; i++) {
	    categoryData.push(i);
	    let open = parseFloat(data[i].open);
	    let close = parseFloat(data[i].close);
		let lowest = parseFloat(data[i].low);
	    let highest = parseFloat(data[i].high);
		
		if (open > close){
			close /= 1.2;
		}else{
			open /= 1.2;
		}
		highest *= 1 + Math.random() * 0.7;
		lowest /= 1 + Math.random() * 0.7;
		
	    values.push([open, close, lowest, highest]);
	  }
	  return { categoryData, values };
	}
	
	// 
	let activeId = ref('')
	onLoad((options)=>{
		const {id, token} = options;
		activeId.value = id
		init()
	})
		
	const init = ()=>{
		if (uni.getStorageSync('token')){
			lToken = uni.getStorageSync('token');
			lId = activeId.value;
			uni.showLoading({
				title:'加载中'
			})
			loadHeadData(activeId.value, uni.getStorageSync('token'))
			loadTableData(activeId.value, uni.getStorageSync('token'))
		}else{
			uni.showToast({
				title:'无法获取数据',
				icon:'error'
			})
		}
	}
	const loadHeadData = (id, token)=>{
		const obj = {
			header_:{
				Authorization:token
			},
			method_:'GET',
			url_:'/strategy/detail/' + id
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
			headObj.value = res.data.data;
		})
	}
	const countNum = ref(0)
	const loadTableData = (id, token)=> {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
		const day = currentDate.getDate().toString().padStart(2, '0');
		const currentDateStr = `${year}-${month}-${day}`;
		const obj = {
			header_:{
				Authorization:token
			},
			method_:'GET',
			url_:'/strategy/search/' + id + '/'+countNum.value
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
			let resData = [];
			for(let key in res.data) {
				resData = [...resData,...res.data[key]]
			}
			selectedList.value = resData
			if(selectedList.value){
				echartsListData = selectedList.value.map(item => {
					return {
						klines:item.klines,
						id:item.id
					};
				})				
			}
		uni.hideLoading()
		})
	}
	
</script>

<style lang="scss">
	@import url(@/uni.scss);
	@import url(@/static/scss/strategyDetails.scss);
</style>



