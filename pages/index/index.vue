<template>
	<view class="main">
		<stateBar-component></stateBar-component>
		<view class="pass0"></view>
		<view class="logOn">
			<view class="title1">
				<text>登录</text>
			</view>
			<view class="title2">
				<text>请登录以获得独家服务</text>
			</view>
		</view>
		<view class="pass1">
			<view class="prompt">
				{{promptInfo}}
			</view>
		</view>
		<view class="form">
			<view class="input1">
				<uni-easyinput
					class="phone"
					type="text" 
					v-model="phone" 
					placeholder="手机号"
					:styles="{width: '100%', height: '100%'}"
					:inputBorder="false"
					:clearable='false'>
				</uni-easyinput>
			</view>
			
			<view class="input2">
				<uni-easyinput 
					class="password"
					:type="isPasswordShow ? 'password' : 'text'"
					v-model="password" 
					placeholder="至少8位包含大小写字母和数字的密码"
					:styles="{}"
					:inputBorder="false"
					:passwordIcon='false'
					:clearable='false'>
				</uni-easyinput>
				
					<view class="image" @click="clickPasswordShow">
						<image :src="passwordShowIconSrc"
							mode="aspectFit" />
					</view>
			</view>
			<view class="box_checkbox">
				
				<checkbox class="checkbox" 
					color="#E93030" 
					borderColor="#E93030"
					activeBorderColor='#E93030'
					:checked="isChecked"
					>
				</checkbox>
				<view class="context">
					<text>记住我</text>
				</view>
			</view>
			<view class="button">
				<button class="box" @click="clickLogon">登录</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import {requestFun} from '../../static/js/common.js'
	import {onLoad} from '@dcloudio/uni-app';
	
	const phone = ref('');
	const password = ref('');
	const isChecked = ref(true);
	const isPasswordShow = ref(true);
	const passwordShowIndex = ref(0);
	const promptInfo = ref('')
	
	//展示哪个图片
	const passwordShowIconSrc = computed(() => {
		return (passwordShowIndex.value % 2 == 0) ? '../../static/images/passwordShow.png' : '../../static/images/passwordNotShow.png'
	})
	
	//校验手机号和密码
	const clickLogon = async function(){
		
		uni.showToast({
			title:'加载中',
			icon:'loading'
		})
		
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		const bo1 = password.value.length>6;
		
		const phoneRegex = /^1[3-9]\d{9}$/;
		const bo2 = phoneRegex.test(phone.value);
		
		if(!(bo1 && bo2)){
			promptInfo.value = '电话或密码格式不正确';
			return;
		}
		
		// 13666698761
		// Wukuan888
			
		const obj = {
			data_:{
				phone: phone.value,
				password: password.value,
			},
			method_:'POST',
			url_:'/authorizations'
		}
		
		requestFun(obj).then(res => {
			const {statusCode} = res
				if (statusCode!= 200){
					const {data:{message}} = res
					promptInfo.value = '电话或密码错误'
				}else{
					const {meta:{access_token}} = res.data.data
					const token = 'Bearer' + access_token;
					if(isChecked.value){
						uni.setStorageSync('token',token)
						uni.setStorageSync('phone',phone.value)
						uni.setStorageSync('password',password.value)
					}else{
						uni.removeStorageSync('token');
					}
				
		uni.navigateTo({
			url:'/pages/strategyList/strategyList' 
		})
				
						
					}
		})
		
		
	}
	
	
	onLoad((options)=>{
		const token = uni.getStorageSync('token')
		if (token){
			const phone1 = uni.getStorageSync('phone')
			const password1 = uni.getStorageSync('password')
			phone.value  = phone1;
			password.value = password1;
		}
	})
	
	//切换图片显示
	const clickPasswordShow = function(){
		passwordShowIndex.value++;
		isPasswordShow.value = !isPasswordShow.value
	}	
</script>

<style lang="scss">
	@import "@/static/scss/index.scss";
	@import url("../../uni.scss");
</style>
	
		
		

