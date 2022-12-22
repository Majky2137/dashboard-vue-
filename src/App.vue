<template>
  <MainDashboardContainer/>
</template>

<script>
import MainDashboardContainer from './components/main.vue'

export default {
  name: 'App',
  components: {
    MainDashboardContainer
  }
}
</script>

<style>
html,body {
  background-color: black;
  margin: 0;
  height: 100%;
}
#app {
  display: flex;
  width: 100%;
  margin:0 auto;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  overflow-x:none;
  justify-content: center;
  align-items: center;
  border: none !important;
  background-color: black;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
