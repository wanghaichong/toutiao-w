<template>
  <div class="comment-post">
    <van-field v-model.trim="message" class="boxField" rows="2" autosize type="textarea" maxlength="50"
      placeholder="请输入留言" show-word-limit />
    <van-button class="boxButton" :disabled="!message.length" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, Object, String],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Number, Object, String],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await addComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : null
        })
        console.log(data)
        this.$emit('postt-success', data.data)
        // 清空文本框
        this.message = ''
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.comment-post {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .boxField {
    /deep/.van-field__value {
      background-color: #999;
      padding: 50px;
    }
  }
  .boxButton {
    width: 10px;
    height: 100%;
    color: blue;
    border: 0;
    white-space: nowrap;
    margin-right: 30px;
  }
}
</style>
