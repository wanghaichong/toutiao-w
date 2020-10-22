<template>
  <div class="updata-name">
    <!-- 导航栏 -->
    <van-nav-bar title="设置昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="onUpData" />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field v-model.trim="localName" rows="2" autosize type="textarea" maxlength="7" placeholder="请输入昵称"
        show-word-limit />
    </div>
    <!-- /输入框 -->
  </div>
</template>
<script>
import { updaUserName } from '@/api/user'
export default {
  name: 'UpdataName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onUpData () {
      this.$toast.loading({
        message: '保存中....',
        // //禁止背景点击
        forbidClick: true,
        // //持续显示
        duration: 0
      })
      try {
        if (!this.value) {
          this.$toast('昵称不能为空')
          return
        }
        await updaUserName({ name: this.localName })
        this.$toast.success('更新用户成功')
        this.$emit('input', this.localName)
        this.$emit('close')
      } catch (err) {
        this.$toast.fail('更改用户昵称失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.updata-name {
  background-color: #f5f7f9;
  .field-wrap {
    padding: 20px 10px 0;
  }
}
</style>
