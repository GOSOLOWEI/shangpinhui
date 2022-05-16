<template>
  <div class="app">
    <Header />
    <h1>此处会展示很多路由组件，待定</h1>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'APP',
  components: { Header, Footer },
}
</script>

<style lang="less"></style>
