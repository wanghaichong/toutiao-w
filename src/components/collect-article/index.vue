<template>
  <!-- <van-icon :class="value?'whc':''" :name="value?'star':'star-o'" @click="onCollect" :loading="load">
    </van-icon> -->
  <van-button :icon="value ? 'star' : 'star-o'" :class="value==1?'whc':''" @click="onCollect" :loading="load">
  </van-button>
</template>
<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    whcId: {
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
    async onCollect () {
      this.load = true
      try {
        if (this.value) {
          // 已收藏，取消收藏
          await deleteCollect(this.whcId)
        } else {
          await addCollect(this.whcId)
        }
        // 更新视图
        // 自定义事件修改数据并不是立即的
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败，请重试！')
      }
      this.load = false
    }
  }
}
</script>
<style lang="less" scoped>
.van-button {
  padding: 0;
  border: 0;
}
.whc {
  color: orange;
}
.van-button::before {
  background-color: unset;
}
</style>
