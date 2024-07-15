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
	const tmp = uni.getSystemInfoSync().statusBarHeight
	statusBarHeight.value = (tmp == 0 ? 35 : tmp)
</script>

