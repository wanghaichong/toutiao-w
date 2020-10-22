<template>
  <div class="updata-birthday">
    <van-datetime-picker @cancel="$emit('close')" v-model="currentDate" @confirm="onConfirm" type="date" title="选择年月日"
      :min-date="minDate" :max-date="maxDate" />
  </div>
</template>
<script>
import { updaUserName } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdataBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
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
          birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
        this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
        this.$emit('close')
        this.$toast.success('更新用户成功')
      } catch (err) {
        this.$toast.fail('更改用户昵称失败')
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
