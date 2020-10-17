<template>
  <div class="channel-edit">
    <van-cell-group :border="false">
      <van-cell :border="false">
        <div slot="title" class="title-text">我的频道</div>
        <!-- 笨蛋方法 -->
        <!-- <van-button round plain type="warning" size="mini" class="edit-btn" @click="onShowBtn" v-if="isShow==false">
          编辑
        </van-button>
        <van-button round plain type="warning" size="mini" class="edit-btn" @click="onShowBtn" v-else>完成
        </van-button> -->
        <van-button round plain type="warning" size="mini" class="edit-btn" @click="isShow = !isShow">
          {{isShow ? '完成' : '编辑'}}
        </van-button>
      </van-cell>
      <van-cell>
        <van-grid :gutter="10" class="my-grid">
          <van-grid-item class="grid-item" v-for="(item,index) in myChannels" :key="index"
            @click="onMyChannels(item,index)">
            <van-icon slot="icon" name="clear" v-show="isShow && !fiexChannels.includes(item.id)"></van-icon>
            <span slot="text" :class="{active:index===active}">
              {{item.name}}
            </span>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </van-cell-group>
    <van-cell-group :border=" false">
      <van-cell :border="false">
        <div slot="title" class="title-text">频道列表</div>
      </van-cell>
      <van-cell>
        <van-grid :gutter="10">
          <van-grid-item class="grid-item grid-item-icon" icon="plus" v-for="(item,index) in surAll" :key="index"
            :text="item.name" @click="onaddchannels(item)" />
        </van-grid>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { getAllchannels, addUserChannel, deleteUserChannel } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'channel-edit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 所以频道的列表
      allChannels: [],
      isShow: false,
      fiexChannels: [0]
    }
  },
  computed: {
    ...mapState(['user']),
    surAll () {
      const channels = []
      this.allChannels.forEach(channel => {
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () { },
  methods: {
    async loadAllChannels () {
      try {
        const { data: res } = await getAllchannels()
        console.log(res)
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    // 添加频道
    async onaddchannels (item) {
      console.log(item)
      this.myChannels.push(item)
      if (this.user) {
        // 已经登录
        try {
          // 已登录，数据存储到线上
          await addUserChannel({
            id: item.id, // 频道 id
            seq: this.myChannels.length // 频道的 序号
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('保存失败')
        }
      } else {
        // 未登录,存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 删除或转换频道
    onMyChannels (item, index) {
      console.log(item, index)
      if (this.isShow) {
        // 删除我的频道
        // 1.不允许删除推荐频道
        if (this.fiexChannels.includes(item.id)) {
          return
        }
        // 2.删除频道
        this.myChannels.splice(index, 1)
        this.deleteChannel()
        // 3.更新active高亮
        if (index <= this.active) {
          this.$emit('channels-active', this.active - 1, true)
        }
        // 处理持久化
        this.deleteChannel(item)
      } else {
        // 执行切换频道
        this.$emit('channels-active', index, false)
      }
    },
    async deleteChannel (item) {
      try {
        if (this.user) {
          // 已经登陆
          await deleteUserChannel(item.id)
        } else {
          // 未登录
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败,请稍后重试')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding: 80px 0;
  .van-cell__value {
    overflow: none;
    .title-text {
      font-size: 32px;
      color: #333333;
    }
    .edit-btn {
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid #f85959;
    }
    /deep/.grid-item {
      width: 160px;
      height: 86px;
      .van-grid-item__content {
        white-space: nowrap;
        background-color: #f4f5f6;
        .van-gril-item__text {
          font-size: 28px;
          color: #222;
        }
      }
      .active {
        color: red;
      }
    }
    /deep/ .my-grid {
      position: relative;
      /deep/ .van-icon-clear {
        position: absolute;
        right: 0px;
        top: 0px;
        font-size: 36px;
        color: #ccc;
        z-index: 999;
      }
    }
    /deep/.grid-item-icon {
      .van-grid-item__content {
        font-size: 20px;
        flex-direction: inherit;
        .van-grid-item__icon {
          font-size: 28px;
        }
      }
    }
    /deep/.van-grid-item__icon-wrapper {
      position: unset;
    }
  }
}
</style>
