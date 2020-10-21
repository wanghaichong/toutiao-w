<template>
  <van-cell class="comment-item">
    <van-image slot="icon" class="avatar" round fit="cover" :src="lists.aut_photo" />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{lists.aut_name}}</div>
      <van-button class="like-btn" :class="{linked:lists.is_liking}" :icon="lists.is_liking ? 'good-job':'good-job-o'"
        @click="onComment" :loading="commentLoading">
        {{ lists.like_count || '赞' }}
      </van-button>
    </div>

    <div slot="label" class="text-label">
      <p class="comment-content">{{lists.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{lists.pubdate|relativeTime}}</span>
        <van-button class="reply-btn" round @click="$emit('reply-click',lists)">回复 {{lists.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addLike, deleteLike } from '@/api/comment.js'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    lists: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      commentLoading: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onComment () {
      this.commentLoading = true
      try {
        if (this.lists.is_liking) {
          // 已赞，取消点赞
          await deleteLike(this.lists.com_id)
          this.lists.like_count--
        } else {
          // 没有点赞，添加点赞
          await addLike(this.lists.com_id)
          this.lists.like_count++
        }
        this.lists.is_liking = !this.lists.is_liking
      } catch (err) {
        this.$toast('操作失败，请重试')
      }
      this.commentLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  width: 100%;
  height: 300px;
  border: 1xp solid #000;
  .avatar {
    width: 70px;
    height: 70px;
  }
  .title-wrap {
    display: flex;
    justify-content: flex-end;
    .user-name {
      position: absolute;
      left: 130px;
      top: 30px;
      color: blue;
    }
    .like-btn {
      border: 0;
    }
    .linked {
      color: orange;
    }
  }
  .text-label {
    p.comment-content {
      font-size: 40px;
      color: #000;
    }
    .bottom-info {
      .comment-pubdate {
        color: #000;
      }
      .reply-btn {
        height: 40px;
        margin-left: 15px;
      }
    }
  }
}
</style>
