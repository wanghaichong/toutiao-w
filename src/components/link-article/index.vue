<template>
  <van-button :icon="value ? 'good-job' : 'good-job-o'" :class="value==1?'whc2':''" @click="onLink" :loading="load">
  </van-button>
  <!-- <van-icon color="#777" name="good-job-o" /> -->
</template>
<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LinkArticle',
  components: {},
  props: {
    value: {
      type: [Number, Object],
      required: true
    },
    wId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data () {
    return {
      load: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLink () {
      this.load = true
      try {
        let status = -1
        if (this.value === 1) {
          // 取消点赞
          await deleteLike(this.wId)
        } else {
          // 点赞
          await addLike(this.wId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '点赞失败')
      } catch (err) {
        this.$toast.fail('失败')
      }
      this.load = false
    }
  }
}
</script>
<style lang="less" scoped>
.whc2 {
  color: orange;
}
// .van-button
//   padding: 0;
//   border: 0;
//
// .van-button::before
//   background-color: unset;
//
</style>
