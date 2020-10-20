<template>
  <van-button v-if="isFollowes" round size="small" @click="onFollow" :loading=loading>已关注
  </van-button>
  <van-button v-else type="info" color="#3296fa" round size="small" icon="plus" @click="onFollow" :loading=loading>关注
  </van-button>
</template>
<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  props: {
    isFollowes: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onFollow () {
      this.loading = true
      try {
        if (this.isFollowes) {
          await deleteFollow(this.userId)
        } else {
          await addFollow(this.userId)
        }
        // this.article.is_followed = !this.article.is_followed
        this.$emit('updata-is_followed', !this.isFollowes)
      } catch (err) {
        let message = '操作失败，请重试'
        if (this.article.is_followed && err.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
</style>
