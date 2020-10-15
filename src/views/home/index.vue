<template>
  <div class="home-container">
    <!-- 导航栏目 -->
    <van-nav-bar class="page-nav-bar" title="登录" fixed>
      <van-button slot="title" type="info" size="small" class="search-btn" round icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- 导航栏目 -->
    <!-- 频道列表 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表 -->
  </div>
</template>
<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/home/components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getChannels()
  },
  mounted () { },
  methods: {
    async getChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
        console.log(this.channels)
      } catch (err) {
        this.$toast('获取用户频道列表失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tab {
      min-width: 190px;
      border-right: 1px solid #ccc;
      padding: 0;
      font-size: 30px;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 33px;
      height: 6px;
      margin-bottom: 8px;
      background-color: #3296fa;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.8;
      i.toutiao {
        font-size: 33px;
      }
    }
    .placeholder {
      // 不按flex分布
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 58px;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tabs__content--animated {
      margin-top: 180px;
    }
  }
}
</style>
