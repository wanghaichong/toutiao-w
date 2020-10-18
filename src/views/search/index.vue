<template>
  <div class="search-container">
    <!-- 搜索栏开始 -->
    <form action="/" class="search-flex">
      <van-search v-model="searchText" background="#4fc08d" show-action placeholder="请输入搜索关键词" @search="onSearch"
        @cancel="onCancel" @focus="isResultShow=false" />
    </form>
    <!-- 搜索栏结束 -->
    <!-- 搜索结果 -->
    <search-results v-if="isResultShow" :searchText=searchText></search-results>
    <!-- 搜索结果 -->

    <!-- 联想建议开始 -->
    <search-suggestion v-else-if="searchText" :searchText=searchText @search="onSearch"></search-suggestion>
    <!-- 联想建议结束 -->
    <!-- 搜索历史记录开始 -->
    <search-history v-else :searchHistories=searchHistories @all-delete="allDelete" @conversion="onSearch">
    </search-history>
    <!-- 搜索历史记录结束 -->

  </div>
</template>
<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResults from './components/search-results'
import { getItem, setItem } from '../../utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },
  props: {},
  data () {
    return {
      // 文本框的内容
      searchText: '',
      // 控制搜索结果是否显示
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORY') || []
    }
  },
  computed: {},
  watch: {
    searchHistories (val) {
      setItem('TOUTIAO_SEARCH_HISTORY', val)
    }
  },
  created () {
  },
  mounted () { },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.go(-1)
    },
    allDelete () {
      this.searchHistories = []
    }
  }
}
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #ffffff;
  }
  .search-flex {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 12;
  }
}
</style>
