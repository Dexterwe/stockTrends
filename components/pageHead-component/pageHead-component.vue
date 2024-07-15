<template>
	<view class="out">
		<view class="box">
			<stateBar-component></stateBar-component>
			<titleBar-component @clickRegain="clickRegain"></titleBar-component>
		</view>

	</view>
</template>

<style lang="scss" scoped>
	.out{
		background-color: white;
		.box{
			position: fixed;
			z-index: 100;
		}

	}

</style>

<script setup>
	import {ref, defineEmits} from 'vue';
	
	const emit = defineEmits(['clickRegain']);
	const clickRegain = ()=>{
		emit('clickRegain');
	}
	
	const BarHeight = ref(0);
	let statusBarHeight = 0;
	let tmp = uni.getSystemInfoSync().statusBarHeight
	statusBarHeight = (tmp == 0 ? 35 : tmp)
	BarHeight.value = statusBarHeight + uni.rpx2px(80);
	
</script>

