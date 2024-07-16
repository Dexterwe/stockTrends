<template>
	<view class="main">
		<view class="state" :style="{height: statusBarHeight + 'px'}"></view>
	</view>
	
</template>

<style lang="scss" scoped>
	.state{
		width: 100vw;
		background-color: white;
	}
</style>
<script setup>
	import { ref } from 'vue';
	const statusBarHeight = ref(0);
	statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight
</script>

