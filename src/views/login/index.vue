<template>
  <div class="login-container">
    <!-- 导航栏目 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="whc()" />
    </van-nav-bar>
    <!-- 导航栏目 -->
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field name="mobile" v-model="user.mobile" :rules="userFormRules.mobile" placeholder="请输入手机号" type="number"
        maxlength="11">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field name="code" v-model="user.code" placeholder="请输入验证码" :rules="userFormRules.code" type="number"
        maxlength="6">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- time就是倒计时的时间 -->
          <van-count-down v-if="isCountDownShow" :time="1000 * 5" format="ss s" @finish="isCountDownShow = false" />
          <van-button v-else round size="small" class="send-sms-btn" type="default" native-type="button"
            @click="onSendSms">
            发送验证码</van-button>
        </template>
      </van-field>
      <div>
        <van-button block type="info" class="send-button-btn" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- 登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '17862653989',
        // 13911111111
        code: '246810'
        // 246810
      },
      isCountDownShow: false,
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '请填写手机号'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '验证码不能为空'
          }
        ],
        code: [
          {
            required: true,
            message: '请填写密码'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码不能为空'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // 发送请求获取数据
      try {
        const res = await login(user)
        console.log('登录成功', res)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功')
        this.$router.go(-1)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证成功')
      } catch (err) {
        console.log('验证错误', err)
      }
      console.log(123)
      // 2.验证通过，四按时倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        console.log('发送成功', res)
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁，请稍后再试')
        } else {
          this.$toast('发送失败，请稍后再试')
        }
      }
    },
    whc () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
.toutiao {
  font-size: 33px !important;
}
.send-sms-btn {
  width: 172px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666666;
}
.send-button-btn {
  margin-top: 53px;
  background-color: #6db4fb;
  border: 0;
}
</style>
