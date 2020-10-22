<template>
  <div class="updata-age">
    <van-picker title="标题" :default-index="value" @change="onChange" show-toolbar :columns="columns"
      @confirm="onConfirm" @cancel="$emit('close')" />
  </div>
</template>
<script>
import { updaUserName } from '@/api/user'
export default {
  name: 'UpdataAge',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localAge: this.value
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中....',
        // //禁止背景点击
        forbidClick: true,
        // //持续显示
        duration: 0
      })
      try {
        await updaUserName({
          gender: this.localAge
        })
        console.log(this.localAge)
        this.$emit('input', this.localAge)
        this.$emit('close')
        this.$toast.success('更新用户成功')
      } catch (err) {
        this.$toast.fail('更改用户昵称失败')
      }
    },
    onChange (picker, value, index) {
      console.log(picker, value, index)
      this.localAge = index
    }
  }
}
</script>
<style lang="less" scoped>
</style>
