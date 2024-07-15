export const requestFun = async function(obj) {
	const {data_, header_, method_, url_} = obj;
	const res = await uni.request({
		url:'http://h5.5quant.com/api/rest' + url_,
		data:{
		...data_,
		'verification_key':'1fmf23',
		'verification_code':'12td3'
		},
		header:{
			...header_
		},
		method:method_
	})
	return res
}


// export const getBarPassHeight = function(){
// 	const BarHeight = 0;
// 	let statusBarHeight = 0;
// 	let tmp = uni.getSystemInfoSync().statusBarHeight
// 	statusBarHeight = (tmp == 0 ? 35 : tmp)
// 	BarHeight = statusBarHeight + uni.rpx2px(80);
	
// 	return BarHeight;
// }