<template>
  <div class="my-container">
    <!-- 登录 -->
    <div class="header user-login" v-if="user">
      <div class="user-top">
        <div class="left">
          <van-image class="user-img" fit="cover" round :src="userInfo.photo" />
          <span class="user-s">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button round type="default" size="mini" class="user-b">编辑资料</van-button>
        </div>
      </div>
      <div class="user-button">
        <div class="user-to">
          <span class="user-text">{{userInfo.art_count}}</span>
          <span class="user-t">头条</span>
        </div>
        <div class="user-to">
          <span class="user-text">{{userInfo.fans_count}}</span>
          <span class="user-t">关注</span>
        </div>
        <div class="user-to">
          <span class="user-text">{{userInfo.follow_count}}</span>
          <span class="user-t">粉丝</span>
        </div>
        <div class="user-to">
          <span class="user-text">{{userInfo.like_count}}</span>
          <span class="user-t">获赞</span>
        </div>
      </div>

    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="whc()">
        <img class=" mobile-img" src="~@/assets/mobile.png" alt="">
        <span class=" text">登录 / 注册</span>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid :column-num="2" clickable class="grid-nav">
      <van-grid-item class="grid-nav-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text-ls">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-nav-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text-ls">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell class="user-cell" clickable title="退出登录" v-if="user" @click="onLogout()" />
  </div>

</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () { },
  methods: {
    whc () {
      this.$router.push('/login')
    },
    onLogout () {
      // 退出提示
      this.$dialog.confirm({
        title: '确认退出吗?'
      })
        .then(() => {
          // 确认退出：清除登录状态（容器中的user和本地存储）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消执行')
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(data)
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-login {
    .user-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 35px;
      height: 220px;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .user-img {
          border: 1px solid #fff;
          width: 110px;
          height: 110px;
        }
        .user-s {
          margin-left: 15px;
          font-size: 29px;
          color: #fff;
        }
      }
    }
    .user-button {
      display: flex;
      height: 141px;
      box-sizing: border-box;
      .user-to {
        margin-top: 25px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex: 1;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .user-text {
          font-size: 35px;
          color: #fff;
        }
        .user-t {
          font-size: 25px;
          color: #fff;
        }
      }
    }
  }
  .grid-nav {
    height: 131px;
    .grid-nav-item {
      i.toutiao {
        font-size: 43px;
      }
      i.toutiao-shoucang {
        color: orangered;
      }
      i.toutiao-lishi {
        color: orange;
      }
      span.text-ls {
        font-size: 28px;
      }
    }
  }
  .user-cell {
    color: red;
    text-align: center;
  }
}
</style>
