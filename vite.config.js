import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'  //官方内置的,不用下载,下面代码粘贴直接用即可
 
export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://www.5quant.com', // 目标服务  
				changeOrigin: true,
			}
		}
	}
})
