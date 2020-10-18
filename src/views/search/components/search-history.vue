<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-if="isShowDelete">
        <span @click="$emit('all-delete',searchHistories)">全部删除</span>
        &nbsp; &nbsp;
        <span @click="isShowDelete=false">完成</span>
      </span>
      <span v-else>
        <van-icon @click="isShowDelete=true" name="delete" />
      </span>
    </van-cell>
    <van-cell :title="item" v-for="(item,index) in searchHistories" :key="index" @click="searchHistory(item,index)">
      <van-icon v-if="isShowDelete" name="close" />
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isShowDelete: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () { },
  methods: {
    searchHistory (item, index) {
      if (this.isShowDelete) {
        // 删除历史记录
        this.searchHistories.splice(index, 1)
      } else {
        // 切换历史记录
        this.$emit('conversion', item)
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
