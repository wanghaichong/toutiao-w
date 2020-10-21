<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" :style="{ height: '90%' }">
      <comment-reply v-if="isReplyShow" :comment="currentComment" @close="isReplyShow=false"></comment-reply>
    </van-popup>
    <!-- /评论回复 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail markdown-body" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate|relativeTime}}</div>
          <!-- 关注取消占位符 -->
          <follow-user :is-followes="article.is_followed" class="follow-btn" :user-id="article.aut_id"
            @updata-is_followed="article.is_followed=$event" />
          <!-- <van-button v-if="article.is_followed" class="follow-btn" round size="small" @click="onFollow"
            :loading=showBtn>已关注
          </van-button>
          <van-button v-else class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus"
            @click="onFollow" :loading=showBtn>关注
          </van-button> -->
        </van-cell>
        <!-- /用户信息 -->
        <!-- 文章内容 -->
        <div class="article-content" v-html="article.content" ref="whc-content"></div>
        <van-divider>正文结束</van-divider>
        <article-list :list='commentList' :commentId="article.art_id"
          @updata-data="totalCommentCount=$event.total_count" @reply-click="onReplyClick">
        </article-list>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="showBox">写评论</van-button>
          <van-icon name="comment-o" :info="this.totalCommentCount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <collect-article v-model="article.is_collected" :whcId="article.art_id"></collect-article>
          <link-article v-model="article.attitude" :wId="article.art_id"></link-article>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <van-popup v-model="isShow" position="bottom">
          <comment-post :target="article.art_id" @postt-success="onPossSuccess"></comment-post>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle()">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 图片展示 -->
  </div>
</template>
<script>
import { getAriticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LinkArticle from '@/components/link-article'
import ArticleList from '@/views/article/components/article-list'
import CommentPost from '@/views/article/components/article-post'
import CommentReply from '@/views/article/components/article-reply'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LinkArticle,
    ArticleList,
    CommentPost,
    CommentReply
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      showBtn: false,
      totalCommentCount: 0,
      isShow: false,
      commentList: [],
      isReplyShow: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () { },
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data: res } = await getAriticleById(this.articleId)
        // if (Math.random() > 0.8) {
        //   JSON.parse('qwreasFas')
        // }
        console.log(res)
        this.article = res.data
        setTimeout(() => {
          this.whc()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
          console.log(err.response)
          console.log(err.response.status)
        }
        console.log('获取数据失败', err)
      }
      this.loading = false
    },
    whc () {
      const getImages = this.$refs['whc-content']
      // console.log(this.$refs['whc-content'])
      const imgs = getImages.querySelectorAll('img')
      console.log(imgs)
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images,
            closeable: true,
            startPosition: index
          })
        }
      })
      console.log(images)
    },
    showBox () {
      this.isShow = true
    },
    onPossSuccess (data) {
      // 关闭弹出层
      this.isShow = false
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
    },
    onReplyClick (lists) {
      this.currentComment = lists
      console.log(lists)
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
