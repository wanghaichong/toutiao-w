<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :lists="comment" />
      <!-- /当前评论项 -->

      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <comment-list :list="boxlist" :commentId="comment.com_id" type="c"></comment-list>
      <!-- /评论的回复列表 -->
    </div>
    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button class="write-btn" size="small" round @click="isPostShow = true">写评论</van-button>
    </div>
    <!-- /底部区域 -->
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post @postt-success="boxclose" :target="comment.com_id"></comment-post>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from './article-item'
import CommentList from './article-list'
import CommentPost from './article-post'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      boxlist: []
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    boxclose (value) {
      console.log(value)
      this.comment.reply_count++
      this.isPostShow = false
      this.boxlist.unshift(value.new_obj)
    }
  }
}
</script>
<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
