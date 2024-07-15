<template>
	<view class="out">
		<view class="customerServiceButton" @click="customerService">
			<image src="../../static/images/addCustomerService.png" mode="aspectFit"></image>
		</view>
	</view>
</template>
<script setup>
import { defineEmits, defineProps, ref } from 'vue';
const emit = defineEmits(['customerService']);
const customerService = ()=>{
	emit('customerService')
}
</script>


<style lang="scss" scoped>
	.out{
		.customerServiceButton{
			position: fixed;
			z-index: 20;
			bottom: 110rpx;
			right: 30rpx;
			width: 80rpx;
			height: 80rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>


