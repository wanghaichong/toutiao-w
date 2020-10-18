<template>
  <div class="search-results">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="加载失败，请点击重试"
      @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>
<script>
import { getSearchRelust } from '@/api/search'
export default {
  name: 'SearchResults',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      request: {
        page: 1,
        per_page: 20,
        q: this.searchText
      },
      error: false
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
        const { data: res } = await getSearchRelust(this.request)
        console.log(res)
        // 2.将数据添加到数组列表中
        // 不能直接赋值
        // this.list = res.data.results
        this.list.push(...res.data.results)
        // 3.将本次加载中的loading关闭
        this.loading = false
        // 4.判断是否还有数据
        if (res.data.results.length) {
          // 如果有,则更新获取下一个数据的页码
          this.request.page++
        } else {
          // 如果没有,则加载状态finished设置为结束
          this.finished = true
        }
      } catch (err) {
        // 展示加载失败的提示状态
        this.error = true
        // 加载失败了loading也要关闭
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.search-results {
  .van-search {
    position: fixed;
    left: 0;
    top: 0;
  }
}
</style>
