<template>
  <div class="search-suggestion">
    <van-cell v-for="(item,index) in suggestion" :key="index" icon="search">
      <div slot="title" v-html="change(item)" @click="$emit('search',item)">{{item}}</div>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestion } from '@/api/search'
// 加载lodash工具库来优化
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestion: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // handler (val) {
      //   this.loadSearchSuggestions(val)
      // },
      // 优化防抖
      handler: debounce(function (val) {
        this.loadSearchSuggestions(val)
      }, 200),
      immediate: true
    }
  },
  created () { },
  mounted () { },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data: res } = await getSearchSuggestion(q)
        console.log(res)
        this.suggestion = res.data.options
        console.log(this.suggestion)
      } catch (err) {
        this.$toast('数据获取失败,请稍后再试')
      }
    },
    change (item) {
      const htmlStr = `<span style="color:red">${this.searchText}</span>`
      const res = new RegExp(this.searchText, 'gi')
      return item.replace(res, htmlStr)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
