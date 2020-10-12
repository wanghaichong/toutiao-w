<template>
  <div id="app">
    <h2>我是帅哥</h2>
    <div>
      <i class="toutiao toutiao-shipin"></i>
    </div>
    <div>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>

    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
</style>
