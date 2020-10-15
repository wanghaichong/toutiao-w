<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-duration="1500"
      :success-text="refreshSucessText">
      <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished"
        finished-text="没有更多了" @load="onLoad">
        <article-item v-for="(article,index) in list" :key="index" :article="article"></article-item>
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getAriticle } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // 存储列表数据的数组
      list: [],
      // 控制加载loading状态
      loading: false,
      // 控制数据加载结束状态
      finished: false,
      // 请求获取下一页数据时间戳
      timrstamp: null,
      // 控制列表加载失败的提示状态
      error: false,
      isLoading: false,
      refreshSucessText: '刷新成功'
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getAriticle({
          channel_id: this.channel.id,
          timestamp: this.timrstamp | Date.now(),
          with_top: 1
        })
        // 这里是测试错误提示
        // if (Math.random() > 0.7) {
        //   JSON.parse('asdfasd')
        // }
        console.log(data)
        // 2.把请求结果数据放到list数据中
        const { results } = data.data
        this.list.push(...results)
        // 3.本次数据加载结束之后要把加载状态设置未结束
        this.loading = false
        // 4.判断数据是否加载完成
        if (results.length) {
          // 更新获取下一页得时间戳
          this.timrstamp = data.data.pre_timestamp
        } else {
          // 没有数据啦，将finished者只为true,不在load加载更多啦
          this.finished = true
        }
      } catch (err) {
        // console.log('请求失败', err)
        // 展示错误提示状态
        this.error = true
        // 请求失败loading也需要关闭
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        // 1.请求获取数据
        const { data } = await getAriticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 这里是测试错误提示
        // if (Math.random() > 0.7) {
        //   JSON.parse('asdfasd')
        // }
        // 2.把请求结果数据放到list数据中
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.refreshSucessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshSucessText = '刷新失败'
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
