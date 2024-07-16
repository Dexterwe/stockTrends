<template>
	<view class="out">
		<mask-component @cloneMask="clickCloneButton">
			<template v-slot:titleText>
				导出历史入选
			</template>
			<template v-slot:content>
				<view class="mask-component-content">
					<view class="top">
						<!-- 邮箱地址 -->
						<input type="text" placeholder="邮箱地址" class="input" v-model="mailbox"/>
					</view>
					<view class="middle">
						<view class="text center">
							通常在10分钟左右收到
						</view>
					</view>
					<view class="bottom">
						<view class="button center" @click="clickSend">发送到邮箱</view>
					</view>
				</view>
			</template>
		</mask-component>
	</view>
</template>

<script setup>
	import {ref, defineEmits, onMounted} from 'vue';
	const emits = defineEmits(['clonExportHistoryMask', 'sendMailbox'])
	const mailbox = ref('');
	const clickCloneButton = ()=>{
		mailbox.value = '';
		emits('clonExportHistoryMask');
	}
	const clickSend = ()=>{
		
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const bool = emailRegex.test(mailbox.value)
		if(mailbox.value.length==0){
			uni.showToast({
				title:'请输入邮箱地址!',
				icon:'error'
			})
		}else if(!bool){
			uni.showToast({
				title:'邮箱格式错误!',
				icon:'error'
			})
		}
		if(mailbox.value.length==0||!bool)return
		emits('sendMailbox', mailbox.value);
	}
	
</script>

<style lang="scss" scoped>
	.mask-component-content{
		font-family: 'AlibabaPuHuiTi-3-45-Light';
		&>view{
			width: 100%;
			height: 100rpx;
			padding: 10rpx 0;
			&>view{
				display: flex;
				flex-direction: row;
			}
			
		}
		.top{
			.input{
				height: 100%;
				border-radius: 10rpx;
				border: 1rpx solid $uni-border-color;
				padding-left: 30rpx;
			}			
		}
		.middle{
			display: flex;
			flex-direction: column;
			// align-items: center;
			justify-content: center;
			.text{
				font-size: 26rpx;
				color: $uni-text-color-grey;
			}
		}
		.bottom{
			.button{
				height: 100%;
				background-color: $uni-color-theme;
				color: white;
				font-size: 26rpx;
				border-radius: 10rpx;
			}
		}
		.center{
			display: flex;
			align-items: center;
			justify-content: center;			
		}
	}
</style>