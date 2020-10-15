import dayjs from 'dayjs'
import Vue from 'vue'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// es6方式加载相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用使用处理插件
dayjs.extend(relativeTime)
// dayjs默认语言是英文，这里需要配置为中文
// //全局使用
dayjs.locale('zh-cn')
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
// dayjs()获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'))
// console.log(dayjs().to(dayjs('2015')))
