<template>
  <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
    :error="error" error-text="获取失败">
    <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.content" /> -->
    <comment-item v-for="(item,index) in list" :key="index" :lists="item" @reply-click="$emit('reply-click', $event)" />
  </van-list>
</template>
<script>
import CommentItem from '@/views/article/components/article-item'
import { getComment } from '@/api/comment'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    commentId: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loading = true
    this.onLoad()
  },
  mounted () { },
  methods: {
    async onLoad () {
      try {
        // 1.获取数据
        const { data } = await getComment({
          type: this.type,
          source: this.commentId.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // 赋值数据
        console.log(this.type)
        console.log(this.commentId)
        console.log(data)
        const { results } = data.data
        this.list.push(...results)
        console.log(this.list)
        this.loading = false
        this.$emit('updata-data', data.data)
        // 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
