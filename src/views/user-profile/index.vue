<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 导航栏 -->
    <input type="file" hidden ref="file" @change="onchange">
    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="userList.photo" />
    </van-cell>
    <van-cell title="昵称" :value="userList.name" is-link @click="isUpdateNameShow = true" />
    <van-cell title="性别" :value="userList.gender === 0 ? '男' : '女'" is-link @click="upAge" />
    <van-cell title="生日" :value="userList.birthday" is-link @click="upBirthday" />
    <!-- 个人信息 -->
    <!-- 编辑昵称 -->
    <van-popup v-model="isUpdateNameShow" style="height: 100%;" position="bottom">
      <updata-name v-if="isUpdateNameShow" v-model="userList.name" @close="isUpdateNameShow=false"></updata-name>
    </van-popup>
    <!-- /编辑昵称 -->
    <!-- 编辑年龄 -->
    <van-popup v-model="isUpdateAgeShow" :style="{ height: '40%' }" position="bottom">
      <updata-age v-model="userList.gender" @close="isUpdateAgeShow=false" v-if="isUpdateAgeShow" />
    </van-popup>
    <!-- 编辑年龄 -->
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" :style="{ height: '40%' }" position="bottom">
      <updata-birthday v-model="userList.birthday" @close="isUpdateBirthdayShow=false" v-if="isUpdateBirthdayShow">
      </updata-birthday>
    </van-popup>
    <!-- 编辑生日 -->
    <!-- 编辑照片 -->
    <van-popup v-model="isUpdatePhotoShow" :style="{ height: '100%' }" position="bottom">
      <updata-photo :img="img" @close="isUpdatePhotoShow=false" @update-photo="userList.photo=$event"
        v-if="isUpdatePhotoShow">
      </updata-photo>
    </van-popup>
    <!-- 编辑照片 -->
  </div>
</template>
<script>
import { getUserProfile } from '@/api/user'
import UpdataName from '@/views/user-profile/components/updata-name'
import UpdataAge from '@/views/user-profile/components/updata-age'
import UpdataBirthday from '@/views/user-profile/components/updata-birthday'
import UpdataPhoto from '@/views/user-profile/components/updata-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdataName,
    UpdataAge,
    UpdataBirthday,
    UpdataPhoto
  },
  props: {},
  data () {
    return {
      userList: {},
      isUpdateNameShow: false,
      isUpdateAgeShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserList()
  },
  mounted () { },
  methods: {
    async getUserList () {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.userList = data.data
      } catch (err) {
        console.log('失败')
      }
    },
    upAge () {
      this.isUpdateAgeShow = true
    },
    upBirthday () {
      this.isUpdateBirthdayShow = true
    },
    onchange () {
      console.log(113)
      console.log(this.$refs)
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>
<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
